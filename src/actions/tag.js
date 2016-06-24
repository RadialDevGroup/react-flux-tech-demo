import _ from 'lodash';
import TagRepository from 'repositories/tag';

import { tagCounter } from 'reducers/shared/counters';
import createAndPersistTag from 'reducers/shared/create-and-persist-tag';

const createFetchAction = (todo) => {
  let baseAction = {type: 'ADD_TAG', id: tagCounter() };
  let values = _.pick(todo, 'text');
  let idSubstitution = {externalId: todo.id};

  return Object.assign(baseAction, values, idSubstitution);
}

export default {
  create: function(text) {
    if ( _.isEmpty(text) ) { return new Function() }

    return _.partial(createAndPersistTag, _, _, {text});
  },

  update: function(id, fields) {
    return function(dispatch, getState) {
      dispatch(Object.assign({}, fields, {
        id: id, type: 'EDIT_TAG'
      }));

      let tag = _.find(getState().tags, { id });

      TagRepository.update(tag.externalId, _.pick(tag, 'text'));
    }
  },

  fetch: function() {
    return function(dispatch, getState) {
      TagRepository.fetch().then(response_json => {
        response_json.forEach(function(todo) {
          dispatch(createFetchAction(todo));
        });
      });
    }
  }
}
