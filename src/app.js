import _ from 'lodash';
import todos from 'reducers/todos';
import Layout from 'components/layout'
import TodoList from 'components/todo-list'

const store = Redux.createStore((state = {}, action) => {
  return {
    todos: todos(state.todos, action),
  };
})

const checkTodo = function(id) { store.dispatch({type: 'TOGGLE_TODO', id: id }); }

const addTodo = function(text) {
  if ( _.isEmpty(text) ) return false;
  store.dispatch({type: 'ADD_TODO', text});
}

function render() {
  ReactDom.render(
    <Layout>
      <TodoList
        todos={ store.getState().todos }
        onCheck={ checkTodo }
        onAdd={ addTodo }
      />
    </Layout>, document.getElementById('app'));
}

render();
store.subscribe(render);

addTodo("Go Shopping");
addTodo("Lern Redux");
addTodo("Program Functionally");
addTodo("Make todos SMART");
