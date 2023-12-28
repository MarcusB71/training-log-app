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
    const clonedStartDate = new Date(startDate);
    const clonedEndDate = new Date(endDate);
    clonedStartDate.setHours(0, 0, 0, 0);
    clonedEndDate.setHours(23, 59, 59, 999);
    const filteredData = {};
    for (const date in formData) {
      const currentDate = new Date(date);
      if (currentDate >= clonedStartDate && currentDate <= clonedEndDate) {
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
  const onCalChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div>
      <h2 className="formH2">Select Date Range</h2>
      <DatePicker
        selected={startDate}
        onChange={onCalChange}
        inline
        selectsRange
        startDate={startDate}
        endDate={endDate}
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
              {new Date(date).toLocaleString('en-us', dateOptions)}
            </h4>
            {Object.entries(sortedFilteredData[date]).map(
              ([exercise, setInfoArr]) => (
                <div key={exercise} className="log-entry">
                  <p
                    className="exerciseMonthly"
                    style={{
                      fontWeight: 'bold',
                      color: '#333',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      maxWidth: 'inherit',
                    }}
                  >
                    {exercise}
                  </p>
                  {setInfoArr.map((setInfo, index) => (
                    <div key={index}>
                      <div
                        className="weight-sets-reps"
                        style={{ textAlign: 'left' }}
                      >
                        <p className=" mb-0">
                          {setInfo.sets && setInfo.sets}
                          {'x'}
                          {setInfo.reps && setInfo.reps}
                          {setInfo.weight && ` @ ${setInfo.weight} lb`}
                        </p>
                      </div>
                      {setInfo.notes && (
                        <div style={{ textAlign: 'left' }}>
                          <p className="notes">{setInfo.notes}</p>{' '}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayLogsInRange;
