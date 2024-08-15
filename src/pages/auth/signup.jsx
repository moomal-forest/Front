import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // 회원가입 성공 시, Login page로 이동
    navigate("./login"); // 회원가입 성공 시, login 페이지로 이동
  };

  return (
    <div className="flex h-screen w-screen">
      {/* 왼쪽 배경 섹션 */}
      <div
        className="relative"
        style={{
          width: "30%", // 화면의 30% 너비를 차지
          height: "100%", // 화면 전체 높이
        }}
      >
        <img
          src={require("../../img/loginback.jpg")}
          alt="배경"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 오른쪽 회원가입 폼 섹션 */}
      <div
        className="relative flex flex-col justify-start items-center p-8 bg-[#F6F6F6]"
        style={{
          width: "70%", // 화면의 70% 너비를 차지
          height: "100%", // 화면 전체 높이
          borderTopLeftRadius: "40px", // 왼쪽 상단 둥글기
          borderBottomLeftRadius: "40px", // 왼쪽 하단 둥글기
          left: "-40px",
          paddingLeft: "160px", // 왼쪽 여백
          paddingRight: "160px", // 오른쪽 여백
        }}
      >
        {/* 폼을 무말숲 제목 아래에 위치시키기 위해 여백을 조정 */}
        <div
          style={{
            marginTop: "8rem", // 폼이 제목 아래에 위치하도록 상단 여백 추가
            width: "100%", // 전체 너비 사용
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Sign up 텍스트 */}
          <h2
            style={{
              color: "#58AF5E",
              textAlign: "center",
              fontFamily: "Pretendard",
              fontSize: "40px",
              fontWeight: 700,
              lineHeight: "normal",
              opacity: "0.75", // var(--sds-size-stroke-border) 대체값
              marginBottom: "1.5rem", // margin-bottom 줄임
            }}
          >
            Sign up
          </h2>

          <form
            className="flex flex-col items-center w-full max-w-lg"
            onSubmit={handleSignup} // 회원가입 핸들러로 변경
          >
            {/* 이름 입력 */}
            <div className="flex flex-col w-full mb-4">
              <label
                htmlFor="name"
                style={{
                  color: "#58AF5E",
                  textAlign: "left", // 왼쪽 정렬
                  fontFamily: "Pretendard",
                  fontSize: "32px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                  marginBottom: "0.25rem", // margin-bottom 줄임
                  width: "100%", // 입력 폼과 같은 너비
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                style={{
                  width: "100%", // 입력 폼 너비를 100%로 설정
                  maxWidth: "560px", // 최대 너비를 560px로 설정
                  height: "72px",
                  borderRadius: "20px",
                  background: "#FFFFFF", // var(--sds-color-background-default-default) 대체값
                  border: "1px solid #D1D5DB", // 기본 테두리 색상
                  opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                  padding: "0 1rem",
                }}
                className="mb-4"
              />
            </div>

            {/* ID 입력 */}
            <div className="flex flex-col w-full mb-4">
              <label
                htmlFor="id"
                style={{
                  color: "#58AF5E",
                  textAlign: "left", // 왼쪽 정렬
                  fontFamily: "Pretendard",
                  fontSize: "32px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                  marginBottom: "0.25rem", // margin-bottom 줄임
                  width: "100%", // 입력 폼과 같은 너비
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                ID
              </label>
              <input
                type="text"
                id="id"
                style={{
                  width: "100%", // 입력 폼 너비를 100%로 설정
                  maxWidth: "560px", // 최대 너비를 560px로 설정
                  height: "72px",
                  borderRadius: "20px",
                  background: "#FFFFFF", // var(--sds-color-background-default-default) 대체값
                  border: "1px solid #D1D5DB", // 기본 테두리 색상
                  opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                  padding: "0 1rem",
                }}
                className="mb-4"
              />
            </div>

            {/* Password 입력 */}
            <div className="flex flex-col w-full mb-4">
              <label
                htmlFor="password"
                style={{
                  color: "#58AF5E",
                  textAlign: "left", // 왼쪽 정렬
                  fontFamily: "Pretendard",
                  fontSize: "32px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                  marginBottom: "0.25rem", // margin-bottom 줄임
                  width: "100%", // 입력 폼과 같은 너비
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                style={{
                  width: "100%", // 입력 폼 너비를 100%로 설정
                  maxWidth: "560px", // 최대 너비를 560px로 설정
                  height: "72px",
                  borderRadius: "20px",
                  background: "#FFFFFF", // var(--sds-color-background-default-default) 대체값
                  border: "1px solid #D1D5DB", // 기본 테두리 색상
                  opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                  padding: "0 1rem",
                }}
                className="mb-4"
              />
            </div>

            {/* Confirm Password 입력 */}
            <div className="flex flex-col w-full mb-4">
              <label
                htmlFor="confirm-password"
                style={{
                  color: "#58AF5E",
                  textAlign: "left", // 왼쪽 정렬
                  fontFamily: "Pretendard",
                  fontSize: "32px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                  marginBottom: "0.25rem", // margin-bottom 줄임
                  width: "100%", // 입력 폼과 같은 너비
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                style={{
                  width: "100%", // 입력 폼 너비를 100%로 설정
                  maxWidth: "560px", // 최대 너비를 560px로 설정
                  height: "72px",
                  borderRadius: "20px",
                  background: "#FFFFFF", // var(--sds-color-background-default-default) 대체값
                  border: "1px solid #D1D5DB", // 기본 테두리 색상
                  opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                  padding: "0 1rem",
                }}
                className="mb-4"
              />
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              style={{
                width: "100%", // 버튼 너비를 100%로 설정
                maxWidth: "560px", // 최대 너비를 560px로 설정
                height: "72px",
                borderRadius: "20px",
                background: "#58AF5E", // 버튼 배경 색상
                color: "#FFFFFF",
                fontFamily: "Pretendard",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "normal",
                border: "none",
                cursor: "pointer",
                marginBottom: "1.5rem", // margin-bottom 줄임
              }}
            >
              Sign up
            </button>

            <p
              style={{
                color: "#58AF5E",
                textAlign: "center",
                fontFamily: "Pretendard",
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "normal",
                opacity: "0.75", // var(--sds-size-stroke-border) 대체값
                marginBottom: "1.5rem", // margin-bottom 줄임
              }}
            >
              이미 회원이신가요?
            </p>

            {/* 로그인 버튼 */}
            <button
              onClick={() => navigate("./login")}
              style={{
                width: "100%", // 버튼 너비를 100%로 설정
                maxWidth: "560px", // 최대 너비를 560px로 설정
                height: "72px",
                borderRadius: "20px",
                background: "#FFFFFF", // 버튼 배경 색상
                color: "#58AF5E", // 텍스트 색상
                fontFamily: "Pretendard",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "normal",
                border: "1px solid #58AF5E",
                cursor: "pointer",
                marginBottom: "1.5rem", // margin-bottom 줄임
              }}
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
