import React from 'react';
import Nav from '../components/Nav';

const Bus = () => {
  return (
    <div className='h-screen w-screen overflow-hidden p-10'>
      <Nav type='bus' select={''} setSelect={''} />
    </div>
  );
};

export default Bus;
