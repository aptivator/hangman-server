import {expect} from 'chai';
import request  from 'supertest';
import server   from '../../helpers/server';

describe('/play', () => {
  let [app] = server();
  let agent = request.agent(app);

  it('returns a fresh game state if called before /new', done => {
    agent.post('/play').send({letter: 'a'}).end((err, res) => {
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
  
  it('processes a correctly guessed letter', done => {
    agent.post('/play').send({letter: 'a'}).end((err, res) => {
      if(err) {
        return done(err);
      }
      
      expect(res.body).to.eql({
        correct: true,
        missed: 0,
        used: ['a'],
        won: null,
        word: [null, null, null, null, 'a', null, null, null]
      });

      done();
    });
  });
  
  it('handles an incorrectly guessed letter', done => {
    agent.post('/play').send({letter: 't'}).end((err, res) => {
      if(err) {
        return done(err);
      }
      
      expect(res.body).to.eql({
        correct: false,
        missed: 1,
        used: ['a', 't'],
        won: null,
        word: [null, null, null, null, 'a', null, null, null]
      });
      
      done();
    });
  });
  
  it('determines when a game is won', done => {
    let letters = ['e', 't', 'm', 'u', 'r', 'a', 'n', 's', 'k'];
    
    agent.post('/new').end((err, res) => {
      if(err) {
        return done(err);
      }
      
      !function letterer(idx = 0) {
        agent.post('/play').send({letter: letters[idx]}).end((err, res) => {
          if(err) {
            return done(err);
          }
          
          if(idx < letters.length - 1) {
            return letterer(++idx);
          }
          
          expect(res.body).to.eql({
            correct: true,
            missed: 2,
            used: ['e', 't', 'm', 'u', 'r', 'a', 'n', 's', 'k'],
            won: true,
            word: ['m', 'u', 'r', 'm', 'a', 'n', 's', 'k']
          });
          
          done();
        });
      }();
    });
  });
  
  it('assesses when a game is lost', done => {
    let letters = ['e', 't', 'm', 'u', 'r', 'a', 'n', 'p', 'x', 'z', 'o'];
    
    agent.post('/new').end((err, res) => {
      if(err) {
        return done(err);
      }
      
      !function letterer(idx = 0) {
        agent.post('/play').send({letter: letters[idx]}).end((err, res) => {
          if(err) {
            return done(err);
          }
          
          if(idx < letters.length - 1) {
            return letterer(++idx);
          }
          
          expect(res.body).to.eql({
            correct: false,
            missed: 6,
            used: ['e', 't', 'm', 'u', 'r', 'a', 'n', 'p', 'x', 'z', 'o'],
            won: false,
            word: ['m', 'u', 'r', 'm', 'a', 'n', null, null]
          });
          
          done();
        });
      }();
    });    
  });
  
  it('starts a new game if pinged after a game is completed', done => {
    agent.post('/play').send({letter: 't'}).end((err, res) => {
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
