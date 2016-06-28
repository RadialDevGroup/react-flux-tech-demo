require("assets/css/app.css");
import uuid from 'lodash-uuid';
_.mixin(uuid, {'chain': true});

import store from 'store';
import persister from 'persister'

// store.dispatch = (function(dispatch){
//   return function() {
//     console.log("DISPATCHING", ...arguments);
//     dispatch(...arguments);
//     console.log("STATE", store.getState());
//   };
// })(store.dispatch);

import TodoActions from 'actions/todo';
import TagActions from 'actions/tag';
import TodoTagActions from 'actions/todo-tag';

import Layout from 'components/layout';
import TodoList from 'components/todo-list';
import TodoTagsList from 'components/todo-tags-list';
import TagList from 'components/tag-list';
import Page from 'components/page';

store.dispatch(TodoActions.fetch());
store.dispatch(TagActions.fetch());
store.dispatch(TodoTagActions.fetch());

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

let persisters = [
  require('persisters/todos'),
  require('persisters/tags'),
  require('persisters/todo-tags')
]

store.subscribe(persister(store.dispatch, store.getState, persisters));

console.log(store.getState());
render();
