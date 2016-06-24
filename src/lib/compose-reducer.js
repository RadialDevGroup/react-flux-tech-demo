import _ from 'lodash';

export default function(mapping={}) {
  let actionHandlers = _.pick(mapping, _.functions(mapping));
  actionHandlers['DEFAULT'] = _.partial(_.result, mapping, 'DEFAULT');

  let resolvedState = function(state) {
    return state || _.result(actionHandlers,'DEFAULT');
  };

  return function(state, action) {
    if (_.isFunction(actionHandlers[action.type])) {
      return _.invoke(actionHandlers, action.type, state, action);
    }

    return resolvedState(state);
  }
}
