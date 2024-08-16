import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("./login"); // 회원가입 성공 시, login 페이지로 이동
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

      {/* 오른쪽 회원가입 폼 섹션 */}
      <div className="flex flex-col justify-between w-full md:w-[calc(70%+40px)] bg-[#F6F6F6] p-6 md:p-12 rounded-l-[40px] md:ml-[-40px] relative z-10">
      

        <div className="flex flex-col items-center justify-center flex-grow">
          <h2 className="text-[#58AF5E] text-2xl md:text-3xl font-bold mb-6 md:mb-8 opacity-75 font-pretendard">
            Sign up
          </h2>

          <form
            className="flex flex-col items-center w-full max-w-md"
            onSubmit={handleSignup}
          >
            {/* 이름 입력 */}
            <div className="flex flex-col w-full mb-3 md:mb-4">
              <label
                htmlFor="name"
                className="text-[#58AF5E] text-lg md:text-xl mb-1 md:mb-2 opacity-75 font-pretendard"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* ID 입력 */}
            <div className="flex flex-col w-full mb-3 md:mb-4">
              <label
                htmlFor="id"
                className="text-[#58AF5E] text-lg md:text-xl mb-1 md:mb-2 opacity-75 font-pretendard"
              >
                ID
              </label>
              <input
                type="text"
                id="id"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* Password 입력 */}
            <div className="flex flex-col w-full mb-3 md:mb-4">
              <label
                htmlFor="password"
                className="text-[#58AF5E] text-lg md:text-xl mb-1 md:mb-2 opacity-75 font-pretendard"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* Confirm Password 입력 */}
            <div className="flex flex-col w-full mb-4 md:mb-6">
              <label
                htmlFor="confirm-password"
                className="text-[#58AF5E] text-lg md:text-xl mb-1 md:mb-2 opacity-75 font-pretendard"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full h-10 md:h-12 rounded-xl bg-white border border-gray-300 px-4 font-pretendard"
              />
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="w-full h-10 md:h-12 rounded-xl bg-[#58AF5E] text-white text-lg md:text-xl font-bold mb-4 md:mb-6 font-pretendard"
            >
              Sign up
            </button>

            <p className="text-[#58AF5E] text-sm md:text-base opacity-75 mb-3 md:mb-4 font-pretendard">
              이미 회원이신가요?
            </p>

            {/* 로그인 버튼 */}
            <button
              onClick={() => navigate("/login")}
              className="w-full max-w-md h-10 md:h-12 rounded-xl bg-white text-[#58AF5E] text-lg md:text-xl font-bold border border-[#58AF5E] font-pretendard"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
