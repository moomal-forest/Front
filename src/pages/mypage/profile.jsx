import React from "react";
import MainButton from "../../components/mainbutton";
import GreenButton from "../../components/greenbutton";

const Profile = () => {
  return (
    <div className="min-h-screen bg-white relative">
      {/* 상단 오른쪽 버튼 */}
      <div className="absolute top-4 right-4 z-30">
        <MainButton />
      </div>

      {/* 프로필 폼 */}
      <div className="max-w-4xl mx-auto pt-16 px-8 relative z-10">
        {/* 마이페이지 제목 */}
        <h1
          className="text-5xl font-bold text-green-600 mb-12"
          style={{ marginLeft: "8px" }}
        >
          마이페이지
        </h1>

        <div className="bg-[#f6f6f6] p-8 rounded-2xl shadow-lg">
          <div className="mb-8">
            <label className="block text-2xl font-pretendard text-green-600 mb-2">
              이름
            </label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-8">
            <label className="block text-2xl font-pretendard text-green-600 mb-2">
              ID
            </label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-8">
            <label className="block text-2xl font-pretendard text-green-600 mb-2">
              수정할 비밀번호
            </label>
            <input
              type="password"
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-8">
            <label className="block text-2xl font-pretendard text-green-600 mb-2">
              수정할 비밀번호 재입력
            </label>
            <input
              type="password"
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-end text-2xl font-pretendard">
            <GreenButton text="수정" />
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

export default Profile;
