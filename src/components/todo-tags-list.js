import ContentEditable from "react-contenteditable";
import _ from 'lodash';

import store from 'store';

import Checkbox from 'components/utility/checkbox';
import List from 'components/utility/list';
import Item from 'components/utility/item';

import Page from 'components/page';

import TodoTagActions from 'actions/todo-tag';
import TagActions from 'actions/tag';
import TodoActions from 'actions/todo';


export default React.createClass({
  getDefaultProps: function() {
    return {
      todos: []
    }
  },

  getInitialState: function() {
    return {selectedTag: ''};
  },

  check: function(id) {
    return () => store.dispatch(TodoActions.toggle(id));
  },

  addTag: function(evt) {
    let actionArgs = {
      text: evt.target.value,
      todo_id: store.getState().currentObject.id
    };

    if(this.getTag(evt.target.value)) {
      actionArgs.tag_id = this.getTag(evt.target.value).id;
    }

    store.dispatch(TodoTagActions.create(actionArgs));

    evt.target.value = '';
    this.setState({selectedTag: ''});
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
        {item.text}
      </Item>
    );
  },

  catchEnter: function(evt) {
    if( evt.keyCode == '13' ) {
      evt.preventDefault();

      this.addTag(evt);
    }
  },

  getTag: function(value) {
    let currentEntry = new RegExp('\^' + value);

    return _.find(store.getState().tags,function(tag) {
      return currentEntry.test(tag.text);
    });
  },

  catchKey: function(evt) {
    this.catchEnter(evt)

    this.setState({selectedTag: this.getTag(evt.target.value) && this.getTag(evt.target.value).text });
  },

  goHome: function() {
    Page.navigate('');
    store.dispatch(TodoActions.setCurrent());
  },

  setTagFromSelection: function(evt) {
    let actionArgs = {
      text: this.state.selectedTag,
      todo_id: store.getState().currentObject.id
    };

    if(this.getTag(this.state.selectedTag)) {
      actionArgs.tag_id = this.getTag(this.state.selectedTag).id;
    }

    store.dispatch(TodoTagActions.create(actionArgs))

    this.refs.entry.value = '';
    this.setState({selectedTag: ''});
  },

  render: function() {
    return (
      <div>
        <button onClick={ this.goHome }>Home</button>
        <h3>{store.getState().currentTodo.text}</h3>
        <List>
          <input ref="entry" type="text" onKeyDown = { this.catchKey } placeholder = "new tag" />
          <div onClick={ this.setTagFromSelection }>{this.state.selectedTag}</div>
          { store.getState().filteredTags.map(this.renderItems) }
        </List>
      </div>
    );
  }
});
