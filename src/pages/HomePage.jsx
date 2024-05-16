import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import Alert from '../components/Alert';
import { asyncPopulateUsersThreadsAndCategories } from '../states/shared/action';
import { asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from '../states/threads/action';
import { setCategoryActionCreator } from '../states/categories/action';
import ThreadsFilter from '../components/ThreadsFilter';

function HomePage() {
  const dispatch = useDispatch();
  const users = useSelector((states) => states.users);
  const threads = useSelector((states) => states.threads);
  const categories = useSelector((states) => states.categories);
  const authUser = useSelector((states) => states.authUser);
  const [voteThreadError, setVoteThreadError] = useState(null);

  function resetVoteThreadErrorState() {
    setVoteThreadError(null);
  }

  function handleUpVoteThread({ threadId, upVotesBy, downVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteThreadError('You must be signed in to upvote thread!');
      return false;
    }

    // check, if signed in user not upvote yet
    if (!upVotesBy.includes(authUser.id)) {
      // check, if signed in user has downvoted
      let isDownVoted = false;
      if (downVotesBy.includes(authUser.id)) isDownVoted = true;

      dispatch(asyncUpVoteThread({ threadId, isDownVoted }));
    } else {
      dispatch(asyncNeutralVoteThread({ threadId, target: 'up-vote' }));
    }

    return true;
  }

  function handleDownVoteThread({ threadId, downVotesBy, upVotesBy }) {
    // if user is not sign in yet
    if (authUser === null) {
      setVoteThreadError('You must be signed in to downvote thread!');
      return false;
    }

    // check, if signed in user not downvote yet
    if (!downVotesBy.includes(authUser.id)) {
      // check, if signed in user has upvoted
      let isUpVoted = false;
      if (upVotesBy.includes(authUser.id)) isUpVoted = true;

      dispatch(asyncDownVoteThread({ threadId, isUpVoted }));
    } else {
      dispatch(asyncNeutralVoteThread({ threadId, target: 'down-vote' }));
    }

    return true;
  }

  function handleCategoryChange(e) {
    dispatch(setCategoryActionCreator(e.target.value));
  }

  useEffect(() => {
    dispatch(asyncPopulateUsersThreadsAndCategories());
  }, [dispatch]);

  let threadsList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
  }));

  // if category selected != all
  if (categories.selected !== 'all') {
    threadsList = threadsList.filter((thread) => thread.category === categories.selected);
  }

  return (
    <>
      <header className="forum-header">
        <div className="d-flex align-items-start">
          <h1 className="fs-3 fw-bold text-secondary-emphasis me-auto mb-0">Threads</h1>
          {authUser !== null && (
            <Link to="/create" className="btn btn-dark">Create Thread</Link>
          )}
        </div>
        <div className="d-flex mt-3 align-items-start flex-wrap">
          <ThreadsFilter
            threadsLength={threads.length}
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </header>
      <ThreadsList
        threads={threadsList}
        onUpVote={handleUpVoteThread}
        onDownVote={handleDownVoteThread}
      />
      {voteThreadError && (
        <div className="position-fixed bottom-0 end-0 p-5 pb-0 fixed-alert">
          <Alert message={voteThreadError} onClose={resetVoteThreadErrorState} type="info" />
        </div>
      )}
    </>
  );
}

export default HomePage;
