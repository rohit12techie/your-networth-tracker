// src/Investment.js
import React, { useState, useEffect } from 'react';
import './Investment.css';

const Investment = () => {
  const referenceInvestments = [{ source: 'Stocks', amount: 50000 }, { source: 'Mutual Funds', amount: 30000 }];

  const [investments, setInvestments] = useState(JSON.parse(localStorage.getItem('investments')) || [{ source: '', amount: 0 }]);

  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments));
  }, [investments]);

  const handleInvestmentChange = (index, field, value) => {
    const newInvestments = [...investments];
    newInvestments[index][field] = value;
    setInvestments(newInvestments);
  };

  const addInvestment = () => {
    setInvestments([...investments, { source: '', amount: 0 }]);
  };

  const removeInvestment = (index) => {
    const newInvestments = investments.filter((_, i) => i !== index);
    setInvestments(newInvestments);
  };

  const isAddInvestmentDisabled = investments[investments.length - 1].source === '' || investments[investments.length - 1].amount === 0;

  const totalInvestment = investments.reduce((total, item) => total + Number(item.amount), 0);

  return (
    <div>
      <h1>Monthly Investment</h1>
      <div className="investment-section">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((item, index) => (
              <tr key={index}>
                <td><input type="text" placeholder={referenceInvestments[index]?.source || ''} value={item.source} onChange={(e) => handleInvestmentChange(index, 'source', e.target.value)} /></td>
                <td><input type="number" placeholder={referenceInvestments[index]?.amount || 0} value={item.amount} onChange={(e) => handleInvestmentChange(index, 'amount', e.target.value)} /></td>
                <td><button onClick={() => removeInvestment(index)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addInvestment} disabled={isAddInvestmentDisabled}>Add Investment</button>
        <p>Total Investment: {totalInvestment}</p>
      </div>
    </div>
  );
};

export default Investment;
