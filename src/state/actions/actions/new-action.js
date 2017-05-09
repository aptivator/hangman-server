import _          from 'lodash';
import randomWord from '../../../lib/random-word/random-word';

export default (state, data = {}) => {
  let secretWord = randomWord();
  let {length} = secretWord;
  let word = new Array(length).fill(null);
  data = _.pick(data, 'id');
  
  _.extend(data, {correct: true, missed: 0, used: [], won: null, word});
  state = _.extend({secretWord}, data);
  
  return [state, data];
};
