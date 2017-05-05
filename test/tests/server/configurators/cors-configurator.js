import _         from 'lodash';
import {expect}  from 'chai';
import {id, api} from '../../../helpers/cors-agent';

describe('cors-configurator', function() {
  this.timeout(30000);

  it('accepts new game request from a different origin', done => {
    api.new().then(data => {
      data = _.omit(data, 'word');
      expect(data).to.eql({
        correct: true,
        missed: 0,
        won: null,
        used: [],
        id
      });
      
      done();
    }, done);
  });
  
  it('plays an existing game from a different origin', done => {
    api.play({letter: 'a'}).then(data => {
      data = _.pick(data, ['id', 'used']);
      expect(data).to.eql({
        id,
        used: ['a']
      });
      
      done();
    }, done);
  });
});
