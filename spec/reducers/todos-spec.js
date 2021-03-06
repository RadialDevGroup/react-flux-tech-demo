import todos from 'reducers/todos';

describe('todos reducer', function() {
  it('is a function', function() {
    expect(todos).to.be.a('function');
  });

  it('adds a todo', function() {
    const stateBefore = [];
    const action = {type: 'ADD_TODO', id: 0, text: 'Learn Redux' };
    const stateAfter = [{id: 0, text: 'Learn Redux', completed: false}];

    deepFreeze(stateBefore)
    deepFreeze(action);

    expect(todos(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('toggles a todo', function() {
    const stateBefore = [
      {id: 0, text: 'Learn Redux', completed: false },
      {id: 1, text: 'Go shopping', completed: false }
    ];
    const action = {type: 'TOGGLE_TODO', id: 1};
    const stateAfter = [
      {id: 0, text: 'Learn Redux', completed: false},
      {id: 1, text: 'Go shopping', completed: true}
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).to.deep.equal(stateAfter);
  })

  it('edits a todo', function() {
    const stateBefore = [
      {id: 0, text: 'Learn Redux', completed: false }
    ];
    const action = {type: 'EDIT_TODO', id: 0, externalId: 11};
    const stateAfter = [
      {id: 0, text: 'Learn Redux', completed: false, externalId: 11},
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).to.deep.equal(stateAfter);
  })
});
