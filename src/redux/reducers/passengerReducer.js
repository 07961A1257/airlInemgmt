/* eslint-disable no-debugger */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

const passengerReducer = (state = initialState.passengers, action) => {
  switch (action.type) {
    case types.CREATE_PASSENGER_SUCCESS:
      return { ...state, passengers: state.concat(action.payload) };

    case types.UPDATE_PASSENGER_SUCCESS:
      return state.map((passenger) =>
        passenger.id === action.payload.id ? action.payload : passenger
      );

    case types.LOAD_PASSENGERS_SUCCESS:
      return action.payload;

    case types.DELETE_PASSENGER_OPTIMISTIC:
      return state.filter((passenger) => passenger.id !== action.payload.id);

    default:
      return state;
  }
};

export default passengerReducer;
