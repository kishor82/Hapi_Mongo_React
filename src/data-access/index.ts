import Mongoose from 'mongoose';
import config from '../config';
import { Server } from '@hapi/hapi';
import { healthCheck } from './health_check';

const { mongo } = config;

const options = Object.freeze({
  autoIndex: false, // Don't build indexes
  poolSize: 1, // Maintain up to 1 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getMongoURL = () => {
  const credentials = mongo.username ? `${mongo.username}:${mongo.password}@` : '';
  return `mongodb://${credentials}${mongo.hosts}/${mongo.database}${
    mongo.authSource ? `?authSource=${mongo.authSource}${mongo.replicaSet ? `&replicaSet=${mongo.replicaSet}` : ''}` : ''
  }`;
};

const createMongoConnectoin = async (server: Server, config: any) => {
  if (Mongoose.connection.readyState) {
    return Mongoose;
  }
  healthCheck(server, config, Mongoose).start();
  try {
    await Mongoose.connect(getMongoURL(), options);
    server.log(['info', 'mongo'], `MongoDB successfully connected.`);
    return Mongoose;
  } catch (err) {
    throw err;
  }
};

export { createMongoConnectoin };
