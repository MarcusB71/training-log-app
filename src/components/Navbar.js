import React from 'react';

import '../styles/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function Navbar({ activeClass }) {
  console.log(activeClass);
  return (
    <>
      <nav class="navbar sticky-top navbar-expand-md navbar-dark bg-dark  ">
        <div class="container-md">
          <a class="navbar-brand" href="/">
            <img
              src="https://cdn.pixabay.com/photo/2023/03/06/20/45/heart-7834272_1280.jpg"
              alt="LOGO"
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class={
                    activeClass === 'home' ? 'nav-link active' : 'nav-link'
                  }
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    activeClass === 'export' ? 'nav-link active' : 'nav-link'
                  }
                  href="Export"
                >
                  Export
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    activeClass === 'import' ? 'nav-link active' : 'nav-link'
                  }
                  href="Import"
                >
                  Import
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    activeClass === 'logs' ? 'nav-link active' : 'nav-link'
                  }
                  href="Logs"
                >
                  Logs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
