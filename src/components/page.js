import store from 'store';
import _ from 'lodash';

import Actions from 'actions/page';

let defaultPage = null;
let pages = [];

var Page = function(props) {
  if (! props.name && ! props.default) {
    throw new Error('Please specify name prop or default');
  }
  pages = _.uniq([...pages, props.name]);

  if(store.getState().currentPage === props.name) {
    return (
      <div className='page' id={props.name} >
        { props.children }
      </div>
    );
  } else return null;
}

let navigate = function(pageName) {
  let selectedPage = _.includes(pages, pageName) ? pageName : defaultPage;
  let hash = selectedPage ? '#' + selectedPage : ' ';

  if(selectedPage !== store.getState().currentPage) {
    window.history.pushState(selectedPage, null, hash);
    store.dispatch(Actions.setPage(selectedPage));
  }
}

var link = _.partial(_.partial, navigate);

let navigateDefault = function(pageName) {
  if(defaultPage === null) {
    defaultPage = pageName
    navigate(window.location.hash.toString().replace(/^#/, ''));
    console.log(pages, window.location.hash.toString().replace(/^#/, ''));
  }
}

let active = function(pageName) {
  return pageName === store.getState().currentPage;
}

window.onpopstate = function(event) {
  navigate(event.state);
};

export default Object.assign(Page, {
  link, navigate, navigateDefault, active
});
