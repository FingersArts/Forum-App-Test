import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';
import Alert from '../components/Alert';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerError, setRegisterError] = useState(null);

  function handleRegister({ name, email, password }) {
    dispatch(asyncRegisterUser({ name, email, password }))
      .then(() => {
        navigate('/signin');
      }).catch((error) => {
        setRegisterError(error.message);
      });
  }

  function resetRegisterErrorState() {
    setRegisterError(null);
  }

  return (
    <main className="py-5">
      <div className="row justify-content-center">
        <div className="col-6 col-lg-3">
          <h1 className="mb-4">Register</h1>
          {registerError && <Alert message={registerError} onClose={resetRegisterErrorState} />}
          <RegisterInput onRegister={handleRegister} />
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
