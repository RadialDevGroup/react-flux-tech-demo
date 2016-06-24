import ContentEditable from "react-contenteditable";
import _ from 'lodash';

import store from 'store';

import Checkbox from 'components/utility/checkbox';
import List from 'components/utility/list';
import Item from 'components/utility/item';

import Page from 'components/page';

import TodoTagActions from 'actions/todo-tag';
import TagActions from 'actions/tag';


export default React.createClass({
  getDefaultProps: function() {
    return {
      todos: []
    }
  },

  check: function(id) {
    return () => store.dispatch(TodoActions.toggle(id));
  },

  addTag: function(evt) {
    return evt => {
      TodoTagActions.create({
        text: evt.target.value,
        todo_id: store.getState().currentObject.id
      });

      evt.target.value = '';
    }
  },

  edit: function(id) {
    let edit = _.debounce(function(text) {
      store.dispatch(TagActions.update(id, {text}));
    }, 500);

    return evt => edit(evt.target.value);
  },

  showTagList: function(id) {
    return function() {
      store.dispatch(TodoActions.setCurrent(id));
      console.log(store.getState());
      Page.navigate('todo-tags-list');
    }
  },

  componentDidMount: function() {
    this.unsubscribe = store.subscribe(_.bind(this.forceUpdate, this));
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  renderItems: function(item) {
    return (
      <Item key={ item.id} >
        <Checkbox checked = { item.completed } onCheck={ this.check(item.id) } id={item.id} />
        <ContentEditable
          html={item.text} // innerHTML of the editable div
          disabled={false}       // use true to disable edition
          onChange={ this.edit(item.id) } // handle innerHTML change
        />
        {' '}
      </Item>
    );
  },

  catchEnter: function(evt) {
    if( evt.keyCode == '13' ) {
      evt.preventDefault();

      this.addTag(evt);
    }
  },

  render: function() {
    return (
      <div>
        <button onClick={ Page.navigate }>Home</button>
        <List>
          <input type="text" onBlur = { this.addTag } onKeyDown = { this.catchEnter }  placeholder = "new tag" />
          {store.getState().filteredTags.map(this.renderItems)}
        </List>
      </div>
    );
  }
});
