import _ from 'lodash';
import TodoRepository from 'repositories/todo';

let id = 0;

const createFetchAction = (todo) => {
  let baseAction = {type: 'ADD_TODO', id: id++};
  let values = _.pick(todo, 'text', 'completed');
  let idSubstitution = {externalId: todo.id};

  return Object.assign(baseAction, values, idSubstitution);
}

export default {
  create: function(text) {
    if ( _.isEmpty(text) ) { return new Function(); }

    return function(dispatch, getState) {
      let current_id = id++;
      dispatch({text, id: current_id, type: 'ADD_TODO'});

      TodoRepository.create({text, completed: false}).then(response_json => {
        dispatch({type: 'EDIT_TODO', externalId: response_json.id, id: current_id });
      }, _.bind(console.log, console, "rejected", _, 'TODOID: ' + current_id));
    }
  },

  toggle: function(id) {
    return function(dispatch, getState) {
      dispatch({id, type: 'TOGGLE_TODO'});

      let todo = _.find(getState().todos, { id });

      TodoRepository.update(todo.externalId, _.pick(todo, 'completed'));
    }
  },

  update: function(id, fields) {
    return function(dispatch, getState) {
      dispatch(Object.assign({}, fields, {
        id: id, type: 'EDIT_TODO'
      }));

      let todo = _.find(getState().todos, { id });

      TodoRepository.update(todo.externalId, _.pick(todo, 'text'));
    }
  },

  fetch: function() {
    return function(dispatch, getState) {
      TodoRepository.fetch().then(response_json => {
        response_json.forEach(function(todo) {
          dispatch(createFetchAction(todo));
        });
      });
    }
  }
}
