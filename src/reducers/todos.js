import todo from './todo';

export default function(state = [], action) {
  switch(action.type) {
    case 'SYNC_TODO':
      return [
        ..._.reject(state, {externalId: action.externalId}),
        todo(_.find(state, {externalId: action.externalId}), action)
      ];
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    case 'EDIT_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}
