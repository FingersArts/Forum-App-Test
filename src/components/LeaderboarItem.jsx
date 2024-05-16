import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { leaderboardItemShape } from './LeaderboarItemShape';

function LeaderboardItem({ user, score, rank }) {
  const authUser = useSelector((states) => states.authUser);

  function setActive() {
    if (authUser?.id === user.id) return 'border-primary-subtle';
    return '';
  }

  return (
    <article className="leaderboard-item d-flex mb-2">
      <div className={`leaderboard-number align-middle d-flex align-items-center ${setActive()}`}>
        <span>{rank}</span>
      </div>
      <div className={`leaderboard-body flex-grow-1 d-flex justify-content-between ${setActive()}`}>
        <div className="leaderboard-profile d-flex align-items-center">
          <img
            src={user.avatar}
            alt={user.name}
            width="25"
            className="me-2"
          />
          <span>{user.name}</span>
        </div>
        <div className="leaderboard-score d-flex align-items-center">
          <span className="me-1">{score}</span>
          <span className="text-secondary">score</span>
        </div>
      </div>
    </article>
  );
}
LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;