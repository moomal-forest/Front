
import React from "react";
import { useNavigate } from 'react-router-dom';
import GreenButton from "../../components/greenbutton";
import MainButton from "../../components/mainbutton";

const Profile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* 상단 오른쪽 버튼 */}
      <div onClick={handleClick} className="absolute top-4 right-4 z-30 ">
        <MainButton text="메인으로" />
      </div>

      {/* 프로필 폼 */}
      <div className="max-w-4xl mx-auto pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 relative z-10 pb-12 sm:pb-16 md:pb-24">
        {/* 마이페이지 제목 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-6 sm:mb-8 md:mb-12 ml-2">
          마이페이지
        </h1>

        <div className="bg-[#f6f6f6] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
          <div className="mb-6 sm:mb-8">
            <label className="block text-xl sm:text-2xl font-pretendard text-green-600 mb-2">
              이름
            </label>
            <input
              type="text"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-lg sm:text-xl"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <label className="block text-xl sm:text-2xl font-pretendard text-green-600 mb-2">
              ID
            </label>
            <input
              type="text"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-lg sm:text-xl"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <label className="block text-xl sm:text-2xl font-pretendard text-green-600 mb-2">
              수정할 비밀번호
            </label>
            <input
              type="password"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-lg sm:text-xl"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <label className="block text-xl sm:text-2xl font-pretendard text-green-600 mb-2">
              수정할 비밀번호 재입력
            </label>
            <input
              type="password"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-lg sm:text-xl"
            />
          </div>

          <div className="flex justify-end text-xl sm:text-2xl font-pretendard">
            <GreenButton text="수정" />
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

export default Profile;