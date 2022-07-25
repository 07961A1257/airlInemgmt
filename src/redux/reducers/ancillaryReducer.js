/* eslint-disable no-debugger */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

const ancillaryReducer = (state = initialState.ancillaryLists, action) => {
  switch (action.type) {
    case types.CREATE_ANCILLARY_SUCCESS:
      return [...state, { ...action }];

    case types.UPDATE_ANCILLARY_SUCCESS:
      return state.map((ancillary) =>
        ancillary.id === action.payload.id ? action.payload : ancillary
      );

    case types.LOAD_ANCILLARY_SUCCESS:
      return action.payload;

    case types.DELETE_ANCILLARY_OPTIMISTIC:
      return state.filter((ancillary) => ancillary.id !== action.payload.id);

    default:
      return state;
  }
};

export default ancillaryReducer;
