import { productCollection, userCollection, orderCollection } from '../data_access';

import makeGreetWelcome from './greet_welcome';
import makeGetAllProducts from './get_all_products';
import makeGetProduct from './get_product';
import makeGetUserByEmail from './get_user_by_email';
import makeGetUserById from './get_user_by_id';
import makeCreateNewUser from './create_new_user';
import makeUpdateUserById from './update_user_by_id';
import makeAddOrderItems from './add_order_items';
import makeGetOrderById from './get_order_by_id';
import makeFindOrderByUserId from './find_order_by_user_id';
import makeGetAllUsers from './get_all_users';
import makeDeleteUserById from './delete_user_by_id';
import makeDeleteProductById from './delete_product_by_id';
import makeUpdateProductById from './update_product_by_id';
import makeAddProduct from './add_product';
import makeGetAllOrdes from './get_all_orders';

const greetWelcome = makeGreetWelcome();
const getAllProducts = makeGetAllProducts({ productCollection });
const getProduct = makeGetProduct({ productCollection });
const getUserByEmail = makeGetUserByEmail({ userCollection });
const getUserById = makeGetUserById({ userCollection });
const createNewUser = makeCreateNewUser({ userCollection });
const updateUserById = makeUpdateUserById({ userCollection });
const addOrderItems = makeAddOrderItems({ orderCollection });
const getOrderById = makeGetOrderById({ orderCollection });
const findOrderByUserId = makeFindOrderByUserId({ orderCollection });
const getAllUsers = makeGetAllUsers({ userCollection });
const deleteUserById = makeDeleteUserById({ userCollection });
const deleteProductById = makeDeleteProductById({ productCollection });
const updateProductById = makeUpdateProductById({ productCollection });
const addProduct = makeAddProduct({ productCollection });
const getAllOrders = makeGetAllOrdes({ orderCollection });

export {
  greetWelcome,
  getAllProducts,
  getProduct,
  getUserByEmail,
  getUserById,
  createNewUser,
  updateUserById,
  addOrderItems,
  getOrderById,
  findOrderByUserId,
  getAllUsers,
  deleteUserById,
  deleteProductById,
  updateProductById,
  addProduct,
  getAllOrders,
};
