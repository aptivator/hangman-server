import _       from 'lodash';
import actions from './actions/actions';

const actionTypes = _.keys(actions);

export default (state, action) => {
  let {type, data, res} = action;
  type = _.camelCase(type);
  
  if(actionTypes.includes(type)) {
    [state, data] = actions[type](state, data);
    res.send(data);
  }
  
  return state;
};
