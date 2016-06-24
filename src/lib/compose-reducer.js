import _ from 'lodash';

export default function(mapping={}) {
  let resolvedState = function(state) {
    return state || mapping['DEFAULT'] ;
  }

  return function(state, action) {
    if (_.isFunction(mapping[action.type])) {
      return _.invoke(mapping, action.type, state, action);
    }

    return resolvedState(state);
  }
}
