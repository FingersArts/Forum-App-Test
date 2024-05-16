import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navigation({ onSignOut }) {
  const authUser = useSelector((states) => states.authUser);
  const location = useLocation();

  function isNavLinkActive(path) {
    const browserPath = location.pathname;

    if (path === browserPath) return 'active';
    return '';
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-10">
        <nav className="navbar navbar-expand-sm py-3">
          <Link className="navbar-brand" to="/">
            <img src="/logo.svg" alt="Forum App" width="30" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
              <li className="nav-item">
                <Link className={`nav-link ${isNavLinkActive('/')}`} to="/">Threads</Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isNavLinkActive('/leaderboards')}`}
                  to="/leaderboards"
                >
                  Leaderboards
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
              <li className="nav-item dropdown">
                {(authUser === null) ? (
                  <Link to="/signin" className="nav-link">Sign In</Link>
                ) : (
                  <>
                    <button
                      type="button"
                      className="nav-link dropdown-toggle py-1 px-0 profile"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={authUser.avatar} width="30" alt={authUser.name} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end mt-2">
                      <li>
                        <button type="submit" onClick={onSignOut} className="dropdown-item">Logout</button>
                      </li>
                    </ul>
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
