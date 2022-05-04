import React from 'react';
import { useStateValue } from '../store/stateProvider';
import Button from './Button';
import { MdError, MdOutlineClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface propTypes {
  amount: number;
  setModal: any;
}

const Modal = (props: propTypes) => {
  const { setModal, amount } = props;
  const [{ user, busses }, dispatch] = useStateValue();

  const Navigate = useNavigate();

  return (
    <div className='h-screen w-screen fixed top-0 left-0 backdrop-blur-sm bg-backdrop z-50'>
      <div className='absolute bottom-0 rounded-t-3xl bg-white w-screen p-10'>
        {user.wallet < amount && (
          <MdOutlineClose
            className='float-right text-xl'
            onClick={() => setModal(false)}
          />
        )}
        {user.wallet > amount ? (
          <div>
            <div className='mt-3 bg-black rounded-xl text-white'>
              <Button
                size='xl'
                text={`Confirm Payment for ₹${amount}`}
                iconly={false}
                onClick={async () => {
                  await localStorage.setItem('cost', `${amount}`);
                  Navigate('/booking');
                }}
              />
            </div>
            <div className='my-3 mb-3 bg-teal-400 rounded-xl text-white'>
              <Button
                size='xl'
                text='Cancel Payment'
                iconly={false}
                onClick={() => setModal(false)}
              />
            </div>
          </div>
        ) : (
          <>
            <p>
              <MdError className='text-3xl text-red-500 mb-3' />
            </p>
            <h1>Not enough balance</h1>
            <span className='mt-3 cursor-pointer text-blue-400 font-medium'>
              Check wallet
            </span>
          </>
        )}
      </div>
      {console.log(user, 'user')}
    </div>
  );
};

export default Modal;
