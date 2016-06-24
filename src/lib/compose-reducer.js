import _ from 'lodash';

export default function(mapping) {
  return function(state, action) {
    return _.isFunction(mapping[action.type]) ? _.invoke(mapping, action.type, state, action) : state;
  }
}
