import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function SignInInput({ onSignIn }) {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  function handleSubmit(e) {
    e.preventDefault();
    onSignIn({ email, password });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Your email..."
            onChange={handleEmailChange}
            value={email}
            id="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password..."
            onChange={handlePasswordChange}
            value={password}
            id="password"
            className="form-control"
          />
        </div>
        <button type="submit" name='submit' className="btn btn-primary w-100">Sign In</button>
      </form>
      <p className="text-center text-body-secondary mt-2">
        Don&apos;t have an account?
        <Link to="/register"> Register</Link>
      </p>
    </>
  );
}

SignInInput.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default SignInInput;
