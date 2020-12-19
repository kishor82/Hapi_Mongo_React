import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/v1/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getOrderDetails = (id: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const payOrder = (orderId: string, paymentResult: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
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

    const { data } = await axios.put(`/api/v1/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};
