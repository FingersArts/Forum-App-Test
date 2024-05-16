import {
    describe,
    test,
    expect,
    beforeEach,
    afterEach,
    vi,
  } from 'vitest';
  import { hideLoading, showLoading } from 'react-redux-loading-bar';
  import { asyncPopulateUsersThreadsAndCategories } from './action';
  import api from '../../utils/api';
  import { receiveThreadsActionCreator } from '../threads/action';
  import { receiveUsersActionCreator } from '../users/action';
  import { receiveCategoriesActionCreator } from '../categories/action';
  
  /**
   * Test scenario
   *
   * - asyncPopulateUsersThreadsAndCategories thunk
   *   - should dispatch action correctly when data fetching success
   *   - should dispatch action correctly and throw error when data fetching failed
   */
  
  const fakeThreadsResponse = [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ];
  
  const fakeUsersResponse = [
    {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  ];
  
  const fakeCategoriesResponse = {
    values: ['all', 'General'],
    selected: 'all',
  };
  
  const fakeErrorResponse = new Error('Ups, something went wrong');
  
  describe('asyncPopulateUsersThreadsAndCategories thunk', () => {
    beforeEach(() => {
      api._getAllThreads = api.getAllThreads;
      api._getAllUsers = api.getAllUsers;
    });
  
    afterEach(() => {
      api.getAllThreads = api._getAllThreads;
      api.getAllUsers = api._getAllUsers;
  
      // delete backup
      delete api._getAllThreads;
      delete api._getAllUsers;
    });
  
    test('should dispatch action correctly when data fetching success', async () => {
      // Arrange
      api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
      api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
      const dispatch = vi.fn();
      // Action
      await asyncPopulateUsersThreadsAndCategories()(dispatch);
      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
      expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
      expect(dispatch).toHaveBeenCalledWith(receiveCategoriesActionCreator(fakeCategoriesResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  
    test('should dispatch action correctly and throw error when data fetching failed', async () => {
      // Arrange
      api.getAllThreads = () => Promise.reject(fakeErrorResponse);
      api.getAllUsers = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();
      // Action
      await expect(() => asyncPopulateUsersThreadsAndCategories()(dispatch))
        .rejects.toThrowError(fakeErrorResponse.message);
      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator([]));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });