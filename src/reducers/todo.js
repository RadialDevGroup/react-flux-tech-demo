import _ from 'lodash';

export default function(state, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return Object.assign({completed: false}, _.pick(action, 'id', 'text', 'externalId'));

    case 'TOGGLE_TODO':
      if (state.id != action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });

    case 'EDIT_TODO':
      if (state.id != action.id) {
        return state;
      }

      return Object.assign({}, state, _.pick(action, 'externalId', 'text', 'completed'));
    default:
      return state;
  }
}
