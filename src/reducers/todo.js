import _ from 'lodash';
import composeReducer from 'lib/compose-reducer';

export default composeReducer({
  ADD_TODO: function(state, action) {
    return Object.assign({completed: false}, _.pick(action, 'id', 'text', 'externalId', 'completed'));
  },

  TOGGLE_TODO: function(state, action) {
    if (state.id != action.id) {
      return state;
    }

    return Object.assign({}, state, {
      completed: !state.completed
    });
  },

  EDIT_TODO: function(state, action) {
    if (state.id != action.id) {
      return state;
    }

    return Object.assign({}, state, _.pick(action, 'externalId', 'text', 'completed'));
  }
});
