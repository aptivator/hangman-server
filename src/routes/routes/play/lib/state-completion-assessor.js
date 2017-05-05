export default store => {
  let state = store.getState();
  return state.get('won') !== null;
};
