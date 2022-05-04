import React, { useState } from 'react';
import Logo from '../assets/logo_dark.svg';
import gradient from '../assets/gradient.svg';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [busVal, setBusVal] = useState('');

  return (
    <div className='relative flex items-center justify-center h-screen'>
      <img
        src={gradient}
        className='absolute top-0 right-0 w-screen z-0'
        alt='backdrop_gradient'
      />
      {/* LogoBox */}
      <div className='relative -mt-16'>
        <img src={Logo} alt='shuttle_logo' className='mx-auto' />
        <p className='text-gray-500 text-xl text-center px-12 mt-10 font-light'>
          Bring home the convinience of safe and convinient rides to every
          destination
        </p>
      </div>

      <div className='absolute bottom-0 w-full left-0 p-8'>
        <input
          value={busVal}
          onChange={(e) => setBusVal(e.target.value)}
          className='p-4 mb-6 w-full border text-center bg-blue-100 outline-none focus:outline-none focus:ring focus:border-teal-100 rounded-xl mt-5'
          placeholder='Enter bus number'
        />
        <button
          onClick={() => navigate('/dashboard')}
          className=' border bg-black outline-none w-full p-4 text-white rounded-xl'
        >
          Sign in to console
        </button>
      </div>
    </div>
  );
};

export default Landing;
