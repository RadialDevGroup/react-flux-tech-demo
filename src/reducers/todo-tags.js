import composeReducer from 'lib/compose-reducer';
import todoTag from 'reducers/todo-tag';

function update_todo_tag(state, action) {
  return state.map(t => todoTag(t, action));
}

export default composeReducer({
  DEFAULT: [],
  'ADD_TODO_TAG': function(state, action) {
    return [...state, todoTag(undefined, action)];
  },
  'EDIT_TODO_TAG': update_todo_tag,
  'ADD_TAG': update_todo_tag,
  'ADD_TODO': update_todo_tag,
  'EDIT_TAG': update_todo_tag,
  'EDIT_TODO': update_todo_tag,
});
