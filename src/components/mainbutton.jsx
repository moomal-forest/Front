import React from "react";


const MainButton = ({ className = "", text }) => {
  return (
    <button
      className={`flex items-center bg-[#f6f6f6] rounded-full py-1 px-3 shadow-md hover:bg-[#e0e0e0] transition-colors ${className}`}
    >
      <img
        src={require("../img/backg.png")}
        alt="도토리"
        className="w-6 h-6 mr-1"
      />
      <span className="text-m font-pretendard text-gray-700">{text}</span>
    </button>
  );
};

export default MainButton;
