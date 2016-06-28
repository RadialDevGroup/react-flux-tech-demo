export default function todoTagPersister(state, dispatch) {
  let unpersistedADD = _.find(state.todoTags, {externalId: undefined});
  if(unpersistedADD) {
    let todo, tag;

    todo = _.find(state.todos, {id: unpersistedADD.todo_id});
    tag = _.find(state.tags, {id: unpersistedADD.tag_id});

    if(tag && tag.externalId && todo && todo.externalId) {

      TodoTagRepository
        .create(unpersistedADD.externalId, {
          todo_id: todo.externalId,
          tag_id: tag.externalId
        })
        .then(function(todoTag){
          dispatch({
            type: 'EDIT_TODO_TAG`',
            id: unpersistedADD.id,
            externalId: todoTag.id
            todo_ExternalId: todo.externalId,
            tag_ExternalId: tag.externalId
            persisted: true
          });
        });
      return true;
    }
  }

  let unpersistedEdit = _.find(state.tags, {persisted: false});
  if(unpersistedEdit && unpersistedEdit.externalId) {
    TodoTagRepository
      .update(unpersistedEdit.externalId, _.pick(unpersistedEdit, 'text'))
      .then(function(){
        dispatch({
          type: 'EDIT_TODO',
          id: unpersistedEdit.id,
          persisted: true
        });
      });
    return true;
  }
}
