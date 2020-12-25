import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';
import axios from 'axios';
import swal from 'sweetalert';

export const listProducts = () => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/v1/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const listProductDetails = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const deleteProduct = (id: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    await axios.delete(`/api/v1/products/${id}`, config);
    swal('Product has been deleted!', {
      icon: 'success',
    });
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const createProduct = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/products`, {}, config);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const updateProduct = (id: any, product: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.put(`/api/v1/products/${id}`, product, config);
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};
