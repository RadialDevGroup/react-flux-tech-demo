import _ from 'lodash';

import TodoTagRepository from 'repositories/todo-tag';
import TagRepository from 'repositories/tag';

import createAndPersistTag from 'reducers/shared/create-and-persist-tag';

const createFetchAction = function(todoTag, getState) {
  let baseAction = {type: 'ADD_TODO_TAG', id: _.uuid()};
  let todo = _.find(getState().todos, {externalId: todoTag.todo_id});
  let tag = _.find(getState().tags, {externalId: todoTag.tag_id});

  console.log('lookup on load', tag, todo);

  let values = {
    todo_id: todo && todo.id,
    tag_id: tag && tag.id,
    tag_ExternalId: todoTag.tag_id,
    todo_ExternalId: todoTag.todo_id,
  };

  return Object.assign(baseAction, values);
}

function updateTodoTag(dispatch, id, externalId) {
  dispatch({type: 'EDIT_TODO_TAG', externalId, id });
}

// This is maybe not the best strategy, here
function persistTodoTag(dispatch, getState, tag_id, todo_id, todo_tag_id, ...callback) {
  let tag = _.find(getState().tags, {id: tag_id});
  let todo = _.find(getState().todos, {id: todo_id});

  if(!tag || !tag.externalId || !todo || !todo.externalId) {
    setTimeout(persistTodoTag.bind(null, ...arguments), 250);
  } else {
    TodoTagRepository
      .create({todo_id: todo.externalId, tag_id: tag.externalId})
      .then(response_json => {
        console.log(response_json);
        updateTodoTag(dispatch, todo_tag_id, response_json.externalId)
      })
      .then(...callback);
  }
}

function updateTag(dispatch, tag_id, response_json) {
  dispatch({type: 'EDIT_TAG', externalId: response_json.id, id: tag_id});
}

export default {
  create: function({text, todo_id, tag_id}) {
    let onError = _.bind(console.log, console, "rejected", _, 'TAGID: ' + tag_id);
    let todo_tag_id = _.uuid();

    if ( _.isEmpty(text) || _.isEmpty(todo_id)) {
      return new Function();
    }

    return function(dispatch, getState) {
      let tagPromise = Promise.resolve(tag_id);

      if (!tag_id) {
        tag_id = _.uuid();
        dispatch({text, id: tag_id, type: 'ADD_TAG'});

        tagPromise = TagRepository
          .create({text})
          .then(_.partial(updateTag, dispatch, tag_id), onError)
      }

      dispatch({id: todo_tag_id, type: 'ADD_TODO_TAG', tag_id, todo_id, text});

      let onTodoTagCreateError = function(callback) {
        return function() {
          if(_.isFunction(callback)) callback(arguments);
          _.bind(console.log, console, "rejected", _, 'TODO_TAG_ID: ' + todo_tag_id).apply(null, arguments);
        }
      };

      tagPromise.then(() => {
        return new Promise(function(resolve, reject) {
          persistTodoTag(dispatch, getState, tag_id, todo_id, todo_tag_id, response_json => {
            resolve(response_json);
          }, onTodoTagCreateError(reject));
        });
      });
    }
  },

  fetch: function() {
    return function(dispatch, getState) {
      TodoTagRepository.fetch().then(response_json => {
        response_json.forEach(function(todoTag) {
          dispatch(createFetchAction(todoTag, getState));
        });
      });
    };
  }
}
