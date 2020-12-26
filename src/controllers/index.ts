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
  deleteUserById,
  updateUserById,
  deleteProductById,
  updateProductById,
  addProduct,
  getAllOrders,
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
import makeDeleteUserAction from './delete_user';
import makeGetUserByIdAction from './get_user_by_id';
import makeUpdateUserByIdAction from './update_user_by_id';
import makeDeleteProductAction from './delete_product';
import makeUpdateProductByIdAction from './update_product_by_id';
import makeAddProductAction from './add_product';
import makeGetAllOrdersAction from './get_all_orders';
import makeUpdateOrderToDeliveredAction from './update_order_to_delivered';
import makeCreateProductReviewAction from './create_product_review';

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
const deleteUserAction = makeDeleteUserAction({ deleteUserById, generateCustomError, wrapError });
const getUserByIdAction = makeGetUserByIdAction({ getUserById, generateCustomError, wrapError });
const updateUserByIdAction = makeUpdateUserByIdAction({ updateUserById, generateCustomError, wrapError });
const deleteProductAction = makeDeleteProductAction({ deleteProductById, generateCustomError, wrapError });
const updateProductByIdAction = makeUpdateProductByIdAction({ updateProductById, generateCustomError, wrapError });
const addProductAction = makeAddProductAction({ addProduct, generateCustomError, wrapError });
const getAllOrdersAction = makeGetAllOrdersAction({ getAllOrders, wrapError });
const updateOrderToDeliveredAction = makeUpdateOrderToDeliveredAction({ getOrderById, generateCustomError, wrapError });
const createProductReviewAction = makeCreateProductReviewAction({
  updateProductById,
  getProduct,
  generateCustomError,
  wrapError,
});
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
  deleteUserAction,
  getUserByIdAction,
  updateUserByIdAction,
  deleteProductAction,
  updateProductByIdAction,
  addProductAction,
  getAllOrdersAction,
  updateOrderToDeliveredAction,
  createProductReviewAction,
};
