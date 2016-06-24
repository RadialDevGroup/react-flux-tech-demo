require("assets/css/app.css");

import store from 'store';

store.dispact = (function(){
  return function() {
    console.log(arguments);
    store.dispatch(arguments);
  };
})(store.dispatch);

import TodoActions from 'actions/todo';
import TagActions from 'actions/tag';

import Layout from 'components/layout';
import TodoList from 'components/todo-list';
import TodoTagsList from 'components/todo-tags-list';
import TagList from 'components/tag-list';
import Page from 'components/page';

store.dispatch(TodoActions.fetch());
store.dispatch(TagActions.fetch());

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
        { state.currentObject.model_type} Number { state.currentObject.id}
      </Page>
    </Layout>, document.getElementById('app')
  );

  Page.navigateDefault();
}

store.dispatch(function() {type: 'DEFAULT'});
console.log(store.getState());
render();
