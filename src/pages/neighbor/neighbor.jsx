

import React from "react";
import { useNavigate } from 'react-router-dom';
import GreenButton from "../../components/greenbutton";
import MainButton from "../../components/mainbutton";
import WhiteButton from "../../components/whitebutton";
import { neighbors } from "./neighbors";

const Neighbor = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* 상단 오른쪽 버튼 */}
      <div className="absolute top-4 right-4 z-30" onClick ={handleClick}>
        <MainButton text="메인으로" />
      </div>

      {/* 이웃 목록 폼 */}
      <div className="max-w-4xl mx-auto pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 relative z-10 pb-12 sm:pb-16 md:pb-24">
        {/* 이웃 목록 제목 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-6 sm:mb-8 md:mb-12">이웃 목록</h1>

        <div className="bg-[#f6f6f6] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
          {neighbors.map((neighbor, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 last:mb-0"
            >
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-950 rounded-full flex items-center justify-center text-white font-pretendard text-xl sm:text-2xl mr-4 sm:mr-6">
                  {neighbor.name[0]}
                </div>
                <div>
                  <p className="font-bold text-green-700 text-xl sm:text-2xl font-pretendard">
                    {neighbor.name}
                  </p>
                  <p className="text-gray-600 text-lg sm:text-2xl font-pretendard">
                    {neighbor.id}
                  </p>
                </div>
              </div>
              <GreenButton text="삭제" />
            </div>
          ))}
          <div className="mt-6 flex justify-center text-xl sm:text-2xl font-pretendard">
            <WhiteButton text="이웃 추가" />
          </div>
        </div>
      </div>

      {/* 하단 배경 이미지 */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <img
          src={require("../../img/bg.png")}
          alt="배경"
          className="w-full h-auto object-cover rounded-t-2xl"
        />
      </div>
    </div>
  );
};

export default Neighbor;