import React from 'react';
import CSVImport from '../components/CSVImport';
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
        <p>
          note: the CSV file must maintain its original formatting from{' '}
          <a href="/Export">Export page</a> and will overwrite your apps
          currently saved data
        </p>
        <CSVImport></CSVImport>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Import;
