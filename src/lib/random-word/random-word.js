import _      from 'lodash';
import words_ from './lib/words';

export default () => {
  let words = words_();
  let randomIndex = _.random(0, words.length - 1);
  return words[randomIndex];
};
