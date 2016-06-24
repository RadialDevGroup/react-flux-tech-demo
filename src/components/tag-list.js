import ContentEditable from "react-contenteditable";
import _ from 'lodash'

import Checkbox from 'components/utility/checkbox'
import List from 'components/utility/list'
import Item from 'components/utility/item'


export default React.createClass({
  getDefaultProps: function() {
    return {
      tags: []
    }
  },

  check: function(id) {
    this.props.onCheck(id);
  },

  addTag: function(evt) {
    this.props.onAdd(evt.target.value);
    evt.target.value = '';
  },

  editTag: function(id) {
    return evt => this.props.onEdit( id, evt.target.value)
  },

  renderItems: function(item) {
    return (
      <Item key={ item.id} >
        <ContentEditable
          html={item.text} // innerHTML of the editable div
          disabled={false}       // use true to disable edition
          onChange={ this.editTag(item.id) } // handle innerHTML change
        />
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
      <List>
        <input type="text" onBlur = { this.addTag } onKeyDown = { this.catchEnter }  placeholder = "new tag" />
        {this.props.tags.map(this.renderItems)}
      </List>
    );
  }
});
