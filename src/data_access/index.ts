import Mongoose from 'mongoose';
import config from '../config';
import { Server } from '@hapi/hapi';
import healthCheck from './health_check';
import makeUserCollection from './user_collection';
import makeProductCollection from './product_collection';
import userModel from '../models/user.model';
import productModel from '../models/product.model';
import orderModel from '../models/order.model';
import makeOrderCollection from './order_collection';

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
    mongo.authSource
      ? `?authSource=${mongo.authSource}${mongo.replicaSet ? `&replicaSet=${mongo.replicaSet}` : ''}`
      : ''
  }`;
};

const createMongoConnectoin = async (server?: Server, config?: any) => {
  if (Mongoose.connection.readyState) {
    return Mongoose;
  }
  if (server) healthCheck(server, config, Mongoose).start();
  try {
    const db = await Mongoose.connect(getMongoURL(), options);
    server?.log(['info', 'mongo'], `MongoDB initialized successfully with ${db.connection.host}.`);
    return Mongoose;
  } catch (err) {
    throw err;
  }
};

const userCollection = makeUserCollection({
  createMongoConnectoin,
  userModel,
});

const productCollection = makeProductCollection({
  createMongoConnectoin,
  productModel,
});

const orderCollection = makeOrderCollection({
  createMongoConnectoin,
  orderModel,
});
export { createMongoConnectoin, userCollection, productCollection, orderCollection };
