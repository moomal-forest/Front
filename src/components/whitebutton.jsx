import React from 'react';

const WhiteButton = ({ text }) => {
  return (
    <button className="bg-white text-green-500 hover:bg-slate-200 p-2 rounded-lg inline-block pl-3 pr-3">
      {text}
    </button>
  );
};

export default WhiteButton;