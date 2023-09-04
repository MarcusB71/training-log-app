import React from 'react';
import '../styles/ExercisePopup.css';
const ExercisePopup = ({ showPopup, onSave, onCancel, setNewExercise }) => {
  const handleInputChange = (e) => {
    setNewExercise(e.target.value);
  };

  return (
    showPopup && (
      <div className="popup-container">
        <div className="popup-content">
          <h3>Add New Exercise</h3>
          <input
            className="input-group-text"
            type="text"
            placeholder="Enter Exercise"
            onChange={handleInputChange}
          />
          <button className="btn btn-light" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-light" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    )
  );
};

export default ExercisePopup;
