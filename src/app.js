import TodoList from 'components/todo-list'
import _ from 'lodash';

let items = {
  check: function(id) {
    let item = _.find(this.values, {id: id});
    item.done = ! item.done;

    render();
  },

  map: function() {
    return this.values.map.apply(this.values, arguments);
  },

  values: [
    {
      name: 'Do JS Toolset work',
      done: false,
      id: 1
    }
  ]
}

function render() {
  ReactDom.render(<layout><TodoList items={items} /></layout>, document.getElementById('app'));
}

render();
