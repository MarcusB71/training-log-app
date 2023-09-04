import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DisplayLogs from '../components/DisplayLogs';
function Logs() {
  return (
    <div className="page-container">
      <Navbar activeClass={'logs'}></Navbar>
      <div className="container content">
        <DisplayLogs curDate={new Date()}></DisplayLogs>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Logs;
