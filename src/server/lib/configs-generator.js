import _              from 'lodash';
import path_          from 'path';
import configsPather  from '../../lib/configs-pather/configs-pather';
import app            from '../instance';

export default () => {
  let [configsDirectory, configsFile] = configsPather();
    
  if(!configsFile) {
    throw new Error('run from node_modules or hangman-server directory');
  }
  
  let configs = require(configsFile);
  let env = app.get('env');
  let serverConfigs = _.get(configs, ['hangman-server', env], {});
  let {path, port = process.env.PORT} = serverConfigs;
  
  if(path) {
    path = path_.resolve(configsDirectory, path);
  }

  return _.extend(serverConfigs, {path, port});
};
