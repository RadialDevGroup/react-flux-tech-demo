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
    this.props.items.check(id);
  },

  renderItems: function(item) {
    return (
      <Item key={ item.id} >
        <Checkbox checked = { item.done } onCheck={ this.check } id={item.id} />
        { item.name }
      </Item>
    );
  },

  render: function() {
    return (
      <List>
        {this.props.items.map(this.renderItems)}
      </List>
    );
  }
});
