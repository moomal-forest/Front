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
    <div className="min-h-screen bg-white relative flex flex-col">
      {/* 상단 오른쪽 버튼 */}
      <div onClick={handleClick} className="absolute top-4 right-4 z-30">
        <MainButton text="메인으로" />
      </div>

      {/* 프로필 폼 */}
      <div className="flex flex-grow justify-center items-center p-4 md:p-8 relative z-10">
        <div className="flex flex-col justify-between w-full max-w-2xl bg-[#F6F6F6] p-6 md:p-8 rounded-2xl shadow-lg relative">
          <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-4 md:mb-6 text-center">
            마이페이지
          </h1>

          <form className="flex flex-col space-y-4 md:space-y-6 mb-16">
            {/* 이름 입력 */}
            <div className="flex flex-col w-full">
              <label className="text-lg md:text-xl font-pretendard text-green-600 mb-2">
                이름
              </label>
              <input
                type="text"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* ID 입력 */}
            <div className="flex flex-col w-full">
              <label className="text-lg md:text-xl font-pretendard text-green-600 mb-2">
                ID
              </label>
              <input
                type="text"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* 수정할 비밀번호 입력 */}
            <div className="flex flex-col w-full">
              <label className="text-lg md:text-xl font-pretendard text-green-600 mb-2">
                수정할 비밀번호
              </label>
              <input
                type="password"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* 수정할 비밀번호 재입력 */}
            <div className="flex flex-col w-full">
              <label className="text-lg md:text-xl font-pretendard text-green-600 mb-2">
                수정할 비밀번호 재입력
              </label>
              <input
                type="password"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>
          </form>

          {/* 수정 버튼 */}
          <div className="absolute bottom-4 right-4 z-20">
            <GreenButton
              text="수정"
              className="w-full md:w-[250px]" // 원하는 가로 길이 조정
            />
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
