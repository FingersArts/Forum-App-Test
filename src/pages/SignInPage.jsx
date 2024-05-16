import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignInInput from '../components/SignInInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import Alert from '../components/Alert';

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signInError, setSignInError] = useState(null);

  function handleSignIn({ email, password }) {
    dispatch(asyncSetAuthUser({ email, password }))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setSignInError(error.message);
      });
  }

  function resetSignInErrorState() {
    setSignInError(null);
  }

  return (
    <main className="py-5">
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3">
          <h1>Sign In/Log In</h1>
          {signInError && <Alert message={signInError} onClose={resetSignInErrorState} />}
          <SignInInput onSignIn={handleSignIn} />
        </div>
      </div>
    </main>
  );
}
