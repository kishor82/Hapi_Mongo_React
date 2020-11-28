import { greetWelcome, listProducts, getProduct, getUserByEmail, getUserById } from '../use_cases';

import makeGreetWelcomeAction from './greet_welcome';
import makeListProductsAction from './list_products';
import makeGetProductAction from './get_product';
import makeLoginAction from './login_user';
import makeGetUserProfileAction from './get_user_profile';

import wrapError from '../utils/wrap_error';
import generateToken from '../utils/generate_token';

const greetWelcomeAction = makeGreetWelcomeAction({ greetWelcome });
const listProductsAction = makeListProductsAction({ listProducts, wrapError });
const getProductAction = makeGetProductAction({ getProduct, wrapError });
const loginAction = makeLoginAction({ getUserByEmail, generateToken, wrapError });
const getUserProfileAction = makeGetUserProfileAction({ getUserById, wrapError });

export { greetWelcomeAction, listProductsAction, getProductAction, loginAction, getUserProfileAction };
