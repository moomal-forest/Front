import React from "react";

const GreenButton = ({ text,onClick }) => {
  return (

    <button onClick={onClick} className="bg-[#58AF5E] text-white hover:bg-[#4C9B4E] p-2 rounded-lg inline-block pl-3 pr-3 font-pretendard">

      {text}
    </button>
  );
};

export default GreenButton;
