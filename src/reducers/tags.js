import tag from './tag';

export default function(state = [], action) {
  switch(action.type) {
    case 'SYNC_TAG':
      return [
        ..._.reject(state, {externalId: action.externalId}),
        tag(_.find(state, {externalId: action.externalId}), action)
      ];
    case 'ADD_TAG':
      return [...state, tag(undefined, action)];
    case 'EDIT_TAG':
      return state.map(t => tag(t, action));
    default:
      return state;
  }
}
