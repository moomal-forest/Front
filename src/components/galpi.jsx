import React from "react";

const Galpi = ({ text }) => {
  return (
    <div
      className="text-white text-xl p-2 rounded-t-lg inline-block pl-4 pr-4 font-pretendard"
      style={{ backgroundColor: "#58AF5E" }}
    >
      {text}
    </div>
  );
};

export default Galpi;
