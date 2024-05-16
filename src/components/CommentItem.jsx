import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import SanitizeHTML from './SanitizeHTML';
import { isSignedInUserVoted } from '../utils';
import { commentItemShape } from './CommentItemShape';

dayjs.extend(relativeTime);

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy, onUpVote, onDownVote }) {
  const authUser = useSelector((states) => states.authUser);

  function handleUpVote(e) {
    e.preventDefault();
    onUpVote({ commentId: id, upVotesBy, downVotesBy });
  }

  function handleDownVote(e) {
    e.preventDefault();
    onDownVote({ commentId: id, downVotesBy, upVotesBy });
  }

  return (
    <article className="comment-item mb-1">
      <div className="comment-body mb-3">
        <div className="comment-author d-flex align-items-center">
          <img
            src={owner.avatar}
            alt={owner.name}
            width="20"
            className="me-2"
          />
          <div className="lh-1">
            <span className="d-block">{owner.name}</span>
            <time className="text-secondary">{dayjs().to(dayjs(createdAt))}</time>
          </div>
        </div>
        <SanitizeHTML html={content} className="mt-2" />
      </div>
      <div className="comment-footer d-flex fw-light gap-3 row-gap-1 flex-wrap">
        <button
          type="submit"
          className={isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? 'active' : ''}
          onClick={handleUpVote}
        >
          <i className={`bi bi-arrow-up-circle${isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? '-fill' : ''}`} />
          <span>{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          className={isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? 'active' : ''}
          onClick={handleDownVote}
        >
          <i className={`bi bi-arrow-down-circle${isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? '-fill' : ''}`} />
          <span>{downVotesBy.length}</span>
        </button>
      </div>
    </article>
  );
}

CommentItem.propTypes = {
  ...commentItemShape,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default CommentItem;
