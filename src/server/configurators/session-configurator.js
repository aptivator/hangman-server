import _              from 'lodash';
import session        from 'express-session';
import sessionConfigs from '../../lib/session-configs';
import serverConfigs  from '../lib/server-configs';
import app            from '../instance';

export default () => {
  let {secure, cors} = serverConfigs;
  if(!cors) {
    _.extend(sessionConfigs.cookie, {secure});
    app.use(session(sessionConfigs));
  }
};
