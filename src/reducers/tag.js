import _ from 'lodash';
import composeReducer from 'lib/compose-reducer';

export default composeReducer({
  ADD_TAG: function(state, action) {
    return Object.assign({completed: false}, _.pick(action, 'id', 'text', 'externalId'));
  },

  EDIT_TAG: function(state, action) {
    if (state.id != action.id) {
      return state;
    }

    return Object.assign({}, state, _.pick(action, 'externalId', 'text'));
  }
});
