import {expect} from 'chai';
import {fromJS} from 'immutable';
import reducer  from '../../../src/state/reducer';

describe('reducer', () => {
  it('returns unmodified state for any actions other than new-game and guess', () => {
    let state = {state: 'some state'};
    let action = {type: 'action', data: {}};
    
    expect(reducer(state, action)).to.eql({state: 'some state'});
  });
  
  it('returns new game state for new-game action', () => {
    let res = {
      send(data) {
        expect(data).to.eql({
          correct: true,
          missed: 0,
          used: [],
          won: null,
          word: [null, null, null, null, null, null, null, null]
        });
      }
    };
    
    let action = {type: 'new', res};
    reducer(null, action);
  });
  
  it('updates an existing state for guess action', () => {
    let state = fromJS({
      secretWord: 'murmansk',
      correct: true,
      missed: 0,
      used: [],
      won: null,
      word: [null, null, null, null, null, null, null, null]      
    });
    
    let res = {
      send(data) {
        expect(data).to.eql({
          correct: true,
          missed: 0,
          used: ['a'],
          won: null,
          word: [null, null, null, null, 'a', null, null, null]
        });
      }
    };
    
    let action = {type: 'play', data: {letter: 'a'}, res};
    reducer(state, action);
  });
});
