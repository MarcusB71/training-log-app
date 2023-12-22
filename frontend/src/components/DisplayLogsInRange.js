import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import '../styles/DisplayLogsInRange.css';
const DisplayLogsInRange = () => {
  //date display options
  const dateOptions = {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [displayH1, setDisplayH1] = useState(false);

  const filterDataByDateRange = () => {
    setDisplayH1(true);
    const formData = JSON.parse(localStorage.getItem('formData')) || [];
    const commonStartDate = startDate.toISOString().split('T')[0];
    const commonEndDate = endDate.toISOString().split('T')[0];
    const filteredData = {};
    for (const date in formData) {
      if (date >= commonStartDate && date <= commonEndDate) {
        filteredData[date] = formData[date];
      }
    }
    sortDataByDate(filteredData);
  };

  const sortDataByDate = (filteredData) => {
    const sortedData = Object.keys(filteredData).sort((a, b) =>
      a.localeCompare(b)
    );
    const sortedFilteredData = {};
    for (const date of sortedData) {
      sortedFilteredData[date] = filteredData[date];
    }
    setSortedFilteredData(sortedFilteredData);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
        popperPlacement="top"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        popperPlacement="top"
      />
      <button
        className="btn btn-light"
        style={{ margin: '10px 0px 15px 0px' }}
        onClick={() => {
          filterDataByDateRange();
        }}
      >
        Filter
      </button>
      {displayH1 && <h1>Workouts In Range</h1>}
      <div className="workout-card-container">
        {Object.keys(sortedFilteredData).map((date) => (
          <div key={date} className="workout-card">
            <h4 className="date">
              {new Date(
                new Date(date + 'T00:00:00Z').getTime() -
                  new Date(date + 'T00:00:00Z').getTimezoneOffset() * 60000
              ).toLocaleString('en-us', dateOptions)}
            </h4>
            {sortedFilteredData[date].map((workout, index) => (
              <div key={index}>
                <div className="log-entry">
                  <p
                    className="exerciseMonthly"
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      maxWidth: '240px',
                    }}
                  >
                    {workout.exercise && workout.exercise}
                  </p>
                  <p className="weight-sets-reps">
                    {workout.sets && workout.sets}
                    {' x '}
                    {workout.reps && workout.reps}

                    {workout.weight && ` @ ${workout.weight} lb`}
                  </p>
                  {workout.notes && <p className="notes">{workout.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayLogsInRange;
