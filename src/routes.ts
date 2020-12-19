import { Server } from '@hapi/hapi';
import {
  greetWelcomeAction,
  listProductsAction,
  getProductAction,
  loginAction,
  getUserProfileAction,
  registerUserAction,
  updateUserProfileAction,
  addOrderItemsAction,
  getOrderByIdAction,
  updateOrderToPaidAction,
  getUserOrdersAction,
  getAllUserAction,
  deleteUserAction,
  getUserByIdAction,
  updateUserByIdAction,
} from './controllers';
import {
  API_ROUTE_GREETING,
  API_ROUTE_GET_PRODUCTS,
  API_ROUTE_LOGIN,
  API_ROUTE_USERS,
  API_ROUTE_REGISTER,
  API_ROUTE_ORDER,
  API_ROUTE_GET_PAYAL_CLIENT_ID,
} from './common/constants';
import Joi from 'joi';

export const routes = (server: Server, config: any) => {
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
      path: `${API_ROUTE_GET_PAYAL_CLIENT_ID}`,
      handler: () => {
        const { paypal_client_id } = config;
        return paypal_client_id;
      },
      options: {
        auth: false,
        description: 'Get paypal client id.',
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
      path: `${API_ROUTE_USERS}/profile`,
      handler: getUserProfileAction,
      options: {
        description: 'Get logged in user profile.',
        tags: ['api'],
      },
    },
    {
      method: 'PUT',
      path: `${API_ROUTE_USERS}/profile`,
      handler: updateUserProfileAction,
      options: {
        description: 'Update user profile.',
        tags: ['api'],
        validate: {
          payload: Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string(),
          }),
        },
      },
    },
    {
      method: 'POST',
      path: `${API_ROUTE_ORDER}`,
      handler: addOrderItemsAction,
      options: {
        description: 'Add order items.',
        tags: ['api'],
        validate: {
          payload: Joi.object({
            orderItems: Joi.array()
              .items(
                Joi.object({
                  name: Joi.string().required(),
                  qty: Joi.number().required(),
                  image: Joi.string().required(),
                  price: Joi.number().required(),
                  product: Joi.string()
                    .pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
                    .message('Invalid ObjectId')
                    .required(),
                }).unknown(true)
              )
              .required(),
            shippingAddress: Joi.object({
              address: Joi.string().required(),
              city: Joi.string().required(),
              postalCode: Joi.string().required(),
              country: Joi.string().required(),
            }).required(),
            paymentMethod: Joi.string().required(),
            itemsPrice: Joi.number().required(),
            taxPrice: Joi.number().required(),
            shippingPrice: Joi.number().required(),
            totalPrice: Joi.number().required(),
          }),
        },
      },
    },
    {
      method: 'GET',
      path: `${API_ROUTE_ORDER}/{id}`,
      handler: getOrderByIdAction,
      options: {
        description: 'Get single order by id.',
        tags: ['api'],
        validate: {
          params: Joi.object({
            id: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'PUT',
      path: `${API_ROUTE_ORDER}/{id}/pay`,
      handler: updateOrderToPaidAction,
      options: {
        description: 'Update unpaid order to paid.',
        tags: ['api'],
        validate: {
          params: Joi.object({
            id: Joi.string().required(),
          }),
          payload: Joi.object({
            id: Joi.string().required(),
            status: Joi.string().required(),
            update_time: Joi.date().required(),
            payer: Joi.object().required(),
          }).unknown(true),
        },
      },
    },
    {
      method: 'GET',
      path: `${API_ROUTE_ORDER}/myorders`,
      handler: getUserOrdersAction,
      options: {
        description: 'Get logged in user orders.',
        tags: ['api'],
      },
    },
    {
      method: 'GET',
      path: `${API_ROUTE_USERS}`,
      handler: getAllUserAction,
      options: {
        auth: {
          strategy: 'jwt',
          scope: 'admin',
        },
        description: 'Get all users.',
        tags: ['api'],
      },
    },
    {
      method: 'DELETE',
      path: `${API_ROUTE_USERS}/{id}`,
      handler: deleteUserAction,
      options: {
        auth: {
          strategy: 'jwt',
          scope: 'admin',
        },
        description: 'Delete user by id.',
        tags: ['api'],
        validate: {
          params: Joi.object({
            id: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'GET',
      path: `${API_ROUTE_USERS}/{id}`,
      handler: getUserByIdAction,
      options: {
        auth: {
          strategy: 'jwt',
          scope: 'admin',
        },
        description: 'Get user by id.',
        tags: ['api'],
        validate: {
          params: Joi.object({
            id: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'PUT',
      path: `${API_ROUTE_USERS}/{id}`,
      handler: updateUserByIdAction,
      options: {
        description: 'Update user by id.',
        tags: ['api'],
        validate: {
          params: Joi.object({
            id: Joi.string().required(),
          }),
          payload: Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            isAdmin: Joi.boolean(),
          }),
        },
      },
    },
  ]);
};
