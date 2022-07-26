import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DashboardPage from '../DashboardPage';

describe('Dashboard Page', () => {
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
          <DashboardPage />
        </Provider>,
        { context: { store } }
      );

      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
