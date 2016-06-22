import _ from 'lodash';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import store from 'store';

import Todo from 'actions/todo';

import Layout from 'components/layout';
import TodoList from 'components/todo-list';

function render() {
  ReactDom.render(
    <Layout>
      <TodoList
        todos={ store.getState().todos }
        onCheck={ id => store.dispatch(Todo.toggle(id)) }
        onAdd={ text => store.dispatch(Todo.create(text)) }
      />
    </Layout>, document.getElementById('app'));
}

render();

store.subscribe(render);

store.dispatch(Todo.create("Go Shopping"));
store.dispatch(Todo.create("Lern Redux"));
store.dispatch(Todo.create("Program Functionally"));
store.dispatch(Todo.create("Make todos SMART"));
