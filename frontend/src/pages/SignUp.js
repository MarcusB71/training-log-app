import React from 'react';
import SignUpForm from '../components/SignUpForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignUp = () => {
  return (
    <div className="page-container">
      <Navbar activeClass={'signup'}></Navbar>
      <SignUpForm></SignUpForm>
      <Footer></Footer>
    </div>
  );
};

export default SignUp;
