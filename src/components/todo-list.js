import ContentEditable from "react-contenteditable";
import _ from 'lodash';

import store from 'store';

import Checkbox from 'components/utility/checkbox';
import List from 'components/utility/list';
import Item from 'components/utility/item';

import Page from 'components/page';

import TodoActions from 'actions/todo';


export default React.createClass({
  getDefaultProps: function() {
    return {
      todos: []
    }
  },

  check: function(id) {
    return () => store.dispatch(TodoActions.toggle(id));
  },

  addTodo: function(evt) {
    store.dispatch(TodoActions.create(evt.target.value));
    evt.target.value = '';
  },

  edit: function(id) {
    let edit = _.debounce(function(text) {
      store.dispatch(TodoActions.update(id, {text}));
    }, 500);

    return evt => edit(evt.target.value);
  },

  showTagList: function(id) {
    return function() {
      store.dispatch(TodoActions.setCurrent(id));
      Page.navigate('todo-tags-list');
    }
  },

  componentDidMount: function() {
    let forceUpdate = this.forceUpdate.bind(this);

    this.unsubscribe = store.subscribe(function() {
      forceUpdate();
    });
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  renderItems: function(item) {
    return (
      <Item key={item.id} >
        <Checkbox checked = { item.completed } onCheck={ this.check(item.id) } id={item.id} />
        <ContentEditable
          html={item.text} // innerHTML of the editable div
          disabled={false}       // use true to disable edition
          onChange={ this.edit(item.id) } // handle innerHTML change
        />
        {' '}
        <button onClick={ this.showTagList(item.id) }>tags</button>
      </Item>
    );
  },

  catchEnter: function(evt) {
    if( evt.keyCode == '13' ) {
      evt.preventDefault();

      this.addTodo(evt);
      return true;
    }
  },

  render: function() {
    return (
      <List>
        <input type="text" onBlur = { this.addTodo } onKeyDown = { this.catchEnter }  placeholder = "new todo" />
        {store.getState().todos.map(this.renderItems)}
      </List>
    );
  }
});
