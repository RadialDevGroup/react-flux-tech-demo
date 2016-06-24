import _ from 'lodash';
import thunkMiddleware from 'redux-thunk';

import composeReducer from 'lib/compose-reducer';

let currentObject = composeReducer({
  SET_CURRENT: function(state, action) {
    console.log(state, action, _.pick(action, 'model_type', 'id'));
    return _.pick(action, 'model_type', 'id');
  },

  DEFAULT: _.partial(_.identity, {})
});

let todoTags = composeReducer({DEFAULT: []});

let filteredTags = composeReducer({DEFAULT: []});

import todos from 'reducers/todos';
import tags from 'reducers/tags';
import page from 'reducers/page';

const rootReducer = (state = {}, action) => {
  return {
    tags: tags(state.tags, action),
    todos: todos(state.todos, action),
    todoTags: todoTags(state.todoTags, action),
    filteredTags: filteredTags(state.filteredTags, action),
    currentPage: page(state.currentPage, action),
    currentObject: currentObject(state.currentObject, action)
  };
}

export default Redux.createStore(rootReducer, Redux.applyMiddleware(thunkMiddleware));
