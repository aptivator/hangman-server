import _                from 'lodash';
import {expect}         from 'chai';
import server           from '../../../helpers/server';
import configsGenerator from '../../../../src/server/lib/configs-generator';

describe('configs-generator', () => {
  let [app] = server();
  
  it('fetches development configuration from package.json', () => {
    let configs = configsGenerator();
    let {path} = configs;
    let rest = _.omit(configs, 'path');
    
    expect(rest).to.eql({
      cors: false,
      host: 'localhost',
      port: 12345,
      inactiveTime: 600000,
      secure: false
    });
    
    expect(path).to.match(/hangman\-server\/test\/helpers/);
  });
  
  it('retrieves production configuration from package.json', () => {
    app.set('env', 'production');
    let configs = configsGenerator();
    expect(configs).to.eql({
      cors: true, 
      inactiveTime: 600000,
      path: undefined, 
      port: undefined});
    app.set('env', 'development');
  });
  
  it('errors if directory is not hangman-server, node_modules, and dist', () => {
    let path = '/home/dmitriy/workspace/hangman-server1/something/other';
    let [, original] = process.argv;
    process.argv[1] = path;
    expect(() => configsGenerator()).to.throw(/run from node_modules or/);
    process.argv[1] = original;
  });
});
