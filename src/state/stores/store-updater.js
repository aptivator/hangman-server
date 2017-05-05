import vars from '../../lib/vars';

export default (id, store) => {
  let {stores, inactiveTime} = vars;
  let storeObj = stores.get(id);
  let {store: store_, timeout} = storeObj || {};
  
  if(!store) {
    store = store_;
  }
  
  clearTimeout(timeout);
  timeout = setTimeout(() => stores.delete(id), inactiveTime);
  stores.set(id, {store, timeout});
  
  return store;
};
