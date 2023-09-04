import React from 'react';
import CSVGenerator from '../components/CSVGenerator';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Import = () => {
  return (
    <div className="page-container">
      <Navbar activeClass="import"></Navbar>
      <div className="csvContainer content">
        <h1>Import Training Data</h1>
        <p>
          Click the button to upload your previous training data as a CSV file.
        </p>
        <p>note: the CSV file must maintain its original formatting </p>
        <CSVGenerator></CSVGenerator>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Import;
