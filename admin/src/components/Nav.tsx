import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shuttle from '../assets/shuttle.svg';
import Button from './Button';

interface propType {
  type: string;
  setSelect: any;
  select: any;
}

const Nav = (props: any) => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between'>
      <Link to={'/'}>
        <img
          src={shuttle}
          className='h-8 cursor-pointer'
          draggable={false}
          alt='shuttle-logo'
        />
      </Link>

      {/* Dashboard content */}
      {props.type === 'dashboard' && (
        <>
          <div className='flex items-center gap-12'>
            <span
              onClick={() => navigate('/dashboard')}
              className='relative cursor-pointer'
            >
              Dashboard
              {props.select === 'list' && (
                <div className='absolute bg-secondary h-1 rounded-2xl w-3/4'></div>
              )}
            </span>
            <span
              className='relative cursor-pointer'
              onClick={() => props.setSelect('notice')}
            >
              <a href='https://app.crisp.chat/website/6e161565-e792-40ff-8306-a7a8c6af7645/inbox/'>
                Live Chat
              </a>
            </span>
          </div>

          <div>
            <Button text='Signout' onClick={() => navigate('/')} />
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
