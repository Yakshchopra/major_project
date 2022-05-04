import React from 'react';
import Nav from '../components/Nav';
import map from '../assets/map.svg';
import Button from '../components/Button';
import { useNavigate } from 'react-router';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-screen overflow-hidden p-10'>
      {/* Navbar */}
      <Nav setSelect={''} select='' type='landing' />

      {/* content */}
      <div className='flex w-11/12 gap-32 px-20 mx-auto h-full items-center justify-center'>
        <div className='text-content w-1/2 -mt-4'>
          <h1 className='text-5xl font-bold'>We'll take you places</h1>
          <h4 className='text-secondary mt-6 text-3xl font-light'>
            Anytime, Anywhere.
          </h4>
          <p className='text-2xl text-gray-500 mt-6 font-light'>
            Bring home the convinience of safe and convinient rides to every
            destination
          </p>
          <div className='mt-12'>
            <Button text='Get Started' onClick={() => navigate('/dashboard')} />
          </div>
        </div>

        <div className='map-image w-1/2 h-full relative'>
          <img
            src={map}
            alt='map'
            className='w-full rounded-2xl h-5/6 my-auto object-cover -mt-6 absolute top-1/2 left-0 transform -translate-y-1/2'
          />
        </div>
        {/* Map-Image */}
      </div>
    </div>
  );
};

export default Landing;
