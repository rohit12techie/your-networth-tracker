// src/MonthlyExpenses.js
import React, { useState, useEffect } from 'react';
import './MonthlyExpenses.css';

const MonthlyExpenses = () => {
  const referenceCashIn = [{ source: 'Salary', amount: 201694 }, { source: 'Kaushal', amount: 8000 }];
  const referenceCashOut = [{ source: 'Home EMI', amount: 77645 }, { source: 'Room Rent', amount: 26000 }, { source: 'SIP', amount: 48121 }, { source: 'CreditCard', amount: 52300 }, { source: 'Misc', amount: 10000 }];

  const [cashIn, setCashIn] = useState(JSON.parse(localStorage.getItem('cashIn')) || [{ source: '', amount: 0 }]);
  const [cashOut, setCashOut] = useState(JSON.parse(localStorage.getItem('cashOut')) || [{ source: '', amount: 0 }]);
  const [monthlyExpenses, setMonthlyExpenses] = useState(localStorage.getItem('monthlyExpenses') || 0);

  useEffect(() => {
    localStorage.setItem('cashIn', JSON.stringify(cashIn));
    localStorage.setItem('cashOut', JSON.stringify(cashOut));
    localStorage.setItem('monthlyExpenses', monthlyExpenses);
  }, [cashIn, cashOut, monthlyExpenses]);

  const handleCashInChange = (index, field, value) => {
    const newCashIn = [...cashIn];
    newCashIn[index][field] = value;
    setCashIn(newCashIn);
  };

  const handleCashOutChange = (index, field, value) => {
    const newCashOut = [...cashOut];
    newCashOut[index][field] = value;
    setCashOut(newCashOut);
  };

  const addCashIn = () => {
    setCashIn([...cashIn, { source: '', amount: 0 }]);
  };

  const addCashOut = () => {
    setCashOut([...cashOut, { source: '', amount: 0 }]);
  };

  const removeCashIn = (index) => {
    const newCashIn = cashIn.filter((_, i) => i !== index);
    setCashIn(newCashIn);
  };

  const removeCashOut = (index) => {
    const newCashOut = cashOut.filter((_, i) => i !== index);
    setCashOut(newCashOut);
  };

  const isAddCashInDisabled = cashIn[cashIn.length - 1].source === '' || cashIn[cashIn.length - 1].amount === 0;
  const isAddCashOutDisabled = cashOut[cashOut.length - 1].source === '' || cashOut[cashOut.length - 1].amount === 0;

  const totalCashIn = cashIn.reduce((total, item) => total + Number(item.amount), 0);
  const totalCashOut = cashOut.reduce((total, item) => total + Number(item.amount), 0) + Number(monthlyExpenses);
  const cashLeftInHand = totalCashIn - totalCashOut;

  return (
    <div>
      <h1>Financial Dashboard</h1>
      <div className="financial-sections">
        <div className="cash-section">
          <h2>Cash IN</h2>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cashIn.map((item, index) => (
                <tr key={index}>
                  <td><input type="text" placeholder={referenceCashIn[index]?.source || ''} value={item.source} onChange={(e) => handleCashInChange(index, 'source', e.target.value)} /></td>
                  <td><input type="number" placeholder={referenceCashIn[index]?.amount || 0} value={item.amount} onChange={(e) => handleCashInChange(index, 'amount', e.target.value)} /></td>
                  <td><button onClick={() => removeCashIn(index)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addCashIn} disabled={isAddCashInDisabled}>Add Cash In</button>
          <p>Total Cash IN: {totalCashIn}</p>
        </div>
        <div className="cash-section">
          <h2>Cash Out</h2>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cashOut.map((item, index) => (
                <tr key={index}>
                  <td><input type="text" placeholder={referenceCashOut[index]?.source || ''} value={item.source} onChange={(e) => handleCashOutChange(index, 'source', e.target.value)} /></td>
                  <td><input type="number" placeholder={referenceCashOut[index]?.amount || 0} value={item.amount} onChange={(e) => handleCashOutChange(index, 'amount', e.target.value)} /></td>
                  <td><button onClick={() => removeCashOut(index)}>X</button></td>
                </tr>
              ))}
              <tr>
                <td>Monthly Expenses</td>
                <td><input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
          <button onClick={addCashOut} disabled={isAddCashOutDisabled}>Add Cash Out</button>
          <p>Total Cash Out: {totalCashOut}</p>
        </div>
      </div>
      <div>
        <h2>Cash Left in Hand</h2>
        <p>{cashLeftInHand}</p>
      </div>
    </div>
  );
};

export default MonthlyExpenses;
