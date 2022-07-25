import ancillaryReducer from '../ancillaryReducer';
import * as actions from '../../actions/ancillaryAction';

describe('Ancillary Reducers', () => {
  const INITIAL_STATE = [
    {
      flight: 1,
      service: 'Special Meal',
      id: 1,
      type: '1'
    }
  ];

  it('should add ancillary when passed CREATE_ANCILLARY_SUCCESS', () => {
    // ARRANGE

    const newAncillaryService = {
      flight: 1,
      service: 'Shopping Item 1',
      id: 2,
      type: '2'
    };

    const action = actions.createAncillaryList(newAncillaryService);

    // ACT
    const newState = ancillaryReducer(INITIAL_STATE, action);

    // ASSERT
    expect(newState.length).toEqual(2);
    expect(newState[0].flight).toEqual(1);
  });

  it('should update course when passed UPDATE_ANCILLARY_SUCCESS', () => {
    // arrange
    const updatedAncillary = {
      flight: 1,
      service: 'Special Meal - Updated',
      id: 1,
      type: '1'
    };

    const action = actions.updateAncillaryList(updatedAncillary);

    // act
    const newState = ancillaryReducer(INITIAL_STATE, action);

    // assert
    expect(newState.length).toEqual(1);
    expect(newState[0].service).toEqual('Special Meal - Updated');
  });

  it('should load ancillary when passed LOAD_ANCILLARY_SUCCESS', () => {
    // ARRANGE
    const action = actions.loadAncillaryList();

    // ACT
    const newState = ancillaryReducer(INITIAL_STATE, action);

    // ASSERT
    expect(newState).toEqual(INITIAL_STATE);
  });
});
