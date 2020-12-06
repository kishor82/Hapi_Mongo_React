import { Server } from '@hapi/hapi';
import {
  greetWelcomeAction,
  listProductsAction,
  getProductAction,
  loginAction,
  getUserProfileAction,
  registerUserAction,
  updateUserProfileAction,
} from './controllers';
import {
  API_ROUTE_GREETING,
  API_ROUTE_GET_PRODUCTS,
  API_ROUTE_LOGIN,
  API_ROUTE_USER_PROFILE,
  API_ROUTE_REGISTER,
} from './common/constants';
import Joi from 'joi';
export const routes = (server: Server) => {
  server.route([
    {
      method: 'GET',
      path: `${API_ROUTE_GREETING}`,
      handler: greetWelcomeAction,
      options: {
        auth: false,
        description: 'Greet with welcome message',
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: `${API_ROUTE_GET_PRODUCTS}`,
      handler: listProductsAction,
      options: {
        auth: false,
        description: 'Get all products.',
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: `${API_ROUTE_GET_PRODUCTS}/{id}`,
      handler: getProductAction,
      options: {
        auth: false,
        description: 'Get single product by id.',
        tags: ['api'],
        validate: {
          params: Joi.object({
            id: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'POST',
      path: `${API_ROUTE_REGISTER}`,
      handler: registerUserAction,
      options: {
        auth: false,
        description: 'Register a new user.',
        tags: ['api'],
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'POST',
      path: `${API_ROUTE_LOGIN}`,
      handler: loginAction,
      options: {
        auth: false,
        description: 'Login user.',
        tags: ['api'],
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'GET',
      path: `${API_ROUTE_USER_PROFILE}`,
      handler: getUserProfileAction,
      options: {
        description: 'Get logged in user profile.',
        tags: ['api'],
      },
    },
    {
      method: 'PUT',
      path: `${API_ROUTE_USER_PROFILE}`,
      handler: updateUserProfileAction,
      options: {
        description: 'Update use profile.',
        tags: ['api'],
        validate: {
          payload: Joi.object({
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string(),
          }),
        },
      },
    },
  ]);
};
