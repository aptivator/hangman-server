import {createStore} from 'redux';
import reducer       from '../reducer';
import storeUpdater  from './store-updater';

export default id => {
  let store = createStore(reducer);
  return storeUpdater(id, store);
};
