import thunkMiddleware from 'redux-thunk';

import todos from 'reducers/todos';
import tags from 'reducers/tags';
import page from 'reducers/page';

const rootReducer = (state = {}, action) => {
  return {
    tags: tags(state.tags, action),
    todos: todos(state.todos, action),
    currentPage: page(state.currentPage, action)
  };
}

export default Redux.createStore(rootReducer, Redux.applyMiddleware(thunkMiddleware));
