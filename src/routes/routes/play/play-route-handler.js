import vars                    from '../../../lib/vars';
import storeUpdater            from '../../../state/stores/store-updater';
import newRouteHandler         from '../new/new-route-handler';
import stateCompletionAssessor from './lib/state-completion-assessor';

export default (type, data, id, res) => {
  let storeObj = vars.stores.get(id);
  let {store} = storeObj || {};

  if(!store || stateCompletionAssessor(store)) {
    return newRouteHandler('new', data, id, res);
  }
  
  storeUpdater(id);
  store.dispatch({type, data, res});
};
