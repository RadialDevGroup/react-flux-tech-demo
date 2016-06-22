let id = 0;

export default function(state, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: id++,
        text: action.text,
        completed: false
      }

    case 'TOGGLE_TODO':
      if (state.id != action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
}
