import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;

    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy
              : [...thread.upVotesBy, action.payload.userId],
          };
        }
        return thread;
      });

    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy
              : [...thread.downVotesBy, action.payload.userId],
          };
        }
        return thread;
      });

    case ActionType.NEUTRAL_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          // check, if target up vote or down vote?
          if (action.payload.target === 'up-vote') {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.includes(action.payload.userId)
                ? thread.upVotesBy.filter((userId) => userId !== action.payload.userId)
                : thread.upVotesBy,
            };
          }

          if (action.payload.target === 'down-vote') {
            return {
              ...thread,
              downVotesBy: thread.downVotesBy.includes(action.payload.userId)
                ? thread.downVotesBy.filter((userId) => userId !== action.payload.userId)
                : thread.downVotesBy,
            };
          }
        }
        return thread;
      });

    default:
      return threads;
  }
}

export default threadsReducer;
