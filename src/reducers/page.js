import composeReducer from 'lib/compose-reducer';

export default composeReducer({
  'SET_PAGE': function(state, action) {
    return action.name;
  }
})
