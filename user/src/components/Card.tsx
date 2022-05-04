import React from 'react';
import link from '../assets/link.svg';
import ticket from '../assets/icons/ticket.svg';
import status from '../assets/icons/status.svg';
import time from '../assets/icons/time.svg';
import wallet from '../assets/icons/wallet.svg';
import users from '../assets/icons/users.svg';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../store/stateProvider';

interface propTypes {
  type: string;
  from: string;
  to: string;
  bus: string;
  seatsLeft: number;
  totalSeats: number;
  eta: number;
  price: number;
  busStatus: string;
}

const Card = (props: any) => {
  const {
    type,
    from,
    to,
    bus,
    seatsLeft,
    totalSeats,
    eta,
    price,
    busStatus,
    isArrived,
  } = props;

  const navigate = useNavigate();

  const [{ user, activeBus }, dispatch] = useStateValue();

  return (
    <div className='bg-light relative cursor-pointer bg-lightWhite border border-gray-200 p-5 rounded-xl mt-6'>
      <div className='flex relative text-sm font-medium justify-between items-center'>
        {/* top row */}
        <span>{from}</span>
        {/* <img className='w-32' draggable={false} src={link} alt='connection' /> */}
        <div className='bg-teal-400 rounded-md px-3 py-0  text-white font-semibold font-small'>
          to
        </div>
        <span>{to}</span>
      </div>

      {/* row */}
      <div className='flex items-center justify-between mt-4 text-xs'>
        <div className='flex items-center gap-1'>
          <img src={ticket} className='h-4' alt='' />
          <span className=' text-darkText'>
            {seatsLeft}/{totalSeats} seats left
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <img src={time} className='h-4' alt='' />
          <span className=' text-darkText'>
            {!isArrived ? eta + 'min' : 'Arrived'}
          </span>
        </div>
      </div>

      {/* row */}
      <div className='flex items-center text-xs justify-between mt-6'>
        <div className='flex items-center gap-1'>
          <img src={status} className='h-4' alt='' />
          <span className=' text-darkText'>{busStatus}</span>
        </div>
        <div className='flex items-center gap-1'>
          <img src={wallet} className='h-4' alt='' />
          <span className=' text-darkText'>₹ {price}/pax</span>
        </div>
      </div>

      {/* optional */}
      {type === 'booked' && (
        <div className='flex items-center text-xs justify-between mt-6'>
          <div className='flex items-center gap-1'>
            <img src={users} className='h-4' alt='' />
            <span className=' text-darkText'>
              {user.name + ' '} {user.pax ? `X ${user.pax}` : ''}
            </span>
          </div>
          <div
            className={`flex items-center gap-1 ${
              !isArrived ? 'text-red-600' : 'text-green-600'
            }`}
          >
            ₹ {localStorage.getItem('cost')} {!isArrived && 'to be '}
            deducted
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
