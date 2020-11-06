import path from 'path';
import merge from 'lodash/merge';
import dotenv from 'dotenv-safe';

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} + environment variable`);
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'prod') {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example'),
  });
}

const config = {
  all: {
    root: path.join(__dirname, '..'),
    env: requireProcessEnv('NODE_ENV'),
    port: process.env.PORT || 8080,
    ip: requireProcessEnv('HEROKU_URL'),
    apiRoot: requireProcessEnv('API_ROOT'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        db: {
          safe: true,
        },
        keepAlive: 1,
        reconnectTries: 30,
        useFindAndModify: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  },
  test: {},
  dev: {
    mongo: {
      uri: 'mongodb://localhost/react-redux-study-app-dev',
      options: {
        debug: true,
      },
    },
  },
  prod: {
    ip: process.env.HEROKU_URL || null,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/react-redux-study-app-dev',
    },
  },
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
