import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "../../components/mainbutton";
import { mockApi } from '../../mocks/mockApi';
import { neighbors } from "../neighbor/neighbors";

const DiaryCreation = () => {
  const navigate = useNavigate();
  const [selectedNeighbors, setSelectedNeighbors] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [diaryName, setDiaryName] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectNeighbor = (neighbor) => {
    setSelectedNeighbors(prev => {
      if (prev.includes(neighbor)) {
        return prev.filter(n => n !== neighbor);
      } else {
        return [...prev, neighbor];
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const colors = [
    "#86C1AF", "#C0E1D8", "#CBE8E3", "#E0F4ED", "#E4FFBC", "#D5F0AC", "#BFF86A",
    "#90CBCF", "#B5DEE2", "#CCEEF0", "#E1CEE1", "#D3B8D2", "#9DA8CE", "#BCD9F2",
    "#EF95AF", "#EAB5C5", "#EDC8D8", "#EFCFD6", "#F0DFE4", "#EBB0AA", "#ECBEB6",
    "#EBB69F", "#EFD29D", "#F1DFBE", "#F2E7C4", "#F0DBD0", "#E4C3BD", "#EDCCC5",
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleCreate = async () => {
    if (selectedColor && diaryName) {
      const newDiary = {
        name: diaryName,
        color: selectedColor,
        type: selectedNeighbors.length > 0 ? "exchange" : "personal",
        neighbors: selectedNeighbors,
      };

      try {
        const createdDiary = await mockApi.createDiary(newDiary);
        navigate(`/diary/${createdDiary.id}`);
      } catch (error) {
        console.error("Error creating diary:", error);
        alert("다이어리 생성 중 오류가 발생했습니다.");
      }
    } else {
      alert("다이어리 이름과 색상을 모두 선택해주세요.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-white relative overflow-hidden">
      {/* <div className="absolute top-4 right-4 z-30">
        <MainButton />
      </div> */}

      <div className="max-w-4xl mx-auto pt-8 px-8 relative z-10 flex flex-col ">
        {/* <h1 className="text-5xl font-bold text-green-600 mb-8 text-center">
          감정 다이어리 생성
        </h1> */}

        <div className="flex-grow bg-[#f6f6f6] p-6 rounded-2xl shadow-lg overflow-y-auto">
          <div className="mb-3">
            <label className="block text-xl font-pretendard text-green-600 mb-2">
              다이어리 이름
            </label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={diaryName}
              onChange={(e) => setDiaryName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block text-xl font-pretendard text-green-600 mb-2">
              초대할 이웃 선택 (다중 선택 가능)
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                className="w-full p-4 border border-gray-300 rounded-lg text-left"
                onClick={toggleDropdown}
              >
                {selectedNeighbors.length > 0 ? selectedNeighbors.join(", ") : "이웃을 선택하세요"}
              </button>
              {isDropdownOpen && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 z-10 font-pretendard max-h-60 overflow-y-auto">
                  {neighbors.map((neighbor, index) => (
                    <li
                      key={index}
                      className={`p-4 hover:bg-gray-100 cursor-pointer ${
                        selectedNeighbors.includes(`${neighbor.name} (${neighbor.id})`) ? "bg-green-100" : ""
                      }`}
                      onClick={() => handleSelectNeighbor(`${neighbor.name} (${neighbor.id})`)}
                    >
                      {neighbor.name} ({neighbor.id})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xl font-pretendard text-green-600 mb-2">
              커버색상 선택
            </label>
            <div className="bg-white p-6 rounded-lg flex justify-center items-center">
              <div className="grid grid-cols-7 gap-4">
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

          <div className="flex justify-between space-x-4 ">
            <button
              className="flex-1 py-3 bg-[#4CAF50] text-white rounded-lg text-2xl font-pretendard"
              onClick={handleCreate}
            >
              만들기
            </button>
            <button
              className="flex-1 py-3 bg-white text-[#4CAF50] border border-[#4CAF50] rounded-lg text-2xl font-pretendard"
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
          className="w-full h-auto object-cover rounded-t-2xl"
        />
      </div>
    </div>
  );
};

export default DiaryCreation;
