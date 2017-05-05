import storeGenerator from '../../../state/stores/store-generator';

export default (type, data, id, res) => {
  storeGenerator(id).dispatch({type, data, res});
};
