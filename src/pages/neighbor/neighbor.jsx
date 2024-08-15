import React from "react";
import MainButton from "../../components/mainbutton";
import WhiteButton from "../../components/whitebutton";
import GreenButton from "../../components/greenbutton";
import { neighbors } from "./neighbors";

const Neighbor = () => {
  return (
    <div className="min-h-screen bg-white relative">
      {/* 상단 오른쪽 버튼 */}
      <div className="absolute top-4 right-4 z-30">
        <MainButton />
      </div>

      {/* 이웃 목록 폼 */}
      <div className="max-w-4xl mx-auto pt-16 px-8 relative z-10">
        {/* 이웃 목록 제목 */}
        <h1 className="text-5xl font-bold text-green-600 mb-12">이웃 목록</h1>

        <div className="bg-[#f6f6f6] p-8 rounded-2xl shadow-lg">
          {neighbors.map((neighbor, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-8 last:mb-0"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-amber-950 rounded-full flex items-center justify-center text-white font-pretendard text-2xl mr-6">
                  {neighbor.name[0]}
                </div>
                <div>
                  <p className="font-bold text-green-700 text-2xl font-pretendard">
                    {neighbor.name}
                  </p>
                  <p className="text-gray-600 text-2xl font-pretendard">
                    {neighbor.id}
                  </p>
                </div>
              </div>
              <GreenButton text="삭제" />
            </div>
          ))}
          <div className="mt-4 flex justify-center text-2xl font-pretendard">
            <WhiteButton text="이웃 추가" />
          </div>
        </div>
      </div>

      {/* 하단 배경 이미지 */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <img
          src={require("../../img/bg.png")}
          alt="배경"
          className="w-full rounded-t-2xl"
        />
      </div>
    </div>
  );
};

export default Neighbor;
