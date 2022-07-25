import * as ancillaryServiceActions from '../ancillaryAction';
import * as types from '../actionTypes';

const ancillaryServices = [
  {
    flight: 1,
    service: 'Special Meal',
    id: 1,
    type: '1'
  },
  {
    flight: 1,
    service: 'Shopping Item 1',
    id: 2,
    type: '2'
  },
  {
    flight: 1,
    service: 'Shopping Item 2',
    id: 3,
    type: '2'
  }
];

describe('create Ancillary Service', () => {
  it('should create a CREATE_ANCILLARY_SUCCESS action', () => {
    // arrange
    const ancillaryService = ancillaryServices[0];

    const expectedAction = {
      type: types.CREATE_ANCILLARY_SUCCESS,
      payload: ancillaryService
    };

    // act
    const action = ancillaryServiceActions.createAncillaryList(ancillaryService);
    console.log(action.payload);
    // assert
    expect(action).toEqual(expectedAction);
  });
});
