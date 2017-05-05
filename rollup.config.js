import buble from 'rollup-plugin-buble';
let packageJson = require('./package.json');
let {'jsnext:main': jsnext, main} = packageJson;

export default {
  moduleName: 'hangman-server',
  entry: 'src/server.js',
  targets: [{
    format: 'cjs',
    dest: main
  }, {
    format: 'es',
    dest: jsnext
  }],
  globals: {
    'body-parser': 'bodyParser',
    cors: 'cors',
    express: 'express',
    'express-session': 'session',
    'immutable': 'immutable',
    lodash: '_',
    path: 'path',
    redux: 'redux',
    'uuid/v4': 'uuid'
  },
  external: [
    'body-parser',
    'cors',
    'express', 
    'express-session', 
    'immutable',
    'lodash', 
    'path', 
    'redux',
    'uuid/v4'
  ],
  plugins: [
    buble({
      transforms: {
        dangerousForOf: true
      }
    })
  ]
};
