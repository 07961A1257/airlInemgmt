import { handleResponse, handleError } from './apiUtils';
import Axios from '../config/api.config';

export const getCheckInPassengers = () =>
  Axios.get('passengers').then(handleResponse).catch(handleError);

export const getCheckInPassengersByFlight = (flightId) =>
  Axios.get('passengers', {
    params: {
      flight: flightId
    }
  })
    .then(handleResponse)
    .catch(handleError);

export const deleteCheckInPassenger = (id) => {
  return Axios.delete('passengers/' + id)
    .then(handleResponse)
    .catch(handleError);
};

export const saveCheckInPassenger = (service) => {
  if (service.id) {
    return Axios.put('passengers/' + service.id, service)
      .then(handleResponse)
      .catch(handleError);
  } else {
    return Axios.post('passengers', service).then(handleResponse).catch(handleError);
  }
};
