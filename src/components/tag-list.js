import ContentEditable from "react-contenteditable";
import _ from 'lodash';

import store from 'store';

import Checkbox from 'components/utility/checkbox';
import List from 'components/utility/list';
import Item from 'components/utility/item';

import TagActions from 'actions/tag';

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
    store.dispatch(TagActions.create(evt.target.value));
  },

  editTag: function(id) {
    let edit = _.debounce(function(text) {
      store.dispatch(TagActions.update(id, {text}));
    }, 500);

    return evt => edit(evt.target.value);
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

  componentDidMount: function() {
    this.unsubscribe = store.subscribe(_.bind(this.forceUpdate, this));
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  render: function() {
    return (
      <List>
        <input type="text" onBlur = { this.addTag } onKeyDown = { this.catchEnter }  placeholder = "new tag" />
        {store.getState().tags.map(this.renderItems)}
      </List>
    );
  }
});
