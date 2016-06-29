import TodoTagRepository from 'repositories/todo-tag';

export default function todoTagPersister(state, dispatch) {
  let unpersistedADD = _.find(state.todoTags, function(todoTag) {
    return ! todoTag.externalId;
  });

  if(unpersistedADD) {
    let todo, tag;

    todo = _.find(state.todos, {id: unpersistedADD.todo_id});
    tag = _.find(state.tags, {id: unpersistedADD.tag_id});

    if(tag && tag.externalId && todo && todo.externalId) {

      TodoTagRepository
        .create({
          todo_id: todo.externalId,
          tag_id: tag.externalId
        })
        .then(function(todoTag){
          dispatch({
            type: 'EDIT_TODO_TAG',
            id: unpersistedADD.id,
            externalId: todoTag.id,
            todo_ExternalId: todo.externalId,
            tag_ExternalId: tag.externalId,
            persisted: true
          });
        }, function(error) {
        dispatch({
          type: 'PERSISTENCE_ERROR',
          error: error
        })
      });
      return true;
    }
  }
}
