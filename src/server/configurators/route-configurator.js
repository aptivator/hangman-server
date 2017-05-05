import _            from 'lodash';
import routeConfigs from '../../routes/routes';
import app          from '../instance';

export default () => {
  _.each(routeConfigs, routeConfigs => {
    let {type, name, handler} = routeConfigs;
    
    app[type](name, (req, res) => {
      let {body = {}} = req;
      let {id} = body;
      
      if(!id) {
        ({id} = req.session);
      }
      
      handler(name.slice(1), body, id, res);
    });
  });
};
