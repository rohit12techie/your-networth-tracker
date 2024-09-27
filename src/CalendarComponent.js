// src/components/CalendarComponent/CalendarComponent.js
import React, { useState, useEffect } from 'react';
import './CalendarComponent.css';

const CalendarComponent = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const handleMonthClick = (monthIndex) => {
    const newDate = new Date(currentYear, monthIndex, 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="calendar-container">
      <div className="month-selector">
        {months.map((month, index) => (
          <div
            key={index}
            className={`month ${index === currentMonth ? 'current' : ''} ${index === selectedDate.getMonth() ? 'selected' : ''}`}
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
