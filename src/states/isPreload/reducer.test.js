import {
    describe,
    test,
    expect,
  } from 'vitest';
  import { isPreloadReducer } from './reducer';
  import { ActionType } from './action';
  
  /**
   * Test scenario for isPreloadReducer
   *
   * - isPreloadReducer function
   *   - should return the current state when given by unknown action
   *   - should return the isPreload when given by SET_IS_PRELOAD action
   */
  
  describe('isPreloadReducer function', () => {
    test('should return the current state when given by unknown action', () => {
      // Arrange
      const currentState = true;
      const action = { type: 'unknown' };
  
      // Action
      const nextState = isPreloadReducer(currentState, action);
  
      // Assert
      expect(nextState).toEqual(currentState);
    });
  
    test('should return the isPreload when given by SET_IS_PRELOAD action', () => {
      // Arrange
      const currentState = true;
      const action = {
        type: ActionType.SET_IS_PRELOAD,
        payload: {
          isPreload: false,
        },
      };
  
      // Action
      const nextState = isPreloadReducer(currentState, action);
  
      // Assert
      expect(nextState).toEqual(action.payload.isPreload);
    });
  });