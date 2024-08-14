import React from 'react';

const GreenButton = ({ text,onClick }) => {
  return (
    <button onClick={onClick}  className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-lg inline-block pl-3 pr-3">
      {text}
    </button>
  );
};

export default GreenButton;