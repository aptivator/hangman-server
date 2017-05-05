import {expect} from 'chai';
import request  from 'supertest';
import server   from '../../../helpers/server';

describe('static-configurator', () => {
  let [app] = server();
  
  it('serves static files', done => {
    request(app).get('/index.html').end((err, res) => {
      if(err) {
        return done(err);
      }
      
      expect(res.text).to.contain('Test static page');
      done();
    });
  }); 
});
