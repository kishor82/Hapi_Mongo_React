import { productCollection, userCollection } from '../data_access';

import makeGreetWelcome from './greet_welcome';
import makeListProducts from './list_products';
import makeGetProduct from './get_product';
import makeGetUserByEmail from './get_user_by_email';
import makeGetUserById from './get_user_by_id';
import makeCreateNewUser from './create_new_user';
import makeUpdateUserById from './update_user_by_id';

const greetWelcome = makeGreetWelcome();
const listProducts = makeListProducts({ productCollection });
const getProduct = makeGetProduct({ productCollection });
const getUserByEmail = makeGetUserByEmail({ userCollection });
const getUserById = makeGetUserById({ userCollection });
const createNewUser = makeCreateNewUser({ userCollection });
const updateUserById = makeUpdateUserById({ userCollection });

export { greetWelcome, listProducts, getProduct, getUserByEmail, getUserById, createNewUser, updateUserById };
