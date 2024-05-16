import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import { stripHtml, isSignedInUserVoted } from '../utils';
import { threadItemShape } from './ThreadItemShape';

dayjs.extend(relativeTime);

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
  onUpVote,
  onDownVote,
}) {
  const authUser = useSelector((states) => states.authUser);

  const stripedBody = stripHtml(body);
  const bodyCountChr = stripedBody.length;
  const dots = bodyCountChr <= 80 ? '' : '...';

  function handleUpVote(e) {
    e.stopPropagation();
    e.preventDefault();

    onUpVote({ threadId: id, upVotesBy, downVotesBy });
  }

  function handleDownVote(e) {
    e.stopPropagation();
    e.preventDefault();

    onDownVote({ threadId: id, downVotesBy, upVotesBy });
  }

  return (
    <article className="thread-item mb-1">
      <Link to={`/threads/${id}`}>
        <div className="thread-body mb-3">
          <div className="thread-author mb-1">
            <img
              src={owner.avatar}
              alt={owner.name}
              width={15}
              className="me-1"
            />
            <span>{owner.name}</span>
          </div>
          <h2 className="fs-5 mb-0 text-body">{title}</h2>
          <p className="mb-0">{stripedBody.substring(0, 80) + dots}</p>
        </div>
      </Link>
      <div className="thread-footer d-flex fw-light gap-3 row-gap-1 flex-wrap">
        <div>
          <i className="bi bi-hash me-0" />
          <span>{category}</span>
        </div>
        <div className="me-4">
          <i className="bi bi-clock-fill" />
          <time>{dayjs().to(dayjs(createdAt))}</time>
        </div>

        <button
          type="button"
          onClick={handleUpVote}
          className={isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? 'active' : ''}
        >
          <i className={`bi bi-arrow-up-circle${isSignedInUserVoted({ authUser, votesBy: upVotesBy }) ? '-fill' : ''}`} />
          <span>{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          onClick={handleDownVote}
          className={isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? 'active' : ''}
        >
          <i className={`bi bi-arrow-down-circle${isSignedInUserVoted({ authUser, votesBy: downVotesBy }) ? '-fill' : ''}`} />
          <span>{downVotesBy.length}</span>
        </button>

        <div>
          <i className="bi bi-chat" />
          <span>{totalComments}</span>
        </div>
      </div>
    </article>
  );
}

ThreadItem.propTypes = {
  ...threadItemShape,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadItem;
