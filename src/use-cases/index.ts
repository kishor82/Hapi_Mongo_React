import { productCollection } from '../data-access';
import makeGreetWelcome from './greet-welcome';
import makeListProducts from './list-products';
import makeGetProduct from './get-product';

const greetWelcome = makeGreetWelcome();
const listProducts = makeListProducts({ productCollection });
const getProduct = makeGetProduct({ productCollection });

export { greetWelcome, listProducts, getProduct };
