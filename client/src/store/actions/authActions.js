import axios from 'axios';
import {
  returnErrors
} from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADD_LINK_SUCCESS,
  DELETE_LINK_SUCCESS
} from '../types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  axios
    .get('/api/v1/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const register = ({
  name,
  email,
  username,
  password
}) => (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    name,
    email,
    username,
    password
  });

  axios
    .post('/api/v1/auth/register', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};


export const login = ({
  username,
  password
}) => (
  dispatch
) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };


  const body = JSON.stringify({
    username,
    password
  });

  axios
    .post('/api/v1/auth/login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};


export const logout = (links) => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
  // dispatch(
  //   clearFiles()
  // );
};

export const addLink = (points) => (dispatch, getState) => {
  const body = JSON.stringify({
    points
  })
  axios.post('/api/v1/user/addLink', body, tokenConfig(getState))
  .then(res =>
    dispatch({
      type: ADD_LINK_SUCCESS,
      payload: res.data
    })
  )
  .catch(err => {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'ADD_LINK_FAILED')
    )
  });
}

export const deleteLink = (name, href) => (dispatch, getState) => {
  const body = JSON.stringify({
    social: {name,href} 
  })
  axios.post('/api/v1/user/deleteLink', body, tokenConfig(getState))
  .then(res =>
    dispatch({
      type: DELETE_LINK_SUCCESS,
      payload: res.data
    })
  )
  .catch(err => {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'DELETE_LINK_FAILED')
    )
  });
}


export const tokenConfig = (getState) => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };


  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
