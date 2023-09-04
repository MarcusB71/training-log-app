import React from 'react';
import '../styles/Globals.css';
import ExerciseForm from '../components/ExerciseForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function Home() {
  return (
    <div className="page-container">
      <Navbar activeClass={'home'}></Navbar>
      <div className="content">
        <ExerciseForm></ExerciseForm>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Home;
