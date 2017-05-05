import {expect} from 'chai';
import request  from 'supertest';
import server   from '../../helpers/server';

describe('/new route', function() {
  let [app] = server();
  let agent = request.agent(app);
  
  it('returns an initial empty game state', done => {
    agent.post('/new').end((err, res) => {
      if(err) {
        return done(err);
      }
      
      expect(res.body).to.eql({
        correct: true,
        missed: 0,
        used: [],
        won: null,
        word: [null, null, null, null, null, null, null, null]
      });
      
      done();
    });
  });
  
  it('resets an incomplete game for an existing session', done => {
    agent.post('/play').send({letter: 'a'}).end((err, res) => {
      if(err) {
        return done(err);
      }
      
      agent.post('/new').end((err, res) => {
        if(err) {
          return done(err);
        }
        
        expect(res.body).to.eql({
          correct: true,
          missed: 0,
          used: [],
          won: null,
          word: [null, null, null, null, null, null, null, null]
        });
        
        done();
      });
    });
  });
});
