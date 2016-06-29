import TagRepository from 'repositories/tag';

export default function tagPersister(state, dispatch) {
  let unpersistedADD = _.find(state.tags, function(tag) {
    return ! tag.externalId;
  });
  if(unpersistedADD) {
    TagRepository
      .create(_.pick(unpersistedADD, 'text'))
      .then(function(tag){
        dispatch({
          type: 'EDIT_TAG',
          id: unpersistedADD.id,
          externalId: tag.id,
          persisted: true
        });
      }, function(error) {
        dispatch({
          type: 'PERSISTENCE_ERROR',
          error: error
        })
      });
    return true;
  }

  let unpersistedEdit = _.find(state.tags, {persisted: false});
  if(unpersistedEdit && unpersistedEdit.externalId) {
    TagRepository
      .update(unpersistedEdit.externalId, _.pick(unpersistedEdit, 'text'))
      .then(function(){
        dispatch({
          type: 'EDIT_TAG',
          id: unpersistedEdit.id,
          persisted: true
        });
      }, function(error) {
        dispatch({
          type: 'PERSISTENCE_ERROR',
          error: error
        })
      });
    return true;
  }
}
