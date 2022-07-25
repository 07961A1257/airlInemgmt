/* eslint-disable no-unused-vars */
import { getUserDetails, getUserInformation } from '../../api/authenticationService';
import { apiCallError } from '../actions/apiStatusActions';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './actionTypes';

export const loadUserDetails = (userId) => {};

const loginUserSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

const logOutUserSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const signInUser = (user) => (dispatch) => {
  return getUserDetails(user)
    .then((response) => {
      // eslint-disable-next-line no-debugger

      let validState = false;
      if (user.googleAuth) {
        dispatch(loginUserSuccess({ ...user, name: user.name }));
        localStorage.setItem('user', JSON.stringify({ ...user, name: user.name }));
        validState = true;
        return { ...user, validState };
      } else if (response) {
        console.log(response);
        dispatch(loginUserSuccess({ ...response, name: response.name }));
        localStorage.setItem('user', JSON.stringify({ ...response, name: response.name }));
        validState = true;
        return { ...response, validState };
      }
    })
    .catch((error) => {
      dispatch(apiCallError(error));
    });
};

export const logOutApp = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch(logOutUserSuccess(null));
};
