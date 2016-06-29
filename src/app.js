require("assets/css/app.css");
import uuid from 'lodash-uuid';
_.mixin(uuid, {'chain': true});

import store from 'store';
// store.dispatch = (function(dispatch){
//   return function() {
//     console.log("DISPATCHING", ...arguments);
//     dispatch(...arguments);
//     console.log("STATE", store.getState());
//   };
// })(store.dispatch);
import persister from 'persister';

import Layout from 'components/layout';
import TodoList from 'components/todo-list';
import TodoTagsList from 'components/todo-tags-list';
import TagList from 'components/tag-list';
import Page from 'components/page';

let render = () => {
  let state = store.getState();

  ReactDom.render(
    <Layout>
      <ul className="tabs">
        <li onClick ={ Page.link('') } className={ Page.active() ? 'active' : null } >Todo list </li>
        <li onClick ={ Page.link('tag-list') } className={ Page.active('tag-list') ? 'active' : null } >Tag list </li>
      </ul>
      <Page default>
        <TodoList />
      </Page>

      <Page name="tag-list">
        <TagList />
      </Page>

      <Page name="tag-todo-list">
      </Page>

      <Page name="todo-tags-list" >
        <TodoTagsList />
      </Page>
    </Layout>, document.getElementById('app')
  );

  Page.navigateDefault();
}

store.dispatch(function() {type: 'DEFAULT'});

import todos from 'persisters/todos';
import tags from 'persisters/tags';
import todoTags from 'persisters/todo-tags';
import sync from 'persisters/sync';

store.dispatch({
  type: 'INIT', state: JSON.parse(localStorage.getItem('applicationState'))
});

let persisters = [
  todos,
  tags,
  todoTags
];

store.subscribe(persister(store.dispatch, store.getState, persisters));

sync(store.getState(), store.dispatch);

render();

store.subscribe(_.debounce(() => localStorage.setItem('applicationState', JSON.stringify(store.getState())), 500));
