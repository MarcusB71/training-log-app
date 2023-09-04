import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import ExercisePopup from './ExercisePopup';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ExerciseForm.css';
import DisplayLogs from './DisplayLogs';
const ExerciseForm = () => {
  //default list of exercises (User will be able to add to it)
  const initialExerciseList = ['Squat', 'Bench Press', 'Deadlift'];

  //date display options
  const dateOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  };
  //default form data
  const initialFormData = {
    exercise: '',
    weight: '',
    sets: 0,
    reps: 0,
    notes: '',
  };
  //display hooks
  const [showForm, setShowForm] = useState(false);
  const [displayCal, setCalVisible] = useState(true);
  const [displayLog, setLogVisible] = useState(false);
  //form data member hooks
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState(initialFormData);
  //exercise list hooks
  const [showPopup, setShowPopup] = useState(false);
  const [exerciseList, setExerciseList] = useState(initialExerciseList);
  const [newExercise, setNewExercise] = useState('');

  //event handlers
  const handleConfirm = () => {
    setCalVisible(false);
    setShowForm(true);
    setLogVisible(true);
  };
  const handleReturn = () => {
    setCalVisible(true);
    setShowForm(false);
    setLogVisible(false);
  };
  const handleSaveExercise = () => {
    if (newExercise.trim !== '') {
      setNewExercise('');
      setExerciseList((exerciseList) => [...exerciseList, newExercise]);
    }
    setShowPopup(false);
  };
  const handleCancelExercise = () => {
    setNewExercise('');
    setShowPopup(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.log('onchange formdata:');
    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('onsubmit formdata:');
    console.log(formData);
    //try saving formData to local storage
    try {
      const commonDate = date.toISOString().split('T')[0];
      formData.date = commonDate;
      const existingFormData =
        JSON.parse(localStorage.getItem('formData')) || [];
      //Main Data Structure for Form Data {key:[{},{}], key:[{}]}
      const updatedFormData = {
        ...existingFormData,
        [commonDate]: [...(existingFormData[commonDate] || []), formData],
      };
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      setFormData(initialFormData);
      console.log('Form data saved to local storage');
    } catch (error) {
      console.error('Error saving form data to local storage', error);
    }
    try {
      const existingExercises =
        JSON.parse(localStorage.getItem('exerciseList')) || [];
      const updatedExerciseList = {
        ...existingExercises,
        newExercise,
      };
      localStorage.setItem('exerciseList', JSON.stringify(updatedExerciseList));
    } catch (error) {
      console.error('Error retrieving exerciseList from local storage', error);
    }
  };

  return (
    <>
      <div className="container text-center">
        {displayCal && (
          <div className="calendarContainer">
            <h2 className="formH2">Todays Workout</h2>
            <DatePicker
              selected={date}
              onChange={(datePicked) => setDate(datePicked)}
              inline
            />
            <button className="btn btn-light" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        )}
        {showForm && (
          <div>
            <div className="row justify-content-center">
              <div
                className="col-3"
                style={{ minWidth: '300px', maxWidth: '375px' }}
              >
                <form onSubmit={handleSubmit}>
                  <p
                    style={{
                      margin: '5px 0px 0px 0px',
                      fontSize: '20px',
                      fontWeight: 'bold',
                    }}
                  >
                    {date.toLocaleString('en-US', dateOptions)}
                  </p>
                  <div className="form-group mb-3">
                    <label
                      className="form-label"
                      style={{ display: 'block', padding: '7px 0px 0px 0px' }}
                      htmlFor="exercise"
                    >
                      Exercise:
                    </label>
                    <select
                      style={{ maxWidth: '200px' }}
                      className="form-select-sm"
                      id="exercise"
                      name="exercise"
                      value={formData.exercise}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select an exercise</option>
                      {exerciseList.map((exercise, index) => (
                        <option key={index} value={exercise}>
                          {exercise}
                        </option>
                      ))}
                    </select>
                    <div className="btn-group">
                      <button
                        type="button"
                        onClick={() => setShowPopup(true)}
                        className="btn btn-light"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        // onClick={() =>setShowDelPopup(true)}
                        className="btn btn-light"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label
                      className="form-label"
                      style={{ display: 'block' }}
                      htmlFor="weight"
                    >
                      Weight:
                    </label>
                    <input
                      className="form-control-sm text-center"
                      style={{
                        border: '1px solid black',
                        width: '30%',
                      }}
                      type="text"
                      placeholder="lb/kg"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label
                      style={{ display: 'block' }}
                      className="form-label"
                      htmlFor="sets"
                    >
                      Sets: {formData.sets}
                    </label>
                    <input
                      className="form-range"
                      type="range"
                      style={{ width: '80%' }}
                      min={0}
                      max={10}
                      id="sets"
                      name="sets"
                      value={formData.sets}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label
                      style={{ display: 'block' }}
                      className="form-label"
                      htmlFor="reps"
                    >
                      Reps: {formData.reps}
                    </label>
                    <input
                      className="form-range"
                      type="range"
                      style={{ width: '80%' }}
                      min={0}
                      max={20}
                      id="reps"
                      name="reps"
                      value={formData.reps}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="notes"></label>
                    <textarea
                      type="text"
                      placeholder="Enter notes here..."
                      style={{ fontSize: '12px', resize: 'none', width: '80%' }}
                      className="form-control-lg"
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="btn-group returnSubmit">
                    <button
                      className="btn btn-light return"
                      onClick={handleReturn}
                    >
                      Return
                    </button>
                    <button className="btn btn-light submit" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
                <ExercisePopup
                  showPopup={showPopup}
                  onSave={handleSaveExercise}
                  onCancel={handleCancelExercise}
                  setNewExercise={setNewExercise}
                ></ExercisePopup>
              </div>
            </div>
          </div>
        )}{' '}
        {displayLog && <DisplayLogs curDate={date}></DisplayLogs>}
      </div>
    </>
  );
};
export default ExerciseForm;
