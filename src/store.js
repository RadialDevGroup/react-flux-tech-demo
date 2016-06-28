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

let filteredTags = function(state, action) {
  if(state.currentObject) {
    if (state.currentObject.model_type === 'Todo') {
      let tagIds = _.map(_.filter(state.todoTags, {
        todo_id: state.currentObject.id
      }), 'tag_id');

      return _.filter(state.tags, function(tag) {
        return _.includes(tagIds, tag.id);
      });
    }
  }

  return [];
};

let currentTodo = composeReducer({
  DEFAULT: {text: 'None selected'},
  SET_CURRENT: function(state, action) {
    if (state.currentObject.model_type === 'Todo') {
      return _.find(state.todos, {id: state.currentObject.id})
    }
  }
})

import todos from 'reducers/todos';
import tags from 'reducers/tags';
import todoTags from 'reducers/todo-tags';
import page from 'reducers/page';

const rootReducer = (state = {}, action) => {
  let firstPass = {
    tags: tags(state.tags, action),
    todos: todos(state.todos, action),
    todoTags: todoTags(state.todoTags, action),
    currentPage: page(state.currentPage, action),
    currentObject: currentObject(state.currentObject, action),
    filteredTags: state.filteredTags,
    currentTodo: state.currentTodo
  };

  return Object.assign(firstPass, {
    filteredTags: filteredTags(firstPass, action, 'filteredTags'),
    currentTodo: currentTodo(firstPass, action, 'currentTodo')
  });
}

export default Redux.createStore(rootReducer, Redux.applyMiddleware(thunkMiddleware));
