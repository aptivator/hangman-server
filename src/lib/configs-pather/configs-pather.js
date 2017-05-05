import path               from 'path';
import baseDirectoryNames from './lib/base-directory-names';

let nulledDirectories = baseDirectoryNames.slice(0, 2);

export default () => {
  let [, basePath] = process.argv;
  basePath = basePath.split('/');
  
  for(let baseDirectoryName of baseDirectoryNames) {
    let end = basePath.indexOf(baseDirectoryName);
    if(end !== -1) {
      if(nulledDirectories.includes(baseDirectoryName)) {
        baseDirectoryName = '';
      }
      
      basePath = basePath.slice(0, end).join('/');
      basePath = path.join(basePath, baseDirectoryName);
      let configsFile = path.join(basePath, 'package.json');
      return [basePath, configsFile];
    }
  }
  
  return [];
};
