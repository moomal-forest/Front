import React from 'react';
import MainButton from '../../components/mainbutton';
import GreenButton from '../../components/greenbutton';

const Profile = () => {
  return (
    <div className="min-h-screen bg-white relative z-20">
      <div className="absolute top-4 right-4 z-30">
        <MainButton />
      </div>
      

      {/* 프로필 폼 */}
      <div className="max-w-2xl mx-auto pt-16 px-4 relative z-10">
        <h1 className="text-4xl font-bold text-green-600 mb-8">마이페이지</h1>
        
        <div className="bg-[#f6f6f6] p-6 rounded-lg shadow-md">

          <div className="flex space-x-4 mb-7">
            <div className="flex-1">
                <label className="block text-m font-medium text-green-600 mb-1">성</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded" />
            </div>
            <div className="flex-1">
                <label className="block text-m font-medium text-green-600 mb-1">이름</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded" />
            </div>
          </div>
          
          <div className="mb-7">
            <label className="block text-m font-medium text-green-600 mb-1">ID</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded" />
          </div>
          
          <div className="mb-7">
            <label className="block text-m font-medium text-green-600 mb-1">수정할 비밀번호</label>
            <input type="password" className="w-full p-3 border border-gray-300 rounded" />
          </div>
          
          <div className="mb-6">
            <label className="block text-m font-medium text-green-600 mb-1">수정할 비밀번호 재입력</label>
            <input type="password" className="w-full p-3 border border-gray-300 rounded" />
          </div>
          <div className="flex justify-end">
            <GreenButton text="수정" />
          </div>
        </div>
      </div>

      {/* 하단 배경 이미지 */}
      <div className="absolute bottom-[-30px] left-0 right-0 z-0">
        <img src={require('../../img/bg.png')} alt="배경" className="w-full" />
      </div>
    </div>
  );
};

export default Profile;