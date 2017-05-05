import _            from 'lodash';
import {expect}     from 'chai';
import uuid         from 'uuid/v4';
import vars         from '../../../src/lib/vars';
import storeUpdater from '../../../src/state/stores/store-updater';

let {stores} = vars;

describe('store-updater', function() {
  let id = uuid();

  it('places the store into the map', () => {
    let store = {store: 'store'};
    storeUpdater(id, store);
    expect(stores.get(id).store).to.eql(store);
  });
  
  it('registers to remove a store after a period of inactivity', () => {
    expect(stores.get(id).timeout).to.be.a.number;
  });
  
  it('replaces an existing store', () => {
    let store = {someotherstore: 'someother'};
    storeUpdater(id, store);
    expect(stores.get(id).store).to.eql(store);
  });
  
  it('sets the inactiveTime properly', done => {
    _.extend(vars, {inactiveTime: 10});
    storeUpdater(id);
    setTimeout(() => {
      expect(stores.get(id)).to.be.undefined;
      _.extend(vars, {inactiveTime: 600000});
      done();
    }, 25);
  });
});

