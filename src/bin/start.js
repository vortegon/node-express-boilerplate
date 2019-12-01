#!/usr/bin/env node
import Debug from 'debug';
import dotenv from 'dotenv';
import http from 'http';
import app from '../app';
import { connect } from '../utils/db';

const debug = Debug('api:server');

/**
 * Load environment variables from env file.
 */
dotenv.config({ path: 'variables.env' });

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Connect to mongo database
 * Listen on provided port, on all network interfaces.
 */
run();
async function run() {
  await connect();
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
  } else if (error.code === 'EADDRINUSE') {
    console.error(`${bind} is already in use`);
    process.exit(1);
  } else {
    throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
