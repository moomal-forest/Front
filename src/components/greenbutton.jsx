import React from 'react';

const GreenButton = ({ text }) => {
  return (
    <div className="bg-green-500 text-white p-2 rounded-lg inline-block pl-3 pr-3">
      {text}
    </div>
  );
};

export default GreenButton;