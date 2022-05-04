import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface propTypes {
  iconly: boolean;
  text: string;
  size: string;
  onClick: Function;
}

const Button = (props: propTypes) => {
  const { text, size, iconly, onClick } = props;

  // const handleDirection = (source: any, destination: any) => {
  //   fetch(
  //     `https://api.mapbox.com/directions/v5/mapbox/driving/${source[0]},${source[1]};${destination[1]},${destination[0]}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoieWFrc2hjaG9wcmEiLCJhIjoiY2tpZDNsa3J5MWY3bTJ0cnM1dGdybzh5aSJ9.VwV3tbcQ3g2HmowrEhuNcw`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };

  // useEffect(() => {

  //   handleDirection(user.coordinates, [74.859735, 32.705408]);
  // });
  return (
    <button
      onClick={() => onClick()}
      className=' border border-gray-300 outline-none w-full p-4 rounded-xl text-lg'
    >
      {iconly ? (
        <span className='flex items-center gap-5 justify-center'>
          <FcGoogle className='text-2xl' />{' '}
          <span className='text-md'>{text}</span>
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
