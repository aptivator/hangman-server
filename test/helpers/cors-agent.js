import _       from 'lodash';
import request from 'superagent';
import uuid    from 'uuid/v4';
import actions from '../../src/state/actions/actions';

let url = 'https://guarded-cliffs-93737.herokuapp.com/';
let agent = request.agent();
let id = uuid();

let api = _.keys(actions).reduce((o, path) => {
  o[path] = (data = {}) => {
    data = _.extend(data, {id});
    return new Promise((resolve, reject) => {
      agent.post(`${url}${path}`).send(data).end((err, res) => {
        if(err) {
          return reject(err);
        }
        
        resolve(res.body);
      });
    });
  };
  
  return o;
}, {});

export {id, api};
