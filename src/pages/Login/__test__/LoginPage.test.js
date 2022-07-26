import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginPage from '../LoginPage';

describe('Login Page', () => {
  const mockStore = configureStore([]);
  const dispatchMock = () => Promise.resolve({});
  const store = mockStore({
    auth: {
      users: {},
      isAuthenticated: false
    },
    apiCallsInProgress: 0,
    ancillaryLists: [],
    passengers: []
  });

  store.dispatch = jest.fn(dispatchMock);
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(
        <Provider store={store}>
          <LoginPage />
        </Provider>,
        { context: { store } }
      );

      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
