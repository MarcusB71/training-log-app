import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar({ activeClass }) {
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    try {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email);
    } catch {
      console.log('no email in localstorage');
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail('');
  };
  //implement something like the following
  // <Link href="/">
  //   <Nav.Link passHref legacyBehavior>
  //     abc
  //   </Nav.Link>
  // </Link>;
  console.log('nav active class:', activeClass);
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark  ">
        <div className="container-md">
          <a className="navbar-brand" href="/">
            <img
              src="https://cdn.pixabay.com/photo/2023/03/06/20/45/heart-7834272_1280.jpg"
              alt="LOGO"
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={
                    activeClass === 'home' ? 'nav-link active' : 'nav-link'
                  }
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    activeClass === 'logs' ? 'nav-link active' : 'nav-link'
                  }
                  href="Logs"
                >
                  Logs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    activeClass === 'export' ? 'nav-link active' : 'nav-link'
                  }
                  href="Export"
                >
                  Export
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    activeClass === 'import' ? 'nav-link active' : 'nav-link'
                  }
                  href="Import"
                >
                  Import
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {userEmail ? (
                <li
                  className="nav-item dropdown"
                  style={{ marginRight: '25px' }}
                >
                  <button
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userEmail}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-left"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/settings">
                        Settings
                      </a>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      href="Login"
                      className={
                        activeClass === 'login' ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="Signup"
                      className={
                        activeClass === 'signup'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      Sign up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
