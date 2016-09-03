/*eslint no-console: "off"*/
export default function persistenceManager(getState, dispatch, persisters, sync, options={}) {
  let locked = false;

  let validPersisters = _.filter(persisters, function(persister) {
    return _.isFunction(persister) ? true : console.error('persisters must be a function');
  });

  let time = options.time || 30000;
  let syncOpts = _.assign({}, {trailing: false}, _.omit(options, 'time'));
  let throttledSync = _.isFunction(sync) ? _.throttle(sync, time, syncOpts) : _.noop;

  return function persistenceSubscriber() {
    _.each(validPersisters, function(persister) {
      if(locked) return;
      locked = true;
      let returnsTrue = false;

      function proxy(action) {
        if(returnsTrue) {
          locked = false;
          dispatch(action);
        }
      }

      returnsTrue = persister(getState(), _.once(proxy));
      if (!returnsTrue) locked = false;
    });

    if(!locked) throttledSync(getState(), dispatch);
  };
};
