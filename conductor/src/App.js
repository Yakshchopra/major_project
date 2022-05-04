import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/scan' element={<Scanner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
