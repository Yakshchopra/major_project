import React from 'react';
import Logo from '../assets/logo_dark.svg';
import gradient from '../assets/gradient.svg';
import Button from '../components/Button';
import { signInwithGoogle } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../store/stateProvider';

const Home = () => {
  let navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const signInHandler = async () => {
    let result = (await signInwithGoogle()) as any;
    if (result) {
      dispatch({
        type: 'SET_USER',
        user: {
          ...user,
          name: result.user.displayName,
          email: result.user.email,
        },
      });

      let data = {
        name: result.user.displayName,
        email: result.user.email,
      };

      localStorage.setItem('userName', JSON.stringify(data));

      navigate('/dashboard', { replace: true });
    }
  };

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
        <Button
          size='xl'
          text='Login with google'
          iconly={true}
          onClick={signInHandler}
        />
      </div>
    </div>
  );
};

export default Home;
