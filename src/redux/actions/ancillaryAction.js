import * as types from './actionTypes';
import * as AncillaryServiceApi from '../../api/ancillaryService';
import { beginApiCall, apiCallError } from './apiStatusActions';

/** Reducers */
export const loadAncillaryListOnLoad = (payload) => {
  return { type: types.LOAD_ANCILLARY_SUCCESS, payload };
};

export const updateAncillaryList = (payload) => {
  return {
    type: types.UPDATE_ANCILLARY_SUCCESS,
    payload
  };
};

export const createAncillaryList = (payload) => {
  return {
    type: types.CREATE_ANCILLARY_SUCCESS,
    payload
  };
};

export const deleteAncillaryOptimistic = (payload) => {
  return {
    type: types.DELETE_ANCILLARY_OPTIMISTIC,
    payload
  };
};

/** Reducers */

export const loadAncillaryList = () => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return AncillaryServiceApi.loadAncillaryLists()
      .then((response) => {
        dispatch(loadAncillaryListOnLoad(response));
      })
      .catch((err) => {
        console.error('Something went wrong', err);
        dispatch(apiCallError(err));
      });
  };
};

export const saveUpdateAncillaryList = (service) => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return AncillaryServiceApi.saveAncillaryLists(service)
      .then((response) => {
        if (service.id) dispatch(updateAncillaryList(response));
        else dispatch(createAncillaryList(response));
      })
      .catch((err) => {
        console.error('Something went wrong', err);
        dispatch(apiCallError(err));
      });
  };
};

export const deleteAncillaryDetails = (id) => {
  return function (dispatch) {
    dispatch(deleteAncillaryOptimistic(id));
    return AncillaryServiceApi.removeAncillaryService(id);
  };
};
