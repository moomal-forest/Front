import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    setSelectedNeighbors((prev) => {
      if (prev.includes(neighbor)) {
        return prev.filter((n) => n !== neighbor);
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
        await axios.post('http://localhost:3080/api/diaries', newDiary);
        navigate("/");  // 메인 페이지로 이동
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
      <div className="max-w-4xl mx-auto pt-8 px-8 relative z-10 flex flex-col ">
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
                {selectedNeighbors.length > 0
                  ? selectedNeighbors.join(", ")
                  : "이웃을 선택하세요"}
              </button>
              {isDropdownOpen && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 z-10 font-pretendard max-h-60 overflow-y-auto">
                  {neighbors.map((neighbor, index) => (
                    <li
                      key={index}
                      className={`p-4 hover:bg-gray-100 cursor-pointer ${
                        selectedNeighbors.includes(
                          `${neighbor.name} (${neighbor.id})`
                        )
                          ? "bg-green-100"
                          : ""
                      }`}
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

          <div className="flex justify-between space-x-4">
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


// import React, { useEffect, useRef, useState } from "react";
// // React 라이브러리에서 useEffect, useRef, useState 훅을 가져옵니다.
// // 이 훅들은 상태 관리, DOM 요소 참조 및 사이드 이펙트 관리를 위해 사용됩니다.

// import { useNavigate } from "react-router-dom";
// // useNavigate 훅은 React Router에서 제공되며, 프로그래밍적으로 다른 경로로 이동할 때 사용됩니다.

// // import MainButton from "../../components/mainbutton";
// // MainButton 컴포넌트를 가져옵니다. (현재 주석 처리되어 있어 사용되지 않습니다.)

// import { mockApi } from "../../mocks/mockApi";
// // mockApi 모듈을 가져옵니다. 이 모듈은 다이어리를 생성하는 API 요청을 처리하는 데 사용됩니다.

// import { neighbors } from "../neighbor/neighbors";
// // neighbors 데이터를 가져옵니다. 이 데이터는 초대할 이웃 목록을 포함합니다.

// const DiaryCreation = () => {
//   const navigate = useNavigate();
//   // useNavigate 훅을 사용하여 navigate 함수를 생성합니다. 이 함수로 다른 경로로 이동할 수 있습니다.

//   const [selectedNeighbors, setSelectedNeighbors] = useState([]);
//   // 선택된 이웃들을 저장하는 상태를 선언합니다. 기본값은 빈 배열입니다.

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   // 드롭다운 메뉴가 열려 있는지 여부를 저장하는 상태를 선언합니다. 기본값은 false입니다.

//   const [selectedColor, setSelectedColor] = useState(null);
//   // 선택된 다이어리 커버 색상을 저장하는 상태를 선언합니다. 기본값은 null입니다.

//   const [diaryName, setDiaryName] = useState("");
//   // 다이어리 이름을 저장하는 상태를 선언합니다. 기본값은 빈 문자열입니다.

//   const dropdownRef = useRef(null);
//   // 드롭다운 메뉴의 DOM 요소를 참조하기 위한 ref를 생성합니다. 이 ref는 드롭다운을 외부 클릭으로 닫을 때 사용됩니다.

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   // 드롭다운 메뉴의 열림/닫힘 상태를 토글하는 함수입니다.

//   const handleSelectNeighbor = (neighbor) => {
//     // neighbor: 사용자가 클릭한 이웃의 정보(이름 또는 ID가 포함된 문자열)입니다.
//     // 이 함수는 선택된 이웃의 상태를 업데이트합니다.

//     setSelectedNeighbors((prev) => {
//       // setSelectedNeighbors: 선택된 이웃들을 관리하는 상태를 업데이트하는 함수입니다.
//       // prev: 이전에 선택된 이웃들의 배열입니다.

//       if (prev.includes(neighbor)) {
//         // prev.includes(neighbor): 이전에 선택된 이웃들 중에 현재 선택된 이웃(neighbor)이 포함되어 있는지 확인합니다.
//         // 포함되어 있으면 true, 포함되어 있지 않으면 false를 반환합니다.

//         return prev.filter((n) => n !== neighbor);
//         // 선택된 이웃이 이미 목록에 포함되어 있을 경우, 해당 이웃을 목록에서 제거합니다.
//         // prev 배열에서 현재 선택된 이웃과 다른 이웃들만 필터링하여 새로운 배열을 반환합니다.
//       } else {
//         // 선택된 이웃이 목록에 포함되어 있지 않으면 else 블록이 실행됩니다.

//         return [...prev, neighbor];
//         // 이전에 선택된 이웃들(prev 배열)에 새로운 이웃(neighbor)을 추가하여 배열을 확장합니다.
//         // spread 연산자(...)를 사용해 기존 배열의 요소들을 복사한 후, 새로운 이웃을 추가하여 새로운 배열을 반환합니다.
//       }
//     });
//   };

//   // 이웃 선택 시 호출되는 함수입니다. 이미 선택된 이웃은 리스트에서 제거하고, 선택되지 않은 이웃은 리스트에 추가합니다.

//   useEffect(() => {
//     //드롭다운 메뉴의 외부 클릭을 감지하고 자동으로 메뉴를 닫기 위해 useEffect를 사용
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         //event.target은 사용자가 클릭한 요소. 즉 사용자가 클릭한 요소가 자식 밖이라면
//         setIsDropdownOpen(false);
//       }
//     };
//     // 드롭다운 메뉴가 현재 존재하고 && 드롭다운 메뉴 외부를 클릭했을 때 드롭다운 메뉴를 닫는 함수입니다.

//     document.addEventListener("mousedown", handleClickOutside);
//     // 외부 클릭 감지를 위해 mousedown 이벤트를 문서에 추가합니다.

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//     // 컴포넌트가 언마운트(DOM에서 제거)될 때 mousedown 이벤트를 제거하여 메모리 누수를 방지합니다.
//   }, []);

//   const colors = [
//     "#86C1AF",
//     "#C0E1D8",
//     "#CBE8E3",
//     "#E0F4ED",
//     "#E4FFBC",
//     "#D5F0AC",
//     "#BFF86A",
//     "#90CBCF",
//     "#B5DEE2",
//     "#CCEEF0",
//     "#E1CEE1",
//     "#D3B8D2",
//     "#9DA8CE",
//     "#BCD9F2",
//     "#EF95AF",
//     "#EAB5C5",
//     "#EDC8D8",
//     "#EFCFD6",
//     "#F0DFE4",
//     "#EBB0AA",
//     "#ECBEB6",
//     "#EBB69F",
//     "#EFD29D",
//     "#F1DFBE",
//     "#F2E7C4",
//     "#F0DBD0",
//     "#E4C3BD",
//     "#EDCCC5",
//   ];
//   // 사용자가 선택할 수 있는 다이어리 커버 색상 목록입니다.

//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//   };
//   // 사용자가 색상을 선택하면 그 색상을 selectedColor 상태에 저장하는 함수입니다.

//   const handleCreate = async () => {
//     if (selectedColor && diaryName) {
//       const newDiary = {
//         name: diaryName,
//         color: selectedColor,
//         type: selectedNeighbors.length > 0 ? "exchange" : "personal",
//         neighbors: selectedNeighbors,
//       };
//       // 사용자가 선택한 정보들(이름, 색상, 이웃)로 새 다이어리 객체를 생성합니다.
//       // 이웃이 선택되었으면 "exchange", 그렇지 않으면 "personal" 타입으로 설정합니다.

//       try {
//         const createdDiary = await mockApi.createDiary(newDiary);
//         // mockApi를 통해 다이어리를 생성하고, 생성된 다이어리 객체를 받아옵니다.

//         navigate(`/diary/${createdDiary.id}`);
//         // 생성된 다이어리의 ID로 새로운 경로로 이동합니다.
//       } catch (error) {
//         console.error("Error creating diary:", error);
//         alert("다이어리 생성 중 오류가 발생했습니다.");
//         // 다이어리 생성 중 오류가 발생하면 콘솔에 에러를 출력하고, 사용자에게 알림을 표시합니다.
//       }
//     } else {
//       alert("다이어리 이름과 색상을 모두 선택해주세요.");
//       // 다이어리 이름과 색상이 선택되지 않은 경우 사용자에게 알림을 표시합니다.
//     }
//   };

//   const handleCancel = () => {
//     navigate("/");
//   };
//   // 사용자가 취소 버튼을 클릭하면 홈 페이지로 이동합니다.

//   return (
//     <div className="h-screen bg-white relative overflow-hidden">
//       {/* 전체 페이지 컨테이너. 화면의 높이를 가득 채우며, 배경색은 흰색, 요소가 오버플로우 될 경우 숨겨집니다. */}

//       {/* 
//       <div className="absolute top-4 right-4 z-30">
//         <MainButton />
//       </div> 
//       */}
//       {/* MainButton 컴포넌트는 주석 처리되어 있습니다. 필요시 주석을 해제하여 사용할 수 있습니다. */}

//       <div className="max-w-4xl mx-auto pt-8 px-8 relative z-10 flex flex-col ">
//         {/* 다이어리 생성 폼이 위치한 컨테이너입니다. 최대 너비는 4xl(약 64rem), 수평 마진은 auto로 가운데 정렬됩니다. */}
//         {/* pt-8로 상단 여백을 주고, px-8로 수평 패딩을 설정합니다. 상대 위치이며, z-인덱스는 10으로 설정됩니다. */}

//         {/* 
//         <h1 className="text-5xl font-bold text-green-600 mb-8 text-center">
//           감정 다이어리 생성
//         </h1> 
//         */}
//         {/* 다이어리 생성 타이틀은 주석 처리되어 있습니다. 필요시 주석을 해제하여 사용할 수 있습니다. */}

//         <div className="flex-grow bg-[#f6f6f6] p-6 rounded-2xl shadow-lg overflow-y-auto">
//           {/* 폼의 메인 컨테이너입니다. 화면의 남은 공간을 채우며, 배경색은 연한 회색, 패딩은 6 단위입니다. */}
//           {/* 모서리는 크게 둥글게 처리되었으며, 그림자 효과를 주어 입체감을 더합니다. 컨텐츠가 많을 경우 수직 스크롤이 가능합니다. */}

//           <div className="mb-3">
//             <label className="block text-xl font-pretendard text-green-600 mb-2">
//               다이어리 이름
//             </label>
//             {/* 다이어리 이름 입력 필드의 라벨입니다. 텍스트는 크게 표시되며, 초록색(#4CAF50)으로 설정됩니다. 하단 여백은 2 단위입니다. */}
//             <input
//               type="text"
//               className="w-full p-4 border border-gray-300 rounded-lg"
//               value={diaryName}
//               onChange={(e) => setDiaryName(e.target.value)}
//             />
//             {/* 다이어리 이름을 입력하는 필드입니다. 전체 너비를 차지하며, 패딩은 4 단위입니다. */}
//             {/* 회색 테두리가 있으며, 모서리는 부드럽게 둥글게 처리되었습니다. 사용자가 입력할 때마다 diaryName 상태가 업데이트됩니다. */}
//           </div>

//           <div className="mb-3">
//             <label className="block text-xl font-pretendard text-green-600 mb-2">
//               초대할 이웃 선택 (다중 선택 가능)
//             </label>
//             {/* 이웃 선택 드롭다운의 라벨입니다. 텍스트는 크게 표시되며, 초록색으로 설정됩니다. 하단 여백은 2 단위입니다. */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 className="w-full p-4 border border-gray-300 rounded-lg text-left"
//                 onClick={toggleDropdown}
//               >
//                 {selectedNeighbors.length > 0
//                   ? selectedNeighbors.join(", ") // 여러명 클릭하면 ,추가해서 더 표시하는 거
//                   : "이웃을 선택하세요"}
//               </button>
//               {/* 이웃 선택 버튼입니다. 전체 너비를 차지하며, 패딩은 4 단위입니다. */}
//               {/* 회색 테두리가 있으며, 모서리는 부드럽게 둥글게 처리되었습니다. */}
//               {/* 이웃이 선택되면 선택된 이웃을 표시하고, 그렇지 않으면 기본 텍스트를 표시합니다. */}
//               {isDropdownOpen && (
//                 <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 z-10 font-pretendard max-h-60 overflow-y-auto">
//                   {neighbors.map((neighbor, index) => (
//                     <li
//                       key={index}
//                       className={`p-4 hover:bg-gray-100 cursor-pointer ${
//                         selectedNeighbors.includes(
//                           `${neighbor.name} (${neighbor.id})`
//                         )
//                           ? "bg-green-100"
//                           : "" // 현재 항목이 selectedNeighbors 배열에 포함되어 있으면 배경색을 연두색(green-100)으로 변경합니다. 그렇지 않으면 기본 배경색을 유지합니다.
//                       }`}
//                       onClick={() =>
//                         handleSelectNeighbor(
//                           `${neighbor.name} (${neighbor.id})`
//                         )
//                       }
//                     >
//                       {neighbor.name} ({neighbor.id})
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               {/* 드롭다운 메뉴가 열려 있는 경우, 이웃 선택 목록을 표시합니다. */}
//               {/* 선택된 이웃은 초록색 배경으로 표시됩니다. 드롭다운 메뉴는 최대 높이가 60 단위(약 240px)이며, 스크롤이 가능합니다. */}
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="block text-xl font-pretendard text-green-600 mb-2">
//               커버색상 선택
//             </label>
//             {/* 커버 색상 선택 라벨입니다. 텍스트는 크게 표시되며, 초록색으로 설정됩니다. 하단 여백은 2 단위입니다. */}
//             <div className="bg-white p-6 rounded-lg flex justify-center items-center">
//               <div className="grid grid-cols-7 gap-4">
//                 {colors.map((color, index) => (
//                   <button
//                     key={index}
//                     className={`w-10 h-10 rounded-full ${
//                       selectedColor === color ? "ring-2 ring-green-500" : ""
//                     }`}
//                     style={{ backgroundColor: color }}
//                     onClick={() => handleColorSelect(color)}
//                   />
//                 ))}
//               </div>
//             </div>
//             {/* 사용자가 커버 색상을 선택할 수 있는 색상 팔레트입니다. */}
//             {/* 팔레트는 7개의 열로 구성된 그리드로 표시되며, 각 색상은 원형 버튼으로 표시됩니다. */}
//             {/* 선택된 색상은 초록색 테두리(ring)로 강조 표시됩니다. */}
//           </div>

//           <div className="flex justify-between space-x-4">
//             <button
//               className="flex-1 py-3 bg-[#4CAF50] text-white rounded-lg text-2xl font-pretendard"
//               onClick={handleCreate}
//             >
//               만들기
//             </button>
//             <button
//               className="flex-1 py-3 bg-white text-[#4CAF50] border border-[#4CAF50] rounded-lg text-2xl font-pretendard"
//               onClick={handleCancel}
//             >
//               취소
//             </button>
//             {/* "만들기"와 "취소" 버튼입니다. 각각 생성 및 취소 동작을 트리거합니다. */}
//             {/* 만들기 버튼은 초록색 배경에 흰색 텍스트로 표시되며, 취소 버튼은 흰색 배경에 초록색 테두리와 텍스트로 표시됩니다. */}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 z-0">
//         <img
//           src={require("../../img/bg.png")}
//           alt="배경"
//           className="w-full h-auto object-cover rounded-t-2xl"
//         />
//         {/* 페이지 하단에 배경 이미지를 추가합니다. 이미지는 절대 위치에 배치되어 있으며, 전체 너비를 차지합니다. */}
//         {/* 이미지는 상단 모서리가 둥글게 처리되어 있습니다. */}
//       </div>
//     </div>
//   );
// };

// export default DiaryCreation;
// // DiaryCreation 컴포넌트를 내보냅니다. 이 컴포넌트는 다이어리 생성 폼을 렌더링합니다.
