import TagRepository from 'repositories/tag';
import TagActions from 'actions/tag';

import { translateForSync, handleError } from './helpers/base';

let updateTag = function(original, dispatch) {
  return function(tag) {
    dispatch(TagActions.update(original.id, translateForSync(tag)));
  };
};

export default function tagPersister(state, dispatch) {
  let newTag = _.find(state.tags, function(tag) {
    return ! tag.externalId;
  });

  if(newTag) {
    TagRepository
      .create(_.pick(newTag, 'text'))
      .then(updateTag(newTag, dispatch), handleError);
    return true;
  }

  let unpersistedTag = _.find(state.tags, {persisted: false});
  if(unpersistedTag && unpersistedTag.externalId) {
    TagRepository
      .update(unpersistedTag.externalId, _.pick(unpersistedTag, 'text'))
      .then(updateTag(unpersistedTag, dispatch), handleError);
    return true;
  }
}
