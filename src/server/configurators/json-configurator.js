import bodyParser from 'body-parser';
import app        from '../instance';

export default () => {
  app.use(bodyParser.json());
};
