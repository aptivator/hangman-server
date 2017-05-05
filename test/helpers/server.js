import _             from 'lodash';
import serverStarter from '../../src/server/server-starter';

export default function server() {
  let {express} = server;
  
  if(express) {
    return express;
  }
  
  express = serverStarter();
  _.extend(server, {express});
  
  return express;
}
