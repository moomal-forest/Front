import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Galpi from "../../components/galpi";
import { mockApi } from "../../mocks/mockApi";

const Frame = () => {
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    mockApi.getDiaries().then(setDiaries);
  }, []);

  const handleDiaryCreation = () => {
    navigate("/diaryCreation");
  };

  const handleDiaryClick = (diaryId) => {
    navigate(`/diary/${diaryId}`);
  }

  const renderDiaries = (type) => {
    const filteredDiaries = diaries.filter((diary) => diary.type === type);
    if (filteredDiaries.length === 0) {
      return (
        <div className="h-[200px] bg-[#edebe7] p-4 rounded-b-lg rounded-tr-lg flex items-center justify-center">
          <p className="text-gray-600 text-center text-sm sm:text-base">
            다이어리가 없어요 :(
            <br />
            오늘을 기록하기 위해 다이어리를 먼저 만들어주세요.
          </p>
        </div>
      );
    } else {
      return (
        <div className="max-h-[300px] bg-[#edebe7] p-4 rounded-b-lg rounded-tr-lg flex items-center overflow-y-auto">
          {filteredDiaries.map((diary) => (
            <div key={diary.id} className="flex flex-col items-center mr-4 flex-shrink-0">
              <div className="bg-white p-2 rounded-[20px] mb-2">
                <img
                  src={require(`../../img/${diary.color.substring(1)}.png`)}
                  alt="Diary"
                  className="h-[120px] sm:h-[160px] w-auto cursor-pointer"
                  onClick={() => handleDiaryClick(diary.id)}
                />
                <p className="text-base sm:text-lg text-[#4A3712] text-center font-pretendard mt-2">
                  {diary.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-8 h-full overflow-hidden">
      <div>
        <Galpi text="개인 다이어리" />
        <button
          className="text-green-600 px-4 py-2 font-pretendard text-base sm:text-xl"
          onClick={handleDiaryCreation}
        >
          개인 다이어리 만들기
        </button>
        {renderDiaries("personal")}
      </div>
      <div>
        <Galpi text="교환 다이어리" />
        <button
          className="text-green-600 px-4 py-2 font-pretendard text-base sm:text-xl"
          onClick={handleDiaryCreation}
        >
          교환 다이어리 만들기
        </button>
        {renderDiaries("exchange")}
      </div>
    </div>
  );
};

export default Frame;