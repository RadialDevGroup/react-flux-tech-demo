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

   it('updates a todo', function() {
    const stateBefore = {id: 0, text: 'Learn Redux', completed: false};
    const action = {type: 'EDIT_TODO', id: 0, externalId: 13};
    const stateAfter = {id: 0, text: 'Learn Redux', completed: false, externalId: 13};

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todo(stateBefore, action)).to.deep.equal(stateAfter);
  });

  context('when todo is not completed', function() {
    const stateBefore = { id: 1, text: 'Go shopping', completed: false };
    const stateAfter = { id: 1, text: 'Go shopping', completed: true };

    deepFreeze(stateBefore);

    it('toggles a todo\'s completed field', function() {
      const action = { id: 1, type: 'TOGGLE_TODO' };
      deepFreeze(action);

      expect(todo(stateBefore, action)).to.deep.equal(stateAfter);
    });
  });

  context('when todo is completed', function() {
    const stateBefore = { id: 1, text: 'Go shopping', completed: true };
    const stateAfter = { id: 1, text: 'Go shopping', completed: false };

    deepFreeze(stateBefore);

    it('toggles a todo\'s completed field', function() {
      const action = { id: 1, type: 'TOGGLE_TODO' };
      deepFreeze(action);

      expect(todo(stateBefore, action)).to.deep.equal(stateAfter);
    });
  });
});
