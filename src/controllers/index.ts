import { greetWelcome, listProducts, getProduct } from '../use-cases';

import makeGreetWelcomeAction from './greet-welcome';
import makeListProductsAction from './list-products';
import makeGetProductAction from './get-product';

import wrapError from '../services/wrap_error';

const greetWelcomeAction = makeGreetWelcomeAction({ greetWelcome });
const listProductsAction = makeListProductsAction({ listProducts, wrapError });
const getProductAction = makeGetProductAction({ getProduct, wrapError });

export { greetWelcomeAction, listProductsAction, getProductAction };
