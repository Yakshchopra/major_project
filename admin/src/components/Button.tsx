import React from 'react';

interface propTypes {
  text: string;
}

const Button = (props: any) => {
  return (
    <button
      onClick={props.onClick}
      className='text-white px-9 outline-none py-3 rounded-xl bg-black'
    >
      {props.text}
    </button>
  );
};

export default Button;
