import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "../../components/mainbutton";
import { neighbors } from "../neighbor/neighbors";

const DiaryCreation = () => {
  const navigate = useNavigate();
  const [selectedNeighbor, setSelectedNeighbor] = useState("혼자쓸래요");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [diaryName, setDiaryName] = useState(""); // 다이어리 이름 상태 추가

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectNeighbor = (neighbor) => {
    setSelectedNeighbor(neighbor);
    setIsDropdownOpen(false);
  };

  const colors = [
    "#86C1AF",
    "#C0E1D8",
    "#CBE8E3",
    "#E0F4ED",
    "#E4FFBC",
    "#D5F0AC",
    "#BFF86A",
    "#90CBCF",
    "#B5DEE2",
    "#CCEEF0",
    "#E1CEE1",
    "#D3B8D2",
    "#9DA8CE",
    "#BCD9F2",
    "#EF95AF",
    "#EAB5C5",
    "#EDC8D8",
    "#EFCFD6",
    "#F0DFE4",
    "#EBB0AA",
    "#ECBEB6",
    "#EBB69F",
    "#EFD29D",
    "#F1DFBE",
    "#F2E7C4",
    "#F0DBD0",
    "#E4C3BD",
    "#EDCCC5",
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleCreate = () => {
    if (selectedColor && diaryName) {
      const newDiary = {
        name: diaryName,
        color: selectedColor,
        type: selectedNeighbor === "혼자쓸래요" ? "personal" : "exchange",
      };

      // localStorage를 사용하여 다이어리 정보 저장
      const diaries = JSON.parse(localStorage.getItem("diaries") || "[]");
      diaries.push(newDiary);
      localStorage.setItem("diaries", JSON.stringify(diaries));

      navigate("/");
    } else {
      alert("다이어리 이름과 색상을 모두 선택해주세요.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute top-4 right-4 z-30">
        <MainButton />
      </div>

      <div className="max-w-4xl mx-auto pt-16 px-8 relative z-10">
        <h1 className="text-5xl font-bold text-green-600 mb-12 text-center">
          감정 다이어리 생성
        </h1>

        <div className="bg-[#f6f6f6] p-8 rounded-2xl shadow-lg">
          {/* 다이어리 이름 입력 */}
          <div className="mb-8">
            <label className="block text-xl font-medium text-green-600 mb-2">
              다이어리 이름
            </label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={diaryName}
              onChange={(e) => setDiaryName(e.target.value)}
            />
          </div>

          {/* 이웃 선택 */}
          <div className="mb-8">
            <label className="block text-xl font-medium text-green-600 mb-2">
              초대할 이웃 선택
            </label>
            <div className="relative">
              <button
                className="w-full p-4 border border-gray-300 rounded-lg text-left"
                onClick={toggleDropdown}
              >
                {selectedNeighbor}
              </button>
              {isDropdownOpen && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 z-10">
                  <li
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectNeighbor("혼자쓸래요")}
                  >
                    혼자쓸래요
                  </li>
                  {neighbors.map((neighbor, index) => (
                    <li
                      key={index}
                      className="p-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        handleSelectNeighbor(
                          `${neighbor.name} (${neighbor.id})`
                        )
                      }
                    >
                      {neighbor.name} ({neighbor.id})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 색상 선택 */}
          <div className="mb-8">
            <label className="block text-xl font-medium text-green-600 mb-2">
              커버색상 선택
            </label>
            <div className="bg-white p-8 rounded-lg flex justify-center items-center">
              <div className="grid grid-cols-7 gap-6 w-full max-w-2xl">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-full ${
                      selectedColor === color ? "ring-2 ring-green-500" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 생성 및 취소 버튼 */}
          <div className="flex justify-between space-x-4">
            <button
              className="flex-1 py-3 bg-[#4CAF50] text-white rounded-lg text-lg font-medium"
              onClick={handleCreate}
            >
              만들기
            </button>
            <button
              className="flex-1 py-3 bg-white text-[#4CAF50] border border-[#4CAF50] rounded-lg text-lg font-medium"
              onClick={handleCancel}
            >
              취소
            </button>
          </div>
        </div>
      </div>

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

export default DiaryCreation;
