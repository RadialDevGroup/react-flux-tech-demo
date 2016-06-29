import todo from './todo';

import { byExternalIdInSet } from './helpers/sync';

export default function(state = [], action) {
  switch(action.type) {
    case 'SYNC':
      let stateExternalIds = _.map(state, 'externalId');
      let newTodos = _.reject(action.todos, byExternalIdInSet(stateExternalIds));

      return _.map(_.flatten([state, newTodos]), t => {
        let newAction = Object.assign({type: 'SYNC_TODO'},
          t.externalId ? _.find(action.todos, _.pick(t, 'externalId')) : undefined
        );
        return todo(t, newAction);
      });
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
