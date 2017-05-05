import corsConfigurator    from './configurators/cors-configurator';
import inactiveTimeSetter  from './configurators/inactive-time-setter';
import jsonConfigurator    from './configurators/json-configurator';
import routeConfigurator   from './configurators/route-configurator';
import sessionConfigurator from './configurators/session-configurator';
import staticConfigurator  from './configurators/static-configurator';

export default () => {
  jsonConfigurator();
  corsConfigurator();
  inactiveTimeSetter();
  sessionConfigurator();
  staticConfigurator();
  routeConfigurator();
};
