import _          from 'lodash';
import {expect}   from 'chai';
import server     from '../../helpers/server';
import randomWord from '../../../src/lib/random-word/random-word';

describe('random word generator', () => {
  let [app] = server();
  
  it('produces the same word in a development environment', () => {
    let words = [randomWord(), randomWord(), randomWord()];
    expect(words).to.eql(['murmansk', 'murmansk', 'murmansk']);
  });
  
  it('generates different words in a production environment', () => {
    app.set('env', 'production');
    let words = [randomWord(), randomWord(), randomWord()];
    words = _.uniq(words);
    expect(words.length).to.be.above(1);
    app.set('env', 'development');
  });
});
