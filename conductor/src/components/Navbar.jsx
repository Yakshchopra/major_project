import React from 'react';
import menu from '../assets/menu.svg';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='pl-10 relative'>
        <h6 className=' text-xl font-medium'>Hi Yaksh</h6>
        <p className=' font-light text-gray-600'>Glad to see you here!</p>
      </div>
      <img
        src={menu}
        alt='menu'
        className='relative h-36 transform translate-y-5'
      />
    </div>
  );
};

export default Navbar;
