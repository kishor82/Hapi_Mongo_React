import { greetWelcome, listProducts, getProduct, getUserByEmail, getUserById, createNewUser } from '../use_cases';

import makeGreetWelcomeAction from './greet_welcome';
import makeListProductsAction from './list_products';
import makeGetProductAction from './get_product';
import makeLoginAction from './login_user';
import makeGetUserProfileAction from './get_user_profile';
import makeRegisterUserAction from './register_user';

import wrapError from '../utils/wrap_error';
import generateCustomError from '../utils/custom_error';
import generateToken from '../utils/generate_token';

const greetWelcomeAction = makeGreetWelcomeAction({ greetWelcome });
const listProductsAction = makeListProductsAction({ listProducts, wrapError });
const getProductAction = makeGetProductAction({ getProduct, generateCustomError, wrapError });
const loginAction = makeLoginAction({ getUserByEmail, generateToken, generateCustomError, wrapError });
const getUserProfileAction = makeGetUserProfileAction({ getUserById, generateCustomError, wrapError });
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
};
