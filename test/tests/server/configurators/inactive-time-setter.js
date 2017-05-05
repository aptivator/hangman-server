import _                  from 'lodash';
import {expect}           from 'chai';
import vars               from '../../../../src/lib/vars';
import serverConfigs      from '../../../../src/server/lib/server-configs';
import inactiveTimeSetter from '../../../../src/server/configurators/inactive-time-setter';

describe('inactive-time-setter', () => {
  it('sets idle time after which the game state is removed', () => {
    let {inactiveTime} = serverConfigs;
    serverConfigs.inactiveTime = 12345;
    inactiveTimeSetter();
    expect(vars.inactiveTime).to.equal(12345);
    _.extend(serverConfigs, {inactiveTime});
  });  
});
