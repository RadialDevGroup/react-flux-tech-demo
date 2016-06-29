import _ from 'lodash';



const endsWithId = /_id$/;
export function externalFromId(obj) {
  return _.mapKeys(obj, (v, key) =>  {
    if(endsWithId.test(key)){
      return key.replace(endsWithId, '_ExternalId');
    } else if (key === 'id') {
      return 'externalId'
    }

    return key;
  });
}

export function defaultId(obj) {
  return Object.assign({}, obj, {id: _.uuid() })
}

export function preset(defs) {
  return obj => Object.assign({}, defs, obj);
}

export function translateIds(obj) {
  return defaultId(externalFromId(obj));
}

export const persisted = preset({persisted: true});
export const translateForSync = _.flow(persisted, translateIds)

export function translateEachForSync(objs) {
  return _.map(objs, translateForSync);
}

export function handleError(error) {
  return function(dispatch, getState) {
    dispatch({
      type: 'PERSISTENCE_ERROR',
      error: error
    })
  };
}
