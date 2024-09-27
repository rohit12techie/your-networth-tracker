// src/components/Home/Home.js
import React, { useState, useEffect } from 'react';
import CalendarComponent from './CalendarComponent';
import './Home.css';

const Home = () => {
  const [cashIn, setCashIn] = useState(JSON.parse(localStorage.getItem('cashIn')) || []);
  const [cashOut, setCashOut] = useState(JSON.parse(localStorage.getItem('cashOut')) || []);
  const [monthlyExpenses, setMonthlyExpenses] = useState(localStorage.getItem('monthlyExpenses') || 0);
  const [investments, setInvestments] = useState(JSON.parse(localStorage.getItem('investments')) || []);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Load data based on selectedDate
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
  },[selectedDate]);

  const totalCashIn = cashIn.reduce((total, item) => total + Number(item.amount), 0);
  const totalCashOut = cashOut.reduce((total, item) => total + Number(item.amount), 0) + Number(monthlyExpenses);
  const cashLeftInHand = totalCashIn - totalCashOut;
  const totalInvestment = investments.reduce((total, item) => total + Number(item.amount), 0);
  const netWorth = cashLeftInHand + totalInvestment;

  return (
    <div className="home-container">
      <CalendarComponent onDateChange={setSelectedDate} />
      <h1>Net Worth</h1>
      <div className="net-worth">
        <p>Total Cash Left in Hand: ₹{cashLeftInHand}</p>
        <p>Total Investment: ₹{totalInvestment}</p>
        <h2>Net Worth: ₹{netWorth}</h2>
      </div>
    </div>
  );
};

export default Home;
