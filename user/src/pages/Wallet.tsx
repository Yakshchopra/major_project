import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import gradient from '../assets/gradient.svg';
import { BsWallet2 } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { db } from '../Firebase/firebase';
import { onValue, ref } from 'firebase/database';

const Wallet = () => {
  const [amount, setAmount] = React.useState(500);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.child('users').val();
      setAmount(data[0].wallet);
    });
  }, []);

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
          <h1 className='text-xl font-medium'>Your wallet balance</h1>
          <div className='rounded-xl text-2xl justify-between bg-lightWhite flex items-center p-6 mt-5'>
            <BsWallet2 />
            <span className='text-lg font-medium text-green-600'>{amount}</span>
          </div>
          <p className='flex gap-1 items-center mt-6 font-medium cursor-pointer text-blue-500'>
            <IoIosAddCircleOutline className='text-2xl' /> Add money to wallet
          </p>

          <h1 className='text-xl font-medium mt-8'>Your recent transactions</h1>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
