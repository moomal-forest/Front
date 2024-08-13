import React from 'react';
import { Link } from 'react-router-dom';

const MainButton = ({ to = '/', className = '' }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center bg-[#f6f6f6] rounded-full py-2 px-4 shadow-md hover:bg-[#e0e0e0] transition-colors ${className}`}
    >
      <img 
        src={require('../img/backg.png')}
        alt="도토리" 
        className="w-6 h-6 mr-2"
      />
      <span className="text-sm font-medium text-gray-700">메인으로</span>
    </Link>
  );
};

export default MainButton;