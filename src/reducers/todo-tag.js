import composeReducer from 'lib/compose-reducer';

function synchronizeTodo(state, action) {
  if (state.todo_ExternalId === action.externalId) {
    console.log('synchronized', state.id, {todo_id: action.id}, action);
    return Object.assign({}, state, {todo_id: action.id});
  }

  if (state.todo_id === action.id) {
    console.log('synchronized', state.id, {todo_ExternalId: action.externalId}, action);
    return Object.assign({}, state, {todo_ExternalId: action.ExternalId});
  }

  return state;
}

function synchronizeTag(state, action) {
  if (state.tag_ExternalId === action.externalId) {
    return Object.assign({}, state, {tag_id: action.id});
  }

  if (state.tag_id === action.id) {
    return Object.assign({}, state, {tag_ExternalId: action.ExternalId});
  }

  return state;
}

export default composeReducer({
  DEFAULT: {},

  ADD_TODO_TAG: function(state, action) {
    return _.pick(action, 'id', 'todo_id', 'tag_id');
  },

  EDIT_TODO_TAG: function(state, action) {
    if (state.id != action.id) {
      return state;
    }

    return Object.assign({}, state, _.pick(action, 'id', 'todo_id', 'tag_id'));
  },

  ADD_TODO: synchronizeTodo,
  EDIT_TODO: synchronizeTodo,

  ADD_TAG: synchronizeTag,
  EDIT_TAG: synchronizeTag,
});
