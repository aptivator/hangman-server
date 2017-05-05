import {expect}      from 'chai';
import configsPather from '../../../src/lib/configs-pather/configs-pather';

describe('configs-pather', () => {
  it('returns basePath and package.json path when in node_modules directory', () => {
    let path = '/home/dmitriy/workspace/hangman-client-react/node_modules/hangman-server/server.js';
    let [, original] = process.argv;
    process.argv[1] = path;
    let [basePath, configsFile] = configsPather();
    process.argv[1] = original;
    
    expect(basePath).to.equal('/home/dmitriy/workspace/hangman-client-react');
    expect(configsFile).to.equal('/home/dmitriy/workspace/hangman-client-react/package.json');
  });
  
  it('returns basePath and package.json path when in hangman-server directory', () => {
    let path = '/home/dmitriy/workspace/hangman-server/server.js';
    let [, original] = process.argv;
    process.argv[1] = path;
    let [basePath, configsFile] = configsPather();
    process.argv[1] = original;
    
    expect(basePath).to.equal('/home/dmitriy/workspace/hangman-server');
    expect(configsFile).to.equal('/home/dmitriy/workspace/hangman-server/package.json');
  });
  
  it('returns [] when basePath does not include node_modules and hangman-server', () => {
    let path = '/home/dmitriy/workspace/hangmans-server/server.js';
    let [, original] = process.argv;
    process.argv[1] = path;
    let [basePath, configsFile] = configsPather();
    process.argv[1] = original;
    expect(basePath).to.be.undefined;
    expect(configsFile).to.be.undefined;
  });
});
