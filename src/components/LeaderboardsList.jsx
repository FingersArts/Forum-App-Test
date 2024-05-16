import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboarItem';
import { leaderboardItemShape } from './LeaderboarItemShape';

function LeaderboardsList({ leaderboards }) {
  return (
    <article className="leaderboards-list">
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardItem key={leaderboard.user.id} {...leaderboard} rank={index + 1} />
      ))}
    </article>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape)).isRequired,
};

export default LeaderboardsList;
