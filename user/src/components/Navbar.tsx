import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menu from '../assets/menu.svg';
import { useStateValue } from '../store/stateProvider';

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  const { name, email } = user;

  const Navigate = useNavigate();

  const [userName, setUserName] = useState('');

  useEffect(() => {
    let res = localStorage.getItem('userName') as any;
    let data = JSON.parse(res);

    let firstName = data.name.split(' ');
    setUserName(firstName[0]);
  }, []);

  return (
    <div className='flex items-center justify-between'>
      <div className='pl-10 relative'>
        <h6 className=' text-xl font-medium'>Hi {userName}</h6>
        <p className=' font-light text-gray-600'>Glad to see you here!</p>
      </div>
      <img
        src={menu}
        alt='menu'
        onClick={() => Navigate('/wallet')}
        className='relative cursor-pointer h-36 transform translate-y-5'
      />
    </div>
  );
};

export default Navbar;
