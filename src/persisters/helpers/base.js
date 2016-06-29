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

export function translateForSync(objs) {
  return _.map(objs, _.flow(preset({persisted: true}), translateIds));
}
