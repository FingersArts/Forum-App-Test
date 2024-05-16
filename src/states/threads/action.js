import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId, target }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      target,
    },
  };
}

function asyncCreateThread({ title, category, body }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      return await api.createThread({ title, category, body });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpVoteThread({ threadId, isDownVoted }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser: { id } } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: id }));
    // if signed in user, has downvoted, then neutral downvote
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: id, target: 'down-vote' }));

    try {
      return await api.upVoteThread(threadId);
    } catch (error) {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: id, target: 'up-vote' }));
      // if signed in user, has downvoted, then downvote again
      if (isDownVoted) {
        dispatch(downVoteThreadActionCreator({ threadId, userId: id }));
      }

      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownVoteThread({ threadId, isUpVoted }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser: { id } } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: id }));
    // if signed in user, has upvoted, then neutral upvote
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: id, target: 'up-vote' }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: id, target: 'down-vote' }));
      // if signed in user, has upvoted, then upvote again
      if (isUpVoted) {
        dispatch(upVoteThreadActionCreator({ threadId, userId: id }));
      }

      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncNeutralVoteThread({ threadId, target }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser: { id } } = getState();
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: id, target }));

    try {
      return await api.neutralVoteThread(threadId);
    } catch (error) {
      // check button clicked, up vote or down vote
      if (target === 'up-vote') {
        dispatch(upVoteThreadActionCreator({ threadId, userId: id }));
      } else {
        dispatch(downVoteThreadActionCreator({ threadId, userId: id }));
      }

      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};