import TodoTagRepository from 'repositories/todo-tag';
import TodoRepository from 'repositories/todo';
import TagRepository from 'repositories/tag';

import { translateEachForSync } from 'persisters/helpers/base';

import _ from 'lodash';

function fetch(o) {
  return o.fetch();
}

export default function(state, dispatch) {
  let repositories = [TagRepository, TodoRepository, TodoTagRepository];
  let promises = _.map(repositories, fetch);

  Promise.all(promises)
    .then(function([tags, todos, todoTags]) {
      dispatch(Object.assign(
        {type: 'SYNC'}, _.mapValues({tags, todos, todoTags}, translateEachForSync)
      ));
    }, function(error) {
      dispatch({
        type: 'PERSISTENCE_ERROR',
        error: error
      });
    });

  return true;
}
