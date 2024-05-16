import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  upVoteThreadActionCreator,
} from './action';
import api from '../../utils/api';

/**
 * Test scenario
 *
 * - asyncUpVoteThread thunk
 *   - should dispatch action correctly and call api function correctly when up-vote success
 *   - should dispatch action correctly (without DOWN_VOTE_THREAD action), call api function
 *   correctly and throw error when up-vote failed and isDownVoted = false
 *   - should dispatch action correctly (with DOWN_VOTE_THREAD action), call api function correctly
 *   and throw error when up-vote failed and isDownVoted = true
 *
 * - asyncDownVoteThread thunk
 *   - should dispatch action correctly and call api function correctly when down-vote success
 *   - should dispatch action correctly (without UP_VOTE_THREAD action), call api function correctly
 *   and throw error when down-vote failed and isUpVoted = false
 *   - should dispatch action correctly (with UP_VOTE_THREAD action), call api function correctly
 *   and throw error when down-vote failed and isUpVoted = true
 *
 * - asyncNeutralVoteThread thunk
 *   - should dispatch action correctly and call api function correctly when neutral-vote success
 *   - should dispatch action correctly (with UP_VOTE_THREAD action), call api function correctly
 *   and throw error when neutral-vote failed and target = 'up-vote'
 *   - should dispatch action correctly (with DOWN_VOTE_THREAD action), call api function correctly
 *   and throw error when neutral-vote failed and target != 'up-vote'
 */

const fakeUpVoteResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: 1,
};

const fakeDownVoteResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: -1,
};

const fakeNeutralVoteResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncUpVoteThread thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    // delete backup
    delete api._upVoteThread;
  });

  test('should dispatch action correctly and call api function correctly when up-vote success', async () => {
    // Arrange
    api.upVoteThread = vi.fn(() => Promise.resolve(fakeUpVoteResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeUpVoteResponse.userId } });
    // Action
    await asyncUpVoteThread({ threadId: fakeUpVoteResponse.threadId })(dispatch, getState);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
      target: 'down-vote',
    }));
    expect(api.upVoteThread).toHaveBeenCalledWith(fakeUpVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch action correctly (without DOWN_VOTE_THREAD action), call api function correctly  and throw error when up-vote failed and isDownVoted = false', async () => {
    // Arrange
    api.upVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeUpVoteResponse.userId } });
    // Action
    await expect(() => asyncUpVoteThread({
      threadId: fakeUpVoteResponse.threadId,
      isDownVoted: false,
    })(dispatch, getState)).rejects.toThrowError(fakeErrorResponse.message);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
      target: 'down-vote',
    }));
    expect(api.upVoteThread).toHaveBeenCalledWith(fakeUpVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
      target: 'up-vote',
    }));
    expect(dispatch).not.toHaveBeenCalledWith(downVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch action correctly (with DOWN_VOTE_THREAD action), call api function correctly and throw error when up-vote failed and isDownVoted = true', async () => {
    // Arrange
    api.upVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeUpVoteResponse.userId } });
    // Action
    await expect(() => asyncUpVoteThread({
      threadId: fakeUpVoteResponse.threadId,
      isDownVoted: true,
    })(dispatch, getState)).rejects.toThrowError(fakeErrorResponse.message);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
      target: 'down-vote',
    }));
    expect(api.upVoteThread).toHaveBeenCalledWith(fakeUpVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
      target: 'up-vote',
    }));
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({
      threadId: fakeUpVoteResponse.threadId,
      userId: fakeUpVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncDownVoteThread thunk', () => {
  beforeEach(() => {
    api._downVoteThread = api.downVoteThread;
  });

  afterEach(() => {
    api.downVoteThread = api._downVoteThread;
    // delete backup
    delete api._downVoteThread;
  });

  test('should dispatch action correctly and call api function correctly when down-vote success', async () => {
    // Arrange
    api.downVoteThread = vi.fn(() => Promise.resolve(fakeDownVoteResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeDownVoteResponse.userId } });
    // Action
    await asyncDownVoteThread({ threadId: fakeDownVoteResponse.threadId })(dispatch, getState);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
      target: 'up-vote',
    }));
    expect(api.downVoteThread).toHaveBeenCalledWith(fakeDownVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch action correctly (without UP_VOTE_THREAD action), call api function correctly and throw error when down-vote failed and isUpVoted = false', async () => {
    // Arrange
    api.downVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeDownVoteResponse.userId } });
    // Action
    await expect(() => asyncDownVoteThread({
      threadId: fakeDownVoteResponse.threadId,
      isUpVoted: false,
    })(dispatch, getState)).rejects.toThrowError(fakeErrorResponse.message);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
      target: 'up-vote',
    }));
    expect(api.downVoteThread).toHaveBeenCalledWith(fakeDownVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
      target: 'down-vote',
    }));
    expect(dispatch).not.toHaveBeenCalledWith(upVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch action correctly (with UP_VOTE_THREAD action), call api function correctly and throw error when down-vote failed and isUpVoted = true', async () => {
    // Arrange
    api.downVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeDownVoteResponse.userId } });
    // Action
    await expect(() => asyncDownVoteThread({
      threadId: fakeDownVoteResponse.threadId,
      isUpVoted: true,
    })(dispatch, getState)).rejects.toThrowError(fakeErrorResponse.message);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
      target: 'up-vote',
    }));
    expect(api.downVoteThread).toHaveBeenCalledWith(fakeDownVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
      target: 'down-vote',
    }));
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({
      threadId: fakeDownVoteResponse.threadId,
      userId: fakeDownVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncNeutralVoteThread thunk', () => {
  beforeEach(() => {
    api._neutralVoteThread = api.neutralVoteThread;
  });

  afterEach(() => {
    api.neutralVoteThread = api._neutralVoteThread;
    // delete backup
    delete api._neutralVoteThread;
  });

  test('should dispatch action correctly and call api function correctly when neutral-vote success', async () => {
    // Arrange
    api.neutralVoteThread = vi.fn(() => Promise.resolve(fakeNeutralVoteResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeNeutralVoteResponse.userId } });
    // Action
    await asyncNeutralVoteThread({
      threadId: fakeNeutralVoteResponse.threadId,
      target: 'up-vote',
    })(dispatch, getState);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeNeutralVoteResponse.threadId,
      userId: fakeNeutralVoteResponse.userId,
      target: 'up-vote',
    }));
    expect(api.neutralVoteThread).toHaveBeenCalledWith(fakeNeutralVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch action correctly (with UP_VOTE_THREAD action), call api function correctly and throw error when neutral-vote failed and target = \'up-vote\'', async () => {
    // Arrange
    api.neutralVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeNeutralVoteResponse.userId } });
    // Action
    await expect(() => asyncNeutralVoteThread({
      threadId: fakeNeutralVoteResponse.threadId,
      target: 'up-vote',
    })(dispatch, getState)).rejects.toThrowError(fakeErrorResponse.message);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeNeutralVoteResponse.threadId,
      userId: fakeNeutralVoteResponse.userId,
      target: 'up-vote',
    }));
    expect(api.neutralVoteThread).toHaveBeenCalledWith(fakeNeutralVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({
      threadId: fakeNeutralVoteResponse.threadId,
      userId: fakeNeutralVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch action correctly (with DOWN_VOTE_THREAD action), call api function correctly and throw error when neutral-vote failed and target != \'up-vote\'', async () => {
    // Arrange
    api.neutralVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: fakeNeutralVoteResponse.userId } });
    // Action
    await expect(() => asyncNeutralVoteThread({
      threadId: fakeNeutralVoteResponse.threadId,
      target: 'down-vote',
    })(dispatch, getState)).rejects.toThrowError(fakeErrorResponse.message);
    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({
      threadId: fakeNeutralVoteResponse.threadId,
      userId: fakeNeutralVoteResponse.userId,
      target: 'down-vote',
    }));
    expect(api.neutralVoteThread).toHaveBeenCalledWith(fakeNeutralVoteResponse.threadId);
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({
      threadId: fakeNeutralVoteResponse.threadId,
      userId: fakeNeutralVoteResponse.userId,
    }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});