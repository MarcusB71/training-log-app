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
  const [runEffect, setRunEffect] = useState(new Date());
  useEffect(() => {
    try {
      const commonDate = curDate.curDate.toLocaleDateString('en-US');
      const formDataLocalStorage =
        JSON.parse(localStorage.getItem('formData')) || [];
      setFormDataArray(formDataLocalStorage[commonDate] || []);
    } catch (error) {
      console.error('error retrieving form data from local storage', error);
    }
  }, [curDate, runEffect]);
  const handleDelete = (date, exerciseIndex, logIndex) => {
    const existingFormData = JSON.parse(localStorage.getItem('formData')) || {};
    const updatedFormData = {
      ...existingFormData,
      [date]: {
        ...(existingFormData[date] || {}),
        [exerciseIndex]: [...(existingFormData[date]?.[exerciseIndex] || [])],
      },
    };
    // Remove specified log from the exercise array
    updatedFormData[date][exerciseIndex] = updatedFormData[date][
      exerciseIndex
    ].filter((_, index) => index !== logIndex);
    // If no logs left, remove the exercise key
    if (updatedFormData[date][exerciseIndex].length === 0) {
      delete updatedFormData[date][exerciseIndex];
    }
    // If no exercises left, remove the date key
    if (Object.keys(updatedFormData[date]).length === 0) {
      delete updatedFormData[date];
    }
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    setFormDataArray(updatedFormData);
    setRunEffect(new Date());
  };
  return (
    <>
      <h2 className="logsHeading">Current Session</h2>
      {Object.keys(formDataArray).some(
        (exercise) => formDataArray[exercise].length > 0
      ) ? (
        <div className="logs-container">
          <h4 className="date">
            {new Date(curDate.curDate).toLocaleString('en-US', dateOptions)}
          </h4>
          {Object.entries(formDataArray).map(([exercise, setInfoArr]) => (
            <div key={exercise} className="log-entry">
              <div>
                <p
                  className="exercise"
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {exercise}
                </p>
              </div>
              {setInfoArr.map((setInfo, index) => (
                <div key={index}>
                  <div className="del-container">
                    <p className="weight-sets-reps mb-0">
                      {setInfo.sets && setInfo.sets}
                      {'x'}
                      {setInfo.reps && setInfo.reps}
                      {setInfo.weight && ` @ ${setInfo.weight} lb`}
                    </p>
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        handleDelete(
                          curDate.curDate.toLocaleDateString('en-US'),
                          exercise,
                          index
                        );
                      }}
                    >
                      x
                    </button>
                  </div>
                  {setInfo.notes && (
                    <div style={{ textAlign: 'left' }}>
                      <p className="notes">{setInfo.notes}</p>
                    </div>
                  )}
                </div>
              ))}
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
