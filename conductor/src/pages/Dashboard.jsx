import React from 'react';
import { useNavigate } from 'react-router-dom';
import gradient from '../assets/gradient.svg';
import Navbar from '../components/Navbar';
import { db } from '../firebase/firebase';
import { onValue, ref } from 'firebase/database';

const Dashboard = () => {
  const navigate = useNavigate();

  const [passengers, setPassengers] = React.useState([]);

  React.useEffect(() => {
    let res = [];
    onValue(ref(db), (snapshot) => {
      setPassengers([]);

      const data = snapshot.child('users').val();
      setPassengers(data);
    });
  }, []);

  return (
    <div>
      <div className='relative'>
        <img
          className='absolute top-0 left-0 w-full z-0'
          src={gradient}
          alt='gradient_backdrop'
        />
        <Navbar />

        {/* location */}
        <div className='px-10 relative'>
          <div>
            <h1 className='text-xl font-medium mb-6'>Upcoming Passengers</h1>
            {passengers.map((ele) => {
              return !ele.paid ? (
                <div className='bg-gray-50 border mt-3 border-cyan-300 flex justify-between text-sm rounded-xl p-4'>
                  <span>
                    {ele.name} x {ele.passengers}
                  </span>
                  <span
                    className={`${
                      ele.paid ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {ele.amount}
                  </span>
                </div>
              ) : (
                <div className='bg-gray-50 border mt-3 border-cyan-300 flex justify-between text-sm rounded-xl p-4'>
                  No people here yet
                </div>
              );
            })}
          </div>
        </div>

        <div className='px-10 relative'>
          <div>
            <h1 className='text-xl font-medium mb-6 mt-16'>
              Boarded Passengers
            </h1>
            {passengers.map((ele) => {
              return ele.paid ? (
                <div className='bg-gray-50 border mt-3 border-cyan-300 flex justify-between text-sm rounded-xl p-4'>
                  <span>
                    {ele.name} x {ele.passengers}
                  </span>
                  <span
                    className={`${
                      ele.paid ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {ele.amount}
                  </span>
                </div>
              ) : (
                <div className='bg-gray-50 border mt-3 border-cyan-300 flex justify-between text-sm rounded-xl p-4'>
                  No people here yet
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='absolute bottom-5 px-5 w-full'>
        <button
          onClick={() => navigate('/scan')}
          className=' border bg-black text-white outline-none w-full p-4 rounded-xl text-lg'
        >
          Scan ticket
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
