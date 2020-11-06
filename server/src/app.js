/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/named */
import http from 'http';
import os from 'os';
import mongoose from './services/mongoose';
import express from './services/express';
import api from './api';
import { env, mongo, port, ip, apiRoot } from './config';

const app = express(apiRoot, api);
const server = http.createServer(app);
const hostname = os.hostname();

mongoose.connect(mongo.uri);
mongoose.Promise = Promise;

setImmediate(() => {
  server.listen(port, () => {
    const serverInfo = JSON.stringify(server.address());
    console.log('Server listening on "%s:%d", in %s mode', ip, port, env, '\n| hostname: ', hostname, '\n| server: ', serverInfo);
  });
});

export default app;
