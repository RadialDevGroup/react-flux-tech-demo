import TodoTagRepository from 'repositories/todo-tag';
import TodoRepository from 'repositories/todo';
import TagRepository from 'repositories/tag';

import _ from 'lodash';

export default function(state, dispatch) {
  Promise.all(
    TagRepository.fetch(),
    TodoRepository.fetch(),
    TodoTagRepository.fetch()
  ).then(function(tags, todos, todoTags) {
    dispatch(function(dispatch, getState) {
      todos.forEach(function(todo) {
        dispatch({
          type: 'SYNC_TAG',
          externalId: todo.id,
          text: todo.text,
          id: _.uuid(),
          persisted: true
        });
      });

      todos.forEach(function(todo) {
        dispatch({
          type: 'SYNC_TODO',
          externalId: todo.id,
          completed: todo.completed,
          text: todo.text,
          id: _.uuid(),
          persisted: true
        });
      });

      todotags.forEach(function(todotag) {
        dispatch({
          type: 'SYNC_TODO_TAG',
          externalId: todotag.id,
          todo_ExternalId: todotag.todo_id,
          tag_ExternalId: todotag.tag_id,
          id: _.uuid(),
          persisted: true
        });
      });
    });
  }, function(error) {
    dispatch({
      type: 'PERSISTENCE_ERROR',
      error: error
    });
  });

  return true;
}
