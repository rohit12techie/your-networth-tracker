// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import MonthlyExpenses from './MonthlyExpenses';
import Investment from './Investment';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expenses" element={<MonthlyExpenses />} />
            <Route path="/investment" element={<Investment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


