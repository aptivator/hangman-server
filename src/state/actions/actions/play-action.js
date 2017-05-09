import _ from 'lodash';

export default (state, data) => {
  let {letter} = data;
  let {correct, missed, secretWord, used, won, word} = state;
  
  correct = false;
  used.push(letter);
  delete data.letter;
  
  for(let idx = 0, len = secretWord.length; idx < len; idx++) {
    if(letter === secretWord[idx]) {
      word[idx] = letter;
      correct = true;
    }
  }
  
  if(correct) {
    if(_.compact(word).length === word.length) {
      won = true;
    }
  } else {
    if(++missed === 6) {
      won = false;
      word = secretWord.split('');
    }
  }
  
  _.extend(state, {correct, missed, won, word});
  data = _.extend(data, _.omit(state, 'secretWord'));
  
  return [state, data];
};
