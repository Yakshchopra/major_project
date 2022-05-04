import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking';
import BusDetails from './pages/BusDetails';
import Dasboard from './pages/Dasboard';
import Home from './pages/Home';
import Wallet from './pages/Wallet';

function App() {
  const [activeBus, setActiveBus] = React.useState({
    bus: 'WB05C',
    eta: 15,
    from: 'Jammu',
    to: 'Udhampur',
    totalSeats: 50,
    seatsLeft: 20,
    price: 100,
    busStatus: 'Good',
    coordinates: [],
    isArrived: false,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/dashboard'
          element={<Dasboard active={activeBus} setBus={setActiveBus} />}
        />
        <Route
          path='/details'
          element={<BusDetails active={activeBus} setBus={setActiveBus} />}
        />
        <Route
          path='/booking'
          element={<Booking active={activeBus} setBus={setActiveBus} />}
        />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
