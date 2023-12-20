import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DisplayLogsInRange from '../components/DisplayLogsInRange';
function Logs() {
  return (
    <div className="page-container">
      <Navbar activeClass={'logs'}></Navbar>
      <div className="container content">
        <DisplayLogsInRange></DisplayLogsInRange>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Logs;
