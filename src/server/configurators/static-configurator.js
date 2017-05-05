import express       from 'express';
import serverConfigs from '../lib/server-configs';
import app           from '../instance';

export default () => {
  let {path} = serverConfigs;
  
  if(path) {
    app.use(express.static(path));
  }
};
