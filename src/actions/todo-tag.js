import _ from 'lodash';

import TodoTagRepository from 'repositories/todo-tag';
import TagRepository from 'repositories/tag';

import {tagCounter, todoTagCounter} from 'reducers/shared/counters';
import createAndPersistTag from 'reducers/shared/create-and-persist-tag';


const createFetchAction = (todo) => {
  let baseAction = {type: 'ADD_TODO', id: id++};
  let values = _.pick(todo, 'text', 'completed');
  let idSubstitution = {externalId: todo.id};

  return Object.assign(baseAction, values, idSubstitution);
}

export default {
  create: function({text, todo_id, tag_id}) {
    if ( _.isEmpty(text) || _.isEmpty(todo_id)) { return new Function(); }

    return function(dispatch, getState) {
      let tag, todo, tag_promise;

      if(_.isEmpty(tag_id)) {
        tag = _.find(getState().tags, {text});
        todo = _.find(getState().todos, {id: todo_id});

        if (!tag) {
          tag_promise = createAndPersistTag(dispatch, getState, {text}).then(function(response_json) {
            return _.find(getState().tags, {externalId: reponse_json.id});
          });
        } else {
          tag_promise = new Promise(tag);
        }
      }

      tag_promise.then(tag => {
        let current_id = todoTagCounter();
        dispatch({text, id: current_id, type: 'ADD_TODO_TAG',
          tag_id: tag.id, todo_id: todo.id
        });

        TodoTagRepository.create({text, todo_id: todo.externalId, tag_id: tag.externalId }).then(response_json => {
          dispatch({type: 'EDIT_TODO_TAG', externalId: response_json.id, id: current_id });
        }, _.bind(console.log, console, "rejected", _, 'TODO_TAG_ID: ' + current_id));
      });
    }
  }
}
