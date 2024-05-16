import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncPreloadProccess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import CreateThreadPage from './pages/CreateThreadPage';
import DetailThreadPage from './pages/DetailThreadPage';
import LearderboardsPage from './pages/LearderboardsPage';

export default function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProccess());
  }, [dispatch]);

  function handleSignOut(e) {
    e.preventDefault();

    dispatch(asyncUnsetAuthUser());
  }

  if (isPreload) return <Loading />;

  return (
    <>
      <Loading />
      <div className="container-fluid">
        <Routes>
          {(authUser === null) && (
            <>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          )}
          <Route path="/*" element={<Layout onSignOut={handleSignOut} />}>
            <Route index="true" element={<HomePage />} />
            <Route path="create" element={<CreateThreadPage />} />
            <Route path="threads/:threadId" element={<DetailThreadPage />} />
            <Route path="leaderboards" element={<LearderboardsPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
