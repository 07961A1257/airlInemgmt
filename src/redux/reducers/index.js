import { combineReducers } from 'redux';
import apiCallsInProgress from './apiStatusReducer';
import authReducer from './authReducer';
import ancillaryReducer from './ancillaryReducer';
import passengerReducer from './passengerReducer';

const rootReducer = combineReducers({
  apiCallsInProgress,
  auth: authReducer,
  passengers: passengerReducer,
  ancillaryList: ancillaryReducer
});

export default rootReducer;
