import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
const Login = () => {
  return (
    <div className="page-container">
      <Navbar activeClass={'login'}></Navbar>
      <div className="content">
        <LoginForm></LoginForm>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
