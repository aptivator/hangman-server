import _             from 'lodash';
import {expect}      from 'chai';
import serverConfigs from '../../../../src/server/lib/server-configs';

describe('configs-generator', () => {
  it('equals to development configuration', () => {
    let {path} = serverConfigs;
    let rest = _.omit(serverConfigs, 'path');
    
    expect(rest).to.eql({
      port: 12345,
      host: 'localhost',
      inactiveTime: 600000,
      cors: false,
      secure: false
    });
    
    expect(path).to.match(/test\/helpers/);
  });
});
