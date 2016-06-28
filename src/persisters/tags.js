export default function tagPersister(state, dispatch) {
  let unpersistedADD = _.find(state.tags, {externalId: undefined});
  if(unpersistedADD) {
    TagRepository
      .create(_.pick(unpersistedADD, 'text'))
      .then(function(tag){
        dispatch({
          type: 'EDIT_TAG',
          id: unpersistedADD.id,
          externalId: tag.id
          persisted: true
        });
      });
    return true;
  }

  let unpersistedEdit = _.find(state.tags, {persisted: false});
  if(unpersistedEdit) {
    TagRepository
      .update(unpersistedEdit.externalId, _.pick(unpersistedEdit, 'text'))
      .then(function(){
        dispatch({
          type: 'EDIT_TAG',
          id: unpersistedEdit.id,
          persisted: true
        });
      });
    return true;
  }
}
