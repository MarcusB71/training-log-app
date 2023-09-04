import React, { useEffect, useState } from 'react';
import '../styles/DisplayLogs.css';
const DisplayLogs = (curDate) => {
  const dateOptions = {
    // weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };
  const [formDataArray, setFormDataArray] = useState([]);

  useEffect(() => {
    try {
      const commonDate = curDate.curDate.toISOString().split('T')[0];
      const formDataLocalStorage =
        JSON.parse(localStorage.getItem('formData')) || [];
      setFormDataArray(formDataLocalStorage[commonDate] || []);
    } catch (error) {
      console.error('error retrieving form data from local storage', error);
    }
  }, [curDate]);
  const handleDelete = (index) => {
    const commonDate = curDate.curDate.toISOString().split('T')[0];
    const existingFormData = JSON.parse(localStorage.getItem('formData')) || {};
    const updatedFormData = {
      ...existingFormData,
      [commonDate]: existingFormData[commonDate].filter((_, i) => i !== index),
    };

    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    setFormDataArray(updatedFormData[commonDate]);
  };
  return (
    <>
      <h2 className="logsHeading">Current Session</h2>
      {formDataArray.length > 0 ? (
        <div className="logs-container">
          <h4 className="date">
            {new Date(curDate.curDate).toLocaleString('en-US', dateOptions)}
          </h4>
          {formDataArray.map((formData, index) => (
            <div key={index} className="log-entry">
              <div className="del-container">
                <p className="exercise">
                  {formData.exercise && formData.exercise}
                </p>
                <button
                  className="btn btn-light"
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  x
                </button>
              </div>
              <p className="weight-sets-reps">
                {/* can use lb/kg here based on user settings instead of space */}
                {formData.weight && formData.weight}{' '}
                {formData.sets && formData.sets}
                {' x '}
                {formData.reps && formData.reps}
              </p>
              {formData.notes && <p className="notes">{formData.notes}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>No data in local storage</p>
      )}
    </>
  );
};

export default DisplayLogs;
