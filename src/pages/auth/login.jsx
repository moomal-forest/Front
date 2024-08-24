import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";


const Login = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await AuthService.login(userID, password);
  //     navigate("/");
  //   } catch (error) {
  //     setError(error.message || "로그인 중 오류가 발생했습니다.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await AuthService.login(userID, password);
      console.log(result.message); // 성공 메시지 출력
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 왼쪽 배경 섹션 */}
      <div className="hidden md:block w-1/3 h-full relative">
        <img
          src={require("../../img/loginback.jpg")}
          alt="배경"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 오른쪽 로그인 폼 섹션 */}
      <div className="flex flex-col justify-between w-full md:w-[calc(70%+40px)] bg-[#F6F6F6] p-8 md:p-16 rounded-l-[40px] md:ml-[-40px] relative z-10">
        {/* 무말숲 제목 */}
        <h1 className="text-[#58AF5E] text-4xl md:text-6xl font-bold mb-8 font-pretendard">
          무말숲
        </h1>

        <div className="flex flex-col items-center justify-center flex-grow">
          <h2 className="text-[#58AF5E] text-2xl md:text-3xl font-bold mb-8 opacity-75 font-pretendard">
            Sign in
          </h2>

          <form
            className="flex flex-col items-center w-full max-w-md"
            onSubmit={handleLogin}
          >
            {/* ID 입력 */}
            <div className="flex flex-col w-full mb-4">
              <label
                htmlFor="id"
                className="text-[#58AF5E] text-lg md:text-xl mb-2 opacity-75 font-pretendard"
              >
                ID
              </label>
              <input
                type="text"
                id="id"
                className="w-full h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* Password 입력 */}
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="password"
                className="text-[#58AF5E] text-lg md:text-xl mb-2 opacity-75 font-pretendard"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                className="w-full h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#58AF5E] text-white text-lg md:text-xl font-bold mb-6 font-pretendard"
            >
              Login
            </button>
          </form>

          {/* 아이디/비밀번호 찾기 링크 */}
          <p className="text-[#58AF5E] text-sm md:text-base opacity-75 mb-4 cursor-pointer font-pretendard">
            아이디 / 비밀번호 찾기
          </p>

          {/* 회원이 아니신가요? 텍스트 */}
          <p className="text-[#58AF5E] text-sm md:text-base opacity-75 mb-4 font-pretendard">
            회원이 아니신가요?
          </p>

          {/* Sign up 버튼 */}
          <button
            onClick={navigateToSignup}
            className="w-full max-w-md h-12 rounded-xl bg-white text-[#58AF5E] text-lg md:text-xl font-bold border border-[#58AF5E] font-pretendard"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;