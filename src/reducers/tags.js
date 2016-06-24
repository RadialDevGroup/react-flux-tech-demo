import tag from './tag';

export default function(state = [], action) {
  switch(action.type) {
    case 'ADD_TAG':
      return [...state, tag(undefined, action)];
    case 'EDIT_TAG':
      return state.map(t => tag(t, action));
    default:
      return state;
  }
}
