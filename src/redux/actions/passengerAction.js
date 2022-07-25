import * as types from './actionTypes';
import * as passengerServiceAPI from '../../api/passengerService';
import { beginApiCall, apiCallError } from './apiStatusActions';

/** Reducers */
export const loadPassengersOnLoad = (payload) => {
  return { type: types.LOAD_PASSENGERS_SUCCESS, payload };
};

export const updatePassengersList = (payload) => {
  return {
    type: types.UPDATE_PASSENGER_SUCCESS,
    payload
  };
};

export const createPassengersList = (payload) => {
  return {
    type: types.CREATE_PASSENGER_SUCCESS,
    payload
  };
};

export const deletePassengerOptimistic = (payload) => {
  return {
    type: types.DELETE_PASSENGER_OPTIMISTIC,
    payload
  };
};

/** Reducers */

export const loadPassengersList = () => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return passengerServiceAPI
      .getCheckInPassengers()
      .then((response) => {
        dispatch(loadPassengersOnLoad(response));
      })
      .catch((err) => {
        console.error('Something went wrong', err);
        dispatch(apiCallError(err));
      });
  };
};

export const saveUpdatePassengersList = (service) => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return passengerServiceAPI
      .saveCheckInPassenger(service)
      .then((response) => {
        if (service.id) dispatch(updatePassengersList(response));
        else dispatch(createPassengersList(response));
      })
      .catch((err) => {
        console.error('Something went wrong', err);
        dispatch(apiCallError(err));
      });
  };
};

export const deletePassengerDetails = (id) => {
  return function (dispatch) {
    dispatch(deletePassengerOptimistic(id));
    return passengerServiceAPI.deleteCheckInPassenger(id);
  };
};
