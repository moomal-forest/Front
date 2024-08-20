import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import GreenButton from "../../components/greenbutton";
import MainButton from "../../components/mainbutton";
import WhiteButton from "../../components/whitebutton";
import { neighbors as initialNeighbors } from "./neighbors";

const Neighbor = () => {
  const [neighbors, setNeighbors] = useState(initialNeighbors);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const handleDelete = (id) => {
    const updatedNeighbors = neighbors.filter(neighbor => neighbor.id !== id);
    setNeighbors(updatedNeighbors);
  };

  const handleAddNeighbor = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
    closePopup();
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center">
      {/* 상단 오른쪽 버튼 */}
      <div className="absolute top-4 right-4 z-30" onClick={handleClick}>
        <MainButton text="메인으로" />
      </div>

      {/* 이웃 목록 폼 */}
      <div className="w-full max-w-4xl mx-auto pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-center">
        {/* 이웃 목록 제목 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-6 sm:mb-8 md:mb-12 text-center">이웃 목록</h1>

        {/* 스크롤 가능한 이웃 목록 컨테이너 */}
        <div className="bg-[#f6f6f6] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg max-h-[calc(100vh-15rem)] overflow-y-auto w-full scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full">
          {neighbors.map((neighbor, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 last:mb-0"
            >
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-950 rounded-full flex items-center justify-center text-white font-pretendard text-xl sm:text-2xl mr-4 sm:mr-6">
                  {neighbor.name[0]}
                </div>
                <div>
                  <p className="font-bold text-green-700 text-xl sm:text-2xl font-pretendard">
                    {neighbor.name}
                  </p>
                  <p className="text-gray-600 text-lg sm:text-xl font-pretendard">
                    {neighbor.id}
                  </p>
                </div>
              </div>
              <GreenButton text="삭제" onClick={() => handleDelete(neighbor.id)} />
            </div>
          ))}
        </div>

        {/* 이웃 추가 버튼 폼 내 고정 */}
        <div className="mt-6 flex justify-center text-xl sm:text-2xl font-pretendard">
          <WhiteButton text="이웃 추가" onClick={handleAddNeighbor} />
        </div>
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg relative w-full max-w-md mx-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">이웃 검색</h2>
            <div className="flex items-center mb-4">
              <input
                type="text"
                className="border border-gray-300 rounded-full py-2 px-4 text-base sm:text-lg md:text-xl w-full"
                placeholder="이웃 ID를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch} className="text-amber-950 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center"
              onClick={closePopup}
            >
              X
            </button>
          </div>
        </div>
      )}

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

export default Neighbor;





// 이전 코드임요
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import GreenButton from "../../components/greenbutton";
// import MainButton from "../../components/mainbutton";
// import WhiteButton from "../../components/whitebutton";
// import { neighbors as initialNeighbors } from "./neighbors";

// const Neighbor = () => {
//   const [neighbors, setNeighbors] = useState(initialNeighbors);
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/');
//   };

//   const handleDelete = (id) => {
//     const updatedNeighbors = neighbors.filter(neighbor => neighbor.id !== id);
//     setNeighbors(updatedNeighbors);
//   };

//   const handleAddNeighbor = () => {
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   const handleSearch = () => {
//     console.log('Search term:', searchTerm);
//     closePopup();
//   };

//   return (
//     <div className="min-h-screen bg-white relative">
//       {/* 상단 오른쪽 버튼 */}
//       <div className="absolute top-4 right-4 z-30" onClick={handleClick}>
//         <MainButton text="메인으로" />
//       </div>

//       {/* 이웃 목록 폼 */}
//       <div className="max-w-4xl mx-auto pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 relative z-10 pb-12 sm:pb-16 md:pb-24">
//         {/* 이웃 목록 제목 */}
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-6 sm:mb-8 md:mb-12">이웃 목록</h1>

//         <div className="bg-[#f6f6f6] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
//           {neighbors.map((neighbor, index) => (
//             <div
//               key={index}
//               className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 last:mb-0"
//             >
//               <div className="flex items-center mb-4 sm:mb-0">
//                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-950 rounded-full flex items-center justify-center text-white font-pretendard text-xl sm:text-2xl mr-4 sm:mr-6">
//                   {neighbor.name[0]}
//                 </div>
//                 <div>
//                   <p className="font-bold text-green-700 text-xl sm:text-2xl font-pretendard">
//                     {neighbor.name}
//                   </p>
//                   <p className="text-gray-600 text-lg sm:text-2xl font-pretendard">
//                     {neighbor.id}
//                   </p>
//                 </div>
//               </div>
//               <GreenButton text="삭제" onClick={() => handleDelete(neighbor.id)} />
//             </div>
//           ))}
//           <div className="mt-6 flex justify-center text-xl sm:text-2xl font-pretendard">
//             <WhiteButton text="이웃 추가" onClick={handleAddNeighbor} />
//           </div>
//         </div>
//       </div>

//       {/* 팝업 */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg relative w-full max-w-md mx-4">
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">친구 검색</h2>
//             <div className="flex items-center mb-4">
//               <input
//                 type="text"
//                 className="border border-gray-300 rounded-full py-2 px-4 text-base sm:text-lg md:text-xl w-full"
//                 placeholder="이웃 이름을 입력하세요"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button onClick={handleSearch} className="text-amber-950 p-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <button
//               className="absolute top-2 right-2 text-white bg-red-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center"
//               onClick={closePopup}
//             >
//               X
//             </button>
//           </div>
//         </div>
//       )}

//       {/* 하단 배경 이미지 */}
//       <div className="absolute bottom-0 left-0 right-0 z-0">
//         <img
//           src={require("../../img/bg.png")}
//           alt="배경"
//           className="w-full h-auto object-cover rounded-t-2xl"
//         />
//       </div>
//     </div>
//   );
// };

// export default Neighbor;
