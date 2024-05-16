import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;

    case ActionType.CLEAR_DETAIL_THREAD:
      return null;

    case ActionType.UP_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy
          : [...detailThread.upVotesBy, action.payload.userId],
      };

    case ActionType.DOWN_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy
          : [...detailThread.downVotesBy, action.payload.userId],
      };

    case ActionType.NEUTRAL_VOTE_DETAIL_THREAD:
      // check, if target up vote or down vote
      if (action.payload.target === 'up-vote') {
        return {
          ...detailThread,
          upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
            ? detailThread.upVotesBy.filter((userId) => userId !== action.payload.userId)
            : detailThread.upVotesBy,
        };
      }

      if (action.payload.target === 'down-vote') {
        return {
          ...detailThread,
          downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
            ? detailThread.downVotesBy.filter((userId) => userId !== action.payload.userId)
            : detailThread.downVotesBy,
        };
      }
      return detailThread;

    case ActionType.CREATE_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };

    case ActionType.UP_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy
                : [...comment.upVotesBy, action.payload.userId],
            };
          }
          return comment;
        }),
      };

    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy
                : [...comment.downVotesBy, action.payload.userId],
            };
          }
          return comment;
        }),
      };

    case ActionType.NEUTRAL_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            // check, if target up vote or down vote
            if (action.payload.target === 'up-vote') {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter((userId) => userId !== action.payload.userId)
                  : comment.upVotesBy,
              };
            }

            if (action.payload.target === 'down-vote') {
              return {
                ...comment,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter((userId) => userId !== action.payload.userId)
                  : comment.downVotesBy,
              };
            }
          }
          return comment;
        }),
      };

    default:
      return detailThread;
  }
}

export default detailThreadReducer;
