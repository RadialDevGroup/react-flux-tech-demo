import i from 'underscore.inflection';

// require('es6-promise').polyfill();
// require('isomorphic-fetch');

let server = "http://localhost:3001";
let path = "";

const REQUEST_SESSION = 'shared-todo-application-number-1-1-1-destruct';
const DEFAULT_HEADERS = {
  'REQUEST_SESSION': REQUEST_SESSION,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function getJSON(response) {
  return response.json();
}

const Repository = {
  model: function(model) {
    return _.reduce(_.functions(Repository), (m, f) => {
      m[f] = _.partial(Repository[f], model);
      return m;
    }, {});
  },

  update: function(model, id, properties) {
    let model_name = model.toLowerCase();
    let plural_model_name = i.pluralize(model_name);

    let payload = JSON.stringify(_.tap({}, src => src[model_name] = properties ));

    return fetch([server + path, plural_model_name, id].join('/'), {
      method: "PATCH",
      headers: DEFAULT_HEADERS,
      body: payload
    }).then(getJSON);
  },

  fetch: function(model) {
    let model_name = model.toLowerCase();
    let plural_model_name = i.pluralize(model_name);

    return fetch([server + path, plural_model_name].join('/'), {
      method: "GET",
      headers: DEFAULT_HEADERS
    }).then(getJSON);
  },

  get: function(model, id) {
    let model_name = model.toLowerCase();
    let plural_model_name = i.pluralize(model_name);

    let payload = JSON.stringify({}.tap(src => { src[model_name] = properties}));

    return fetch([server + path, plural_model_name, id].join('/'), {
      method: "GET",
      headers: DEFAULT_HEADERS
    }).then(getJSON);
  },

  create: function(model, properties) {
    let model_name = model.toLowerCase();
    let plural_model_name = i.pluralize(model_name);

    let payload = JSON.stringify({}.tap(src => { src[model_name] = properties}));

    return fetch([server + path, plural_model_name].join('/'), {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: payload
    }).then(getJSON);
  }
}

export default Repository
