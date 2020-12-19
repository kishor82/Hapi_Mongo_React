import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id: any, qty: any) => async (dispatch: any, getState: any) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.data._id,
      name: data.data.name,
      image: data.data.image,
      price: data.data.price,
      countInStock: data.data.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id: string) => (dispatch: any, getState: any) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};
