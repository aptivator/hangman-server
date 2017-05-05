import uuid from 'uuid/v4';

export default {
  secret: uuid(),
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
  genid: () => uuid()
};
