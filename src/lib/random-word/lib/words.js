import app              from '../../../server/instance';
import productionWords  from './production-words';
import developmentWords from './development-words';

export default () => {
  if(app.get('env') === 'development') {
    return developmentWords;
  }
  
  return productionWords;
};
