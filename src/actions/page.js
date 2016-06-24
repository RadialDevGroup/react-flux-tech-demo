export default {
  setPage: function(pageName) {
    return {
      type: 'SET_PAGE',
      name: pageName
    };
  }
}
