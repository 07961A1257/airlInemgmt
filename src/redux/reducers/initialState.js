const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const localStorage = window.localStorage;
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
};

const initialState = {
  auth: {
    users: getLocalStorage() || {},
    isAuthenticated: getLocalStorage() ? true : false
  },
  apiCallsInProgress: 0,
  ancillaryLists: [],
  passengers: []
};

export default initialState;
