import {
  greetWelcome,
  listProducts,
  getProduct,
  getUserByEmail,
  getUserById,
  createNewUser,
  addOrderItems,
  getOrderById,
  findOrderByUserId,
  getAllUsers,
} from '../use_cases';

import makeGreetWelcomeAction from './greet_welcome';
import makeListProductsAction from './list_products';
import makeGetProductAction from './get_product';
import makeLoginAction from './login_user';
import makeGetUserProfileAction from './get_user_profile';
import makeRegisterUserAction from './register_user';
import makeUpdateUserProfileAction from './update_user_profile';
import makeAddOrderItemsAction from './add_order_items';
import makeGetOrderItemsAction from './get_order_by_id';
import makeUpdateOrderToPaidAction from './update_order_to_paid';
import makeGetUserOrdersAction from './get_user_orders';
import makeGetAllUserAction from './get_all_users';

import wrapError from '../utils/wrap_error';
import generateCustomError from '../utils/custom_error';
import generateToken from '../utils/generate_token';

const greetWelcomeAction = makeGreetWelcomeAction({ greetWelcome });
const listProductsAction = makeListProductsAction({ listProducts, wrapError });
const getProductAction = makeGetProductAction({ getProduct, generateCustomError, wrapError });
const loginAction = makeLoginAction({ getUserByEmail, generateToken, generateCustomError, wrapError });
const getUserProfileAction = makeGetUserProfileAction({ getUserById, generateCustomError, wrapError });
const addOrderItemsAction = makeAddOrderItemsAction({ addOrderItems, wrapError });
const getOrderByIdAction = makeGetOrderItemsAction({ getOrderById, generateCustomError, wrapError });
const updateOrderToPaidAction = makeUpdateOrderToPaidAction({ getOrderById, generateCustomError, wrapError });
const getUserOrdersAction = makeGetUserOrdersAction({ findOrderByUserId, wrapError });
const getAllUserAction = makeGetAllUserAction({ getAllUsers, wrapError });

const updateUserProfileAction = makeUpdateUserProfileAction({
  getUserById,
  generateCustomError,
  generateToken,
  wrapError,
});
const registerUserAction = makeRegisterUserAction({
  getUserByEmail,
  generateToken,
  createNewUser,
  generateCustomError,
  wrapError,
});

export {
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
};
