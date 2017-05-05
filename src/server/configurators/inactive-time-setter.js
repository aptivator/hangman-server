import _             from 'lodash';
import vars          from '../../lib/vars';
import serverConfigs from '../lib/server-configs';

export default () => {
  let {inactiveTime} = serverConfigs;
  if(inactiveTime) {
    _.extend(vars, {inactiveTime});
  }
};
