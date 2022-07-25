/* eslint-disable no-debugger */
import Axios from '../config/api.config';

export const getUserDetails = (user) => {
  return Axios.get(`/users?email=${user.email}&&password=${user.password}`).then((response) => {
    return response.data[0];
  });
};

export const getUserInformation = async (user) => {
  const response = await Axios.get('/users', {
    params: {
      ...user
    }
  });
  return response;
};

export const createUser = async (user) => {
  const response = await Axios.post('/users', user);
  return response;
};
