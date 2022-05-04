import React from 'react';
import connection from '../assets/connection.svg';
import ticket from '../assets/icons/ticket.svg';
import time from '../assets/icons/time.svg';
import status from '../assets/icons/status.svg';
import wallet from '../assets/icons/wallet.svg';
import voilation from '../assets/icons/voilation.svg';

interface propTypes {
  from: string;
  to: string;
  bus: string;
  eta: number;
  price: number;
  status: string;
  totalSeats: number;
  seatsLeft: number;
}

const Card = (props: propTypes) => {
  return (
    <div className='bg-light cursor-pointer busCard p-10 rounded-xl'>
      <div className='flex gap-3 relative justify-between items-center'>
        {/* top row */}
        <span>{props.from}</span>
        <img
          className='w-full'
          draggable={false}
          src={connection}
          alt='connection'
        />
        <span>{props.to}</span>
        <div className='absolute bg-secondary rounded-md px-3 py-1 left-1/2 transform text-white font-semibold -translate-x-1/2 text-xs'>
          {props.bus}
        </div>
      </div>

      {/* row */}
      <div className='flex items-center justify-between mt-6'>
        <div className='flex items-center gap-3'>
          <img src={ticket} className='h-5' alt='' />
          <span className=' text-darkText'>25 passengers</span>
        </div>
        <div className='flex items-center gap-3'>
          <img src={voilation} className='h-5' alt='' />
          <span className=' text-darkText'>5 voilations</span>
        </div>
      </div>

      {/* row */}
      <div className='flex items-center justify-between mt-6'>
        <div className='flex items-center gap-3'>
          <img src={status} className='h-6' alt='' />
          <span className=' text-darkText'>{props.status}</span>
        </div>
        <div className='flex items-center gap-3'>
          <img src={wallet} className='h-5' alt='' />
          <span className=' text-darkText'>₹ {props.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
