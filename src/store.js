import thunkMiddleware from 'redux-thunk';

import todos from 'reducers/todos';

const rootReducer = (state = {}, action) => {
  return {
    todos: todos(state.todos, action)
  };
}

export default Redux.createStore(rootReducer, Redux.applyMiddleware(thunkMiddleware));
