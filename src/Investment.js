// src/Investment.js
import React, { useState, useEffect } from 'react';
import './MonthlyExpenses.css';

const Investment = () => {
  const [investments, setInvestments] = useState(JSON.parse(localStorage.getItem('investments')) || [{ target: '', amount: 0 }]);

  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments));
  }, [investments]);

  const handleInvestmentChange = (index, field, value) => {
    const newInvestments = [...investments];
    newInvestments[index][field] = value;
    setInvestments(newInvestments);
  };

  const addInvestment = () => {
    setInvestments([...investments, { target: '', amount: 0 }]);
  };

  const totalInvestment = investments.reduce((total, item) => total + Number(item.amount), 0);

  return (
    <div>
      <h1>Monthly Investment</h1>
      <table>
        <thead>
          <tr>
            <th>Investment Target</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((item, index) => (
            <tr key={index}>
              <td><input type="text" value={item.target} onChange={(e) => handleInvestmentChange(index, 'target', e.target.value)} /></td>
              <td><input type="number" value={item.amount} onChange={(e) => handleInvestmentChange(index, 'amount', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addInvestment}>Add Investment</button>
      <p>Total Investment: {totalInvestment}</p>
    </div>
  );
};

export default Investment;
