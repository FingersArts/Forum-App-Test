import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';
import {
  asyncCreateComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncUpVoteComment,
} from '../states/detailThread/action';
import Alert from './Alert';

function Comments() {
  const { threadId } = useParams();
  const comments = useSelector((states) => states.detailThread.comments);
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);
  const [createCommentError, setCreateCommentError] = useState(null);
  const [voteCommentError, setVoteCommentError] = useState(null);

  function resetCreateCommentErrorState() {
    setCreateCommentError(null);
  }

  function resetVoteCommentErrorState() {
    setVoteCommentError(null);
  }

  function handleCreateComment(content) {
    return dispatch(asyncCreateComment({ threadId, content }))
      .then()
      .catch((error) => {
        setCreateCommentError(error.message.replace('content', 'comment'));
      });
  }

  function handleUpVoteComment({ commentId, upVotesBy, downVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteCommentError('You must be signed in to upvote comment!');
      return false;
    }

    // check, if signed in user not upvote yet
    if (!upVotesBy.includes(authUser.id)) {
      // check, if signed in user has downvoted
      let isDownVoted = false;
      if (downVotesBy.includes(authUser.id)) isDownVoted = true;

      dispatch(asyncUpVoteComment({ commentId, isDownVoted }));
    } else {
      dispatch(asyncNeutralVoteComment({ commentId, target: 'up-vote' }));
    }

    return true;
  }

  function handleDownVoteComment({ commentId, downVotesBy, upVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteCommentError('You must be signed in to downvote comment!');
      return false;
    }

    // check, if signed in user not downvote yet
    if (!downVotesBy.includes(authUser.id)) {
      // check, if signed in user has upvoted
      let isUpVoted = false;
      if (upVotesBy.includes(authUser.id)) isUpVoted = true;

      dispatch(asyncDownVoteComment({ commentId, isUpVoted }));
    } else {
      dispatch(asyncNeutralVoteComment({ commentId, target: 'down-vote' }));
    }

    return true;
  }

  return (
    <>
      <section className="comments mt-5">
        <h3 className="fs-5 position-relative d-inline-block">
          Comments
          <span className="position-absolute top-0 start-100 rounded-pill text-bg-secondary badge fw-normal">
            {comments.length}
          </span>
        </h3>
        {createCommentError
          && <Alert message={createCommentError} onClose={resetCreateCommentErrorState} />}
        {authUser === null ? (
          <p className="text-body-secondary">
            You must be
            <Link to="/signin"> signed in </Link>
            to comment!
          </p>
        ) : (
          <CommentInput onCreateComment={handleCreateComment} />
        )}
        <CommentsList
          comments={comments}
          onUpVote={handleUpVoteComment}
          onDownVote={handleDownVoteComment}
        />
      </section>
      {voteCommentError && (
        <div className="position-fixed bottom-0 end-0 p-5 pb-0 fixed-alert">
          <Alert message={voteCommentError} onClose={resetVoteCommentErrorState} type="info" />
        </div>
      )}
    </>
  );
}

export default Comments;
