import ContentEditable from "react-contenteditable";
import _ from 'lodash'

import Checkbox from 'components/utility/checkbox'
import List from 'components/utility/list'
import Item from 'components/utility/item'


export default React.createClass({
  getDefaultProps: function() {
    return {
      todos: []
    }
  },

  check: function(id) {
    this.props.onCheck(id);
  },

  addTodo: function(evt) {
    this.props.onAdd(evt.target.value);
    evt.target.value = '';
  },

  edit: function(id) {
    let edit = _.debounce(_.partial(this.props.onEdit, id), 500);
    return evt => edit(evt.target.value);
  },

  renderItems: function(item) {
    return (
      <Item key={ item.id} >
        <Checkbox checked = { item.completed } onCheck={ this.check } id={item.id} />
        <ContentEditable
          html={item.text} // innerHTML of the editable div
          disabled={false}       // use true to disable edition
          onChange={ this.edit(item.id) } // handle innerHTML change
        />
      </Item>
    );
  },

  catchEnter: function(evt) {
    if( evt.keyCode == '13' ) {
      evt.preventDefault();

      this.addTodo(evt);
    }
  },

  render: function() {
    return (
      <List>
        <input type="text" onBlur = { this.addTodo } onKeyDown = { this.catchEnter }  placeholder = "new todo" />
        {this.props.todos.map(this.renderItems)}
      </List>
    );
  }
});
