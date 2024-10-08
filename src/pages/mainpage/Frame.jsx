import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Galpi from "../../components/galpi";

const Frame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [diaries, setDiaries] = useState([]);

  const fetchDiaries = async () => {
    try {
      const response = await axios.get('http://localhost:3080/api/diaries');
      setDiaries(response.data);
    } catch (error) {
      console.error("다이어리 목록을 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [location]);

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
        <div className="h-[220px] bg-[#edebe7] p-4 rounded-b-lg rounded-tr-lg flex items-center justify-center">
          <p className="text-gray-600 text-center text-sm sm:text-base">
            다이어리가 없어요 :(
            <br />
            오늘을 기록하기 위해 다이어리를 먼저 만들어주세요.
          </p>
        </div>
      );
    } else {
      return (
        <div className="h-[220px] bg-[#edebe7] p-4 rounded-b-lg rounded-tr-lg flex items-center overflow-x-auto">
          {filteredDiaries.map((diary) => (
            <div key={diary._id} className="flex flex-col items-center mr-4 flex-shrink-0">
              <div className="bg-white p-2 rounded-[20px] mb-">
                <img
                  src={require(`../../img/${diary.color.substring(1)}.png`)}
                  alt="Diary"
                  className="h-[100px] sm:h-[140px] w-auto cursor-pointer"
                  onClick={() => handleDiaryClick(diary._id)}
                />
                <p className="text-base sm:text-lg text-[#4A3712] text-center font-pretendard mt-1">
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
    <div className="space-y-4 sm:space-y-6 h-full max-h-[vh] overflow-hidden">
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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Galpi from "../../components/galpi";
// import { mockApi } from "../../mocks/mockApi";

// const Frame = () => {
//   const navigate = useNavigate();
//   const [diaries, setDiaries] = useState([]);

//   useEffect(() => {
//     mockApi.getDiaries().then(setDiaries);
//   }, []);

//   const handleDiaryCreation = () => {
//     navigate("/diaryCreation");
//   };

//   const handleDiaryClick = (diaryId) => {
//     navigate(`/diary/${diaryId}`);
//   }

//   const renderDiaries = (type) => {
//     const filteredDiaries = diaries.filter((diary) => diary.type === type);
//     if (filteredDiaries.length === 0) {
//       return (
//         <div className="h-[220px] bg-[#edebe7] p-4 rounded-b-lg rounded-tr-lg flex items-center justify-center">
//           <p className="text-gray-600 text-center text-sm sm:text-base">
//             다이어리가 없어요 :(
//             <br />
//             오늘을 기록하기 위해 다이어리를 먼저 만들어주세요.
//           </p>
//         </div>
//       );
//     } else {
//       return (
//         <div className="h-[220px] bg-[#edebe7] p-4 rounded-b-lg rounded-tr-lg flex items-center overflow-x-auto">
//           {filteredDiaries.map((diary) => (
//             <div key={diary.id} className="flex flex-col items-center mr-4 flex-shrink-0">
//               <div className="bg-white p-2 rounded-[20px] mb-">
//                 <img
//                   src={require(`../../img/${diary.color.substring(1)}.png`)}
//                   alt="Diary"
//                   className="h-[100px] sm:h-[140px] w-auto cursor-pointer"
//                   onClick={() => handleDiaryClick(diary.id)}
//                 />
//                 <p className="text-base sm:text-lg text-[#4A3712] text-center font-pretendard mt-1">
//                   {diary.name}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6 h-full max-h-[vh] overflow-hidden">
//       <div>
//         <Galpi text="개인 다이어리" />
//         <button
//           className="text-green-600 px-4 py-2 font-pretendard text-base sm:text-xl"
//           onClick={handleDiaryCreation}
//         >
//           개인 다이어리 만들기
//         </button>
//         {renderDiaries("personal")}
//       </div>
//       <div>
//         <Galpi text="교환 다이어리" />
//         <button
//           className="text-green-600 px-4 py-2 font-pretendard text-base sm:text-xl"
//           onClick={handleDiaryCreation}
//         >
//           교환 다이어리 만들기
//         </button>
//         {renderDiaries("exchange")}
//       </div>
//     </div>
//   );
// };

// export default Frame;
