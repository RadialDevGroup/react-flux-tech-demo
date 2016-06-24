function init() {
  let counter = 0;

  return () => counter++;
}

let tagCounter = init(), todoTagCounter = init(), todoCounter = init();

export { todoCounter, todoTagCounter, tagCounter };
