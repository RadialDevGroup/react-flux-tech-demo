let id = 0;
export default {
  create: function(text) {
    if ( _.isEmpty(text) ) {
      return { type: null }
    }

    return {
      text, id: id++, type: 'ADD_TODO'
    };
  },

  toggle: function(id) {
    return {
      id: id++, type: 'TOGGLE_TODO'
    };
  },

  update: function(id, fields) {
    return object.assign({}, fields, {
      id: id, type: 'EDIT_TODO'
    });
  }
}
