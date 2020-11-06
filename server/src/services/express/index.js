/* eslint-disable import/named */
import express from 'express';
// import forceSSL from 'express-force-ssl';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler as queryErrorHandler } from 'querymen';
import { errorHandler as bodyErrorHandler } from 'bodymen';
import { env } from '../../config';

const corsOpts = {
  origin: '*', // !!!!
  optionsSuccessStatus: 200,
};

export default (apiRoot, routes) => {
  const app = express();

  // app.use(express.static(path.resolve(__dirname, '../../../../', 'client/build')));
  // app.use('/', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, '../../../../', 'client/build/index.html'));
  // });

  /* istanbul ignore next */
  // if (env === 'prod') {
  //   app.set('forceSSLOptions', {
  //     enable301Redirects: false,
  //     trustXFPHeader: true
  //   });
  //   app.use(forceSSL);
  // }

  /* istanbul ignore next */
  if (env === 'prod' || env === 'dev') {
    app.use(cors(corsOpts));
    app.use(compression());
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);

  // app.use(express.static(path.resolve(__dirname, '../../../../', 'client/build')));
  app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../../', 'client/build/index.html'));
  });

  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  return app;
};
