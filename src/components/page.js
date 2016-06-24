import store from 'store';
import _ from 'lodash';

export default function(props) {
  if(store.getState().currentPage === props.name) {
    return (
      <div className='page' id={props.name} >
        { props.children }
      </div>
    );
  } else return null;
}
