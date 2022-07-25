import { handleResponse, handleError } from './apiUtils';
import Axios from '../config/api.config';

export const loadAncillaryLists = () =>
  Axios.get('ancillaryServices').then(handleResponse).catch(handleError);

export const removeAncillaryService = (id) =>
  Axios.delete('ancillaryServices/' + id)
    .then(handleResponse)
    .catch(handleError);

export const saveAncillaryLists = (service) => {
  if (service.id) {
    return Axios.put('ancillaryServices/' + service.id, service)
      .then(handleResponse)
      .catch(handleError);
  } else {
    return Axios.post('ancillaryServices', service).then(handleResponse).catch(handleError);
  }
};
