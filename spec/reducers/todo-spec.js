import todo from 'reducers/todo';

describe('todo reducer', function() {
  it('is a function', function() {
    expect(todo).to.be.a('function');
  });

  it('returns a new todo', function() {
    const stateBefore = undefined;
    const action = {type: 'ADD_TODO', id: 0, text: 'Learn Redux'};
    const stateAfter = {id: 0, text: 'Learn Redux', completed: false};

    deepFreeze(action);

    expect(todo(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it('toggles a todo\'s completed field', function() {
    const stateBefore = { id: 1, text: 'Go shopping', completed: false };
    const action = { id: 1, type: 'TOGGLE_TODO' };
    const stateAfter = { id: 1, text: 'Go shopping', completed: true };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todo(stateAfter, action)).to.deep.equal(stateAfter);
  });
});
