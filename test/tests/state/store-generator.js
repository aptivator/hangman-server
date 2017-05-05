import {expect}       from 'chai';
import uuid           from 'uuid/v4';
import vars           from '../../../src/lib/vars';
import storeGenerator from '../../../src/state/stores/store-generator';

describe('store-generator', () => {
  it('generates a redux store and places it in a map', () => {
    let id = uuid();
    let {stores} = vars;
    storeGenerator(id);
    let store = stores.get(id);
    expect(store).to.be.ok;
    clearTimeout(store.timeout);
    stores.delete(id);
  });  
});
