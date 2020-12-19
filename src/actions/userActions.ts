import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
} from '../constants/userConstants';
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/login', { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const logout = () => (dispatch: any) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
};

export const register = (name: string, email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/register', { name, email, password }, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const getUserDetails = (id: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/v1/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const updateUserProfile = (user: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(`/api/v1/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};
