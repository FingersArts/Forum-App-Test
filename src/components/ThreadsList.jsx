import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';
import { threadItemShape } from './ThreadItemShape';

function ThreadsList({ threads, onUpVote, onDownVote }) {
  return (
    <article className="threads-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} onUpVote={onUpVote} onDownVote={onDownVote} />
      ))}
    </article>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadsList;
