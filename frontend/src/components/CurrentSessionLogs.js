import React, { useEffect, useState } from 'react';
import '../styles/CurrentSessionLogs.css';
const CurrentSessionLogs = (curDate) => {
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
          {formDataArray.map((workout, index) => (
            <div key={index} className="log-entry">
              <div className="del-container">
                <p className="exercise">
                  {workout.exercise && workout.exercise}
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
                {workout.sets && workout.sets}
                {' x '}
                {workout.reps && workout.reps}

                {workout.weight && ` @ ${workout.weight} lb`}
              </p>
              {workout.notes && <p className="notes">{workout.notes}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>No data in local storage</p>
      )}
    </>
  );
};

export default CurrentSessionLogs;
