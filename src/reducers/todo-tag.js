import composeReducer from 'lib/compose-reducer';

function synchronizeTodo(state, action) {
  if (action.externalId && state.todo_ExternalId === action.externalId) {
    console.log('synchronized', state.id, {todo_id: action.id}, action);
    return Object.assign({}, state, {todo_id: action.id});
  }

  if (action.id && state.todo_id === action.id) {
    console.log('synchronized', state.id, {todo_ExternalId: action.externalId}, action);
    return Object.assign({}, state, {todo_ExternalId: action.ExternalId});
  }

  return state;
}

function synchronizeTag(state, action) {
  if (action.externalId && state.tag_ExternalId === action.externalId) {
    return Object.assign({}, state, {tag_id: action.id});
  }

  if (action.id && state.tag_id === action.id) {
    return Object.assign({}, state, {tag_ExternalId: action.ExternalId});
  }

  return state;
}

export default composeReducer({
  DEFAULT: {},

  SYNC_TODO_TAG: function(state, action) {
    return Object.assign({id: action.id}, state, _.pick(action,
      'externalId', 'tag_ExternalId', 'todo_ExternalId', 'persisted'));
  },

  ADD_TODO_TAG: function(state, action) {
    return _.pick(action, 'id', 'todo_id', 'tag_id', 'externalId', 'tag_ExternalId', 'todo_ExternalId', 'persisted');
  },

  EDIT_TODO_TAG: function(state, action) {
    if (state.id != action.id) {
      return state;
    }

    return Object.assign({persisted: false}, state, _.pick(action,
      'id', 'todo_id', 'tag_id', 'externalId', 'tag_ExternalId', 'todo_ExternalId', 'persisted'));
  },

  ADD_TODO: synchronizeTodo,
  EDIT_TODO: synchronizeTodo,
  SYNC_TODO: synchronizeTodo,

  ADD_TAG: synchronizeTag,
  EDIT_TAG: synchronizeTag,
  SYNC_TAG: synchronizeTag
});
