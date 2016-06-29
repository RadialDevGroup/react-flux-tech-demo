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

      return persister(state, function(action) {
        processing = false;
        console.log(action);
        dispatch(action);
      });
    })) {
      processing = true;
    } else {
      throttledSync(state, dispatch);
    }
  };
};
