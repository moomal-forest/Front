import React from 'react';

const WhiteButton = ({ text }) => {
  return (
    <div className="bg-white text-green-500 p-2 rounded-lg inline-block pl-3 pr-3">
      {text}
    </div>
  );
};

export default WhiteButton;