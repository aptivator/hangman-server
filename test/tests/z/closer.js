import server from '../../helpers/server';

describe('closer', () => {
  it('shuts down the server', done => {
    let [, http] = server();
    http.close(() => done());
  });  
});
