import React from 'react';
import CSVGenerator from '../components/CSVGenerator';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Export.css';
const Export = () => {
  return (
    <div className="page-container">
      <Navbar activeClass="export"></Navbar>
      <div className="csvContainer content">
        <h1>Export Training Data</h1>
        <p>Click the button to download your training data as a CSV file.</p>
        <CSVGenerator></CSVGenerator>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Export;
