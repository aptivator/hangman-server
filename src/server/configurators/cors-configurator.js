import cors          from 'cors';
import corsConfigs   from '../../lib/cors-configs';
import serverConfigs from '../lib/server-configs';
import app           from '../instance';

export default () => {
  if(serverConfigs.cors) {
    app.use(cors(corsConfigs));
  }
};
