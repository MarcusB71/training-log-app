import React from 'react';
import '../styles/DelExercisePopup.css';
const DelExercisePopup = ({
  setShowDelPopup,
  handleDeleteExercise,
  showDelPopup,
  exerciseList,
}) => {
  console.log('exerciselist:', exerciseList);
  return (
    showDelPopup && (
      <div className="popup-container">
        <div className="popup-content scroll-container">
          <h3>Delete Exercise</h3>
          {exerciseList.map((exercise, index) => (
            <div className="exercise-container" key={index}>
              <label className="exercise-label">{exercise}</label>
              <button
                className="btn btn-light"
                onClick={() => handleDeleteExercise(index)}
              >
                x
              </button>
            </div>
          ))}
          <button
            className="btn btn-light mt-3"
            onClick={() => setShowDelPopup(false)}
          >
            Done
          </button>
        </div>
      </div>
    )
  );
};

export default DelExercisePopup;
