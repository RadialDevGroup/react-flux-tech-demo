export default function(dispatch, getState, persisters = []) {
  return function rootPersister() {
    let state = getState();

    _.find(persisters, function(persister) {
      return persister(state, dispatch);
    });
  };
};
