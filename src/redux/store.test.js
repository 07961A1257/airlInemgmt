import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as actions from './actions/ancillaryAction';

it('should handle creating ancillary services', () => {
  // Arrange
  const store = createStore(rootReducer, initialState.ancillaryLists);
  console.log(store);
  const ancillaryService = {
    flight: 1,
    service: 'Special Meal',
    id: 1,
    type: '1'
  };

  // act
  const action = actions.createAncillaryList(ancillaryService);
  store.dispatch(action);

  // assert
  const createdAncillaryService = store.getState().ancillaryList[0].payload;
  expect(createdAncillaryService).toEqual(ancillaryService);
});
