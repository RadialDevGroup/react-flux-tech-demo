import thunkMiddleware from 'redux-thunk';

import todos from 'reducers/todos';
import page from 'reducers/page';

const rootReducer = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    currentPage: page(state.currentPage, action)
  };
}

export default Redux.createStore(rootReducer, Redux.applyMiddleware(thunkMiddleware));
