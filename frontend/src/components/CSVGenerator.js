import React from 'react';
import papa from 'papaparse';

const CSVGenerator = () => {
  const generateCSV = () => {
    const csvData = [];
    const data = JSON.parse(localStorage.getItem('formData')) || [];

    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        data[date].forEach((entry) => {
          const rowData = {
            Date: date,
            Exercise: entry.exercise,
            Weight: entry.weight,
            Sets: entry.sets,
            Reps: entry.reps,
            Notes: entry.notes,
          };
          csvData.push(rowData);
        });
      }
    }
    const csv = papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'excersise_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <button
        className="btn btn-success"
        style={{ margin: '0', padding: '10px', fontSize: '15px' }}
        onClick={generateCSV}
      >
        Download CSV
      </button>
    </>
  );
};

export default CSVGenerator;
