import { Server } from '@hapi/hapi';
import { greetWelcomeAction, listProductsAction, getProductAction } from './controllers';
import { API_ROUTE_GREETING, API_ROUTE_GET_PRODUCTS, API_ROUTE_GET_PRODUCT } from './common/constants';
import Joi from 'joi';
export const routes = (server: Server) => {
  server.route([
    {
      method: 'GET',
      path: `${API_ROUTE_GREETING}`,
      options: {
        auth: false,
        description: 'Greet with welcome message',
        tags: ['api'],
        handler: greetWelcomeAction,
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
      path: `${API_ROUTE_GET_PRODUCT}`,
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
  ]);
};
