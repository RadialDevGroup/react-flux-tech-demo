import TodoRepository from 'repositories/todo';

export default function todoPersister(state, dispatch) {
  let unpersistedADD = _.find(state.todos, function(todo) {
    return ! todo.externalId;
  });

  if(unpersistedADD) {
    TodoRepository
      .create(_.pick(unpersistedADD, 'text'))
      .then(function(todo) {
        dispatch({
          type: 'EDIT_TODO',
          id: unpersistedADD.id,
          externalId: todo.id,
          persisted: true
        });
      }, function(error) {
        dispatch({
          type: 'PERSISTENCE_ERROR',
          error: error
        });
      });

    return true;
  }

  let unpersistedEdit = _.find(state.todos, {persisted: false});
  if(unpersistedEdit && unpersistedEdit.externalId) {
    TodoRepository
      .update(unpersistedEdit.externalId, _.pick(unpersistedEdit, 'text'))
      .then(function() {
        dispatch({
          type: 'EDIT_TODO',
          id: unpersistedEdit.id,
          persisted: true
        });
      }, function(error) {
        dispatch({
          type: 'PERSISTENCE_ERROR',
          error: error
        });
      });

    return true;
  }
}
