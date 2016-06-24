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
import TagList from 'components/tag-list';
import Page from 'components/page';

store.dispatch(TodoActions.fetch());
store.dispatch(TagActions.fetch());

store.subscribe(() => {
  let state = store.getState();

  ReactDom.render(
    <Layout>
      <ul className="tabs">
        <li onClick ={ Page.link('') } className={ Page.active() ? 'active' : null } >Todo list </li>
        <li onClick ={ Page.link('tag-list') } className={ Page.active('tag-list') ? 'active' : null } >Tag list </li>
      </ul>
      <Page default>
        <TodoList
          todos={ state.todos }
          onCheck={ id => store.dispatch(TodoActions.toggle(id)) }
          onAdd={ text => store.dispatch(TodoActions.create(text)) }
          onEdit={ (id, text) => store.dispatch(TodoActions.update(id, {text})) }
        />
      </Page>

      <Page name="tag-list">
        <TagList
          tags={ state.tags }
          onAdd={ text => store.dispatch(TagActions.create(text)) }
          onEdit={ (id, text) => store.dispatch(TagActions.update(id, {text})) }
        />
      </Page>

      <Page name="tag-todo-list" />
      <Page name="todo-tags-list" />
    </Layout>, document.getElementById('app'));

    Page.navigateDefault();
});
