import {
    describe,
    test,
    expect,
  } from 'vitest';
  import authUserReducer from './reducer';
  import { ActionType } from './action';
  
  /**
   * Test scenario for authUserReducer
   *
   * - authUserReducer function
   *   - should return the current state when given by unknown action
   *   - should return the authUser when given by SET_AUTH_USER action
   *   - should return null when given by by UNSET_AUTH_USER action
   */
  
  describe('authUserReducer function', () => {
    test('should return the current state when given by unknown action', () => {
      // Arrange
      const currentState = null;
      const action = { type: 'UNKNOWN' };
  
      // Action
      const nextState = authUserReducer(currentState, action);
  
      // Assert
      expect(nextState).toEqual(currentState);
    });
  
    test('should return the authUser when given by SET_AUTH_USER action', () => {
      // Arrange
      const currentState = null;
      const action = {
        type: ActionType.SET_AUTH_USER,
        payload: {
          authUser: {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        },
      };
      // Action
      const nextState = authUserReducer(currentState, action);
      // Assert
      expect(nextState).toEqual(action.payload.authUser);
    });
  
    test('should return null when given by by UNSET_AUTH_USER action', () => {
      // Arrange
      const currentState = {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      };
      const action = {
        type: ActionType.UNSET_AUTH_USER,
      };
      // Action
      const nextState = authUserReducer(currentState, action);
      // Assert
      expect(nextState).toBeNull();
    });
  });