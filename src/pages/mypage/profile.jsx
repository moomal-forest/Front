

import axios from 'axios'; // Axios를 사용해 백엔드와 통신
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // useParams 추가
import GreenButton from "../../components/greenbutton";
import MainButton from "../../components/mainbutton";

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // URL 파라미터에서 userId를 가져옴
  const [userData, setUserData] = useState({ userID: '', fullname: '', password: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // 사용자 데이터를 백엔드에서 불러오기
    axios.get(`/api/user/profile/${userId}`) // 백엔드 API 엔드포인트
      .then(response => {
        setUserData({
          userID: response.data.userID,
          fullname: response.data.fullname,
          password: '' // 비밀번호는 기본적으로 빈 문자열로 설정
        });
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, [userId]);

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 백엔드에 업데이트 요청
    axios.put(`/api/user/profile/${userId}`, {
      userID: userData.userID,
      password: newPassword,
    })
      .then(response => {
        alert("프로필이 성공적으로 업데이트되었습니다.");
      })
      .catch(error => {
        console.error("There was an error updating the profile!", error);
      });
  };

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
            {/* 이름 입력 - 비활성화 */}
            <div className="flex flex-col w-full">
              <label className="text-lg md:text-xl font-pretendard text-green-600 mb-2">
                이름
              </label>
              <input
                type="text"
                className="w-full h-10 md:h-12 rounded-xl bg-gray-200 border border-gray-300 px-4 font-pretendard"
                value={userData.fullname}
                disabled // 필드를 비활성화
              />
            </div>

            {/* ID 입력 - 수정 가능 */}
            <div className="flex flex-col w-full">
              <label className="text-lg md:text-xl font-pretendard text-green-600 mb-2">
                ID
              </label>
              <input
                type="text"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
                value={userData.userID}
                onChange={(e) => setUserData({ ...userData, userID: e.target.value })}
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </form>

          {/* 수정 버튼 */}
          <div className="absolute bottom-4 right-4 z-20">
            <GreenButton
              text="수정"
              className="w-full md:w-[250px]"
              onClick={handleSave} // 버튼 클릭 시 저장 함수 호출
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
