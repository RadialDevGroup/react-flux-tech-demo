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

let resolveClientRelations = function(store, action) {
  return {
    todoTags: _.map(store.todoTags, function(todoTag) {
      let state = todoTag;

      if(state.todo_ExternalId && state.todo_id === undefined) {
        let todo = _.find(store.todos, {externalId: state.todo_ExternalId});
        state = Object.assign({}, state, {todo_id: todo && todo.id });
      }

      if(state.todo_id && state.todo_ExternalId === undefined) {
        let todo = _.find(store.todos, {id: state.todo_id});
        state = Object.assign({}, state, {todo_ExternalId: todo && todo.externalId});
      }

      if(state.tag_ExternalId && state.tag_id === undefined) {
        let tag = _.find(store.tags, {externalId: state.tag_ExternalId});
        state = Object.assign({}, state, {tag_id: tag && tag.id });
      }

      if(state.tag_id && state.tag_ExternalId === undefined) {
        let tag = _.find(store.tags, {id: state.tag_id});
        state = Object.assign({}, state, {tag_ExternalId: tag && tag.externalId});
      }

      return state;
    })
  };
}

import todos from 'reducers/todos';
import tags from 'reducers/tags';
import todoTags from 'reducers/todo-tags';
import page from 'reducers/page';

const rootReducer = (state = {}, action) => {
  if(action.type === 'INIT') state = action.state || {};

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
  }, resolveClientRelations(firstPass, action));
}

export default Redux.createStore(rootReducer, Redux.applyMiddleware(thunkMiddleware));
