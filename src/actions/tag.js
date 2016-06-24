import _ from 'lodash';
import TagRepository from 'repositories/tag';

let id = 0;

const createFetchAction = (todo) => {
  let baseAction = {type: 'ADD_TAG', id: id++};
  let values = _.pick(todo, 'text');
  let idSubstitution = {externalId: todo.id};

  return Object.assign(baseAction, values, idSubstitution);
}

export default {
  create: function(text) {
    if ( _.isEmpty(text) ) { return new Function(); }

    return function(dispatch, getState) {
      let current_id = id++;
      dispatch({text, id: current_id, type: 'ADD_TAG'});

      TagRepository.create({text}).then(response_json => {
        dispatch({type: 'EDIT_TAG', externalId: response_json.id, id: current_id });
      }, _.bind(console.log, console, "rejected", _, 'TAGID: ' + current_id));
    }
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
