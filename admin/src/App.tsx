import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bus from './pages/Bus';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/busdetails' element={<Bus />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
