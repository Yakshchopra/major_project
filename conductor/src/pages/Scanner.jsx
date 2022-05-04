import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import gradient from '../assets/gradient.svg';
import Navbar from '../components/Navbar';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';

const Scanner = () => {
  const [details, setDetails] = useState('init');
  let res = '';
  const previewStyle = {
    height: '100%',
    width: '100%',
  };

  const navigate = useNavigate();

  const handleCHange = () => {
    update(ref(db, `/busses/WB05C`), {
      bus: 'WB05C',
      coordinates: [74.859375, 32.705408],
      from: 'Potheri',
      location: 'Guduvanchery',
      isClose: false,
      key: 1,
      passengers: 2,
      price: 100,
      speed: 30,
      status: 'Good',
      to: 'Tambram',
      voilations: 1,
    });
  };

  const handleSubmitChange = () => {
    update(ref(db, `/users/0`), {
      amount: 200,
      email: '',
      name: 'Yaksh Chopra',
      paid: true,
      passengers: 2,
      wallet: 300,
    });
    navigate('/dashboard');
  };

  return (
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
          <h1 className='text-xl font-medium'>Scan the OR code</h1>
          <div className='rounded-xl relative bg-black h-72 overflow-hidden w-full p-4 mt-5'>
            <QrReader
              className='absolute h-full w-full -top-3 left-0'
              constraints={{ facingMode: 'environment' }}
              onError={() => alert('Err')}
              onResult={async (result) => {
                if (result) {
                  alert(result);
                  res = result;
                  await handleSubmitChange();
                  await handleCHange();
                }
              }}
            />
          </div>

          <h1 className='text-xl font-medium mt-8'>Passenger Details</h1>
          {res}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
