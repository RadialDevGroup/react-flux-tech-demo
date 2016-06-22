import Checkbox from 'components/utility/checkbox'
import List from 'components/utility/list'
import Item from 'components/utility/item'

import _ from 'lodash'

export default React.createClass({
  getDefaultProps: function() {
    return {
      items: []
    }
  },

  check: function(id) {
    this.props.onCheck(id);
  },

  addTodo: function(evt) {
    this.props.onAdd(evt.target.value);
    evt.target.value = '';
  },

  renderItems: function(item) {
    return (
      <Item key={ item.id} >
        <Checkbox checked = { item.completed } onCheck={ this.check } id={item.id} />
        { item.text }
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
