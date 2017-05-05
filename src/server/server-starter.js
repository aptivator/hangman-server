import serverConfigs      from './lib/server-configs';
import app                from './instance';
import serverConfigurator from './server-configurator';

export default () => {
  let {port, host} = serverConfigs;
  serverConfigurator();
  let server = app.listen(port, host);
  return [app, server];
};
