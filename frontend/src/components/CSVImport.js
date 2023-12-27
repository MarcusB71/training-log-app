import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};
function CSVImport() {
  const notifySuccess = () => toast.success('Data successfully imported!');
  const notifyError = () => toast.error('Data import failed.');
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          Papa.parse(e.target.result, {
            complete: function (result) {
              const importedData = result.data;
              const reformattedData = {};
              importedData.forEach((entry) => {
                const lowercaseEntry = Object.fromEntries(
                  Object.entries(entry).map(([key, value]) => [
                    key.toLowerCase(),
                    value,
                  ])
                );
                const { date, exercise, ...rest } = lowercaseEntry;
                // const { Date, Exercise, ...rest } = entry;
                if (!reformattedData[date]) {
                  reformattedData[date] = {};
                }
                if (!reformattedData[date][exercise]) {
                  reformattedData[date][exercise] = [];
                }
                reformattedData[date][exercise].push({
                  exercise,
                  ...rest,
                  date,
                });
              });
              console.log(reformattedData);
              localStorage.setItem('formData', JSON.stringify(reformattedData));
              console.log('Data imported successfully:', reformattedData);
              notifySuccess();
            },
            header: true, // CSV file has a header row
          });
        } catch (error) {
          console.error('Error parsing imported data:', error);
          notifyError();
        }
      };
      // Read the file as text
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click to select a file</p>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default CSVImport;
