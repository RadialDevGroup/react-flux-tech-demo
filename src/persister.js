import _ from 'lodash';
export default function(dispatch, getState, persisters = [], sync) {
  let processing = false;
  let throttledSync = _.throttle(_.partial(_.result, {sync}, 'sync'), 30000);

  return function rootPersister() {
    if (processing) return;
    let state = getState();

    if(_.find(persisters, function(persister) {
      if(! _.isFunction(persister)) {
        console.log(persister);
        return;
      }

      return persister(state, (function() {
        let called = false;
        return function(action) {
          if (called === true) {
            console.error('persister dispatch called more than once -- please call dispatch only once per persitence pass');
            return;
          }

          called = true;
          processing = false;
          console.log(action);
          dispatch(action);
        }
      })());
    })) {
      processing = true;
    } else {
      throttledSync(state, dispatch);
    }
  };
};
