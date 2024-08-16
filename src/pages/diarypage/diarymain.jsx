// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Nav from '../../components/Nav';
// import Galpi from '../../components/galpi';
// import MainButton from '../../components/mainbutton';

// const DiaryMainPage = () => {
//   const navigate = useNavigate();
//   const {diaryId} = useParams();
//   const [diaries, setDiaries] = useState([]);
//   const [currentDiary, setCurrentDiary] = useState(null);
//   const [currentDiaryEntries, setCurrentDiaryEntries] = useState([]);

//   useEffect(() => {
//     // 로컬 스토리지에서 다이어리 목록 불러오기
//     const storedDiaries = JSON.parse(localStorage.getItem('diaries') || '[]');
//     setDiaries(storedDiaries);

//     const diary = storedDiaries.find(d => d.id === diaryId);
//     if (diary) {
//         setCurrentDiary(diary);
//     }
//     else {
//       setCurrentDiary(null);
//     }

//     // 현재 선택된 다이어리의 엔트리들 불러오기 (예시 데이터)
//     setCurrentDiaryEntries([
//       { date: '2024년 8월 7일 수요일', content: '오늘은 매우매우 기분이 좋은 날이었다!!..', emotion: '🥰', song: '민들레', likes: 7 },
//       { date: '2024년 8월 6일 화요일', content: '아앙 오늘은 머 별거 안했는데 하루종일 졸려 ~~', emotion: '🥱', song: 'Thinking Out Loud', likes: 5 },
//       { date: '2024년 8월 5일 월요일', content: '악간 화나는 일이 있었음. 나는 분명 립밤을 가방에...', emotion: '😠', song: '민들레', likes: 10 },
//       { date: '2024년 8월 4일 일요일', content: '오늘은 다연이를 봐서 기분이 좋았당 그냥 보고만...', emotion: '☺️', song: '민들레', likes: 8 },
//     ]);
//   }, [diaryId]);

//   const handleWrite = () => {
//     navigate('/write');
//   };
  
//   const handleDiaryClick = (clickedDiaryId) => {
//     navigate(`/diary/${clickedDiaryId}`);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
//       <Nav />
//       <main className="flex-grow container mx-auto px-4 py-8 flex">
//         <div className="w-3/4 pr-8">
//           <div className="flex justify-between items-center">
//             <Galpi text={currentDiary ? currentDiary.name : '다이어리'} />
//             <div onClick={handleWrite}><MainButton text="기록하기" /></div>
            
//           </div>
//           <div className="bg-white rounded-lg p-6">
//             {currentDiaryEntries.map((entry, index) => (
//               <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-pretendard">{entry.date}</span>
//                   <span>{entry.emotion}</span>
//                 </div>
//                 <p className="mb-2 font-pretendard">{entry.content}</p>
//                 <div className="flex justify-between items-center">
//                   <span className="font-pretendard">♫ {entry.song}</span>
//                   <span className="font-pretendard">♥ {entry.likes}</span>
//                 </div>
//               </div>
//             ))}
//             <div className="flex justify-between mt-4">
//               <button className="font-pretendard">← Previous</button>
//               <button className="font-pretendard">Next →</button>
//             </div>
//           </div>
//         </div>
        
//         <div className="w-1/4">
//           <h3 className="text-lg font-bold mb-4 font-pretendard">다이어리 목록</h3>
//           <div className="bg-white rounded-lg p-4">
//             <Galpi text="개인 다이어리" />
//             <ul className="mt-2">
//               {diaries.filter(d => d.type === 'personal').map((diary) => (
//                 <li 
//                   key={diary.id} 
//                   className="mb-2 font-pretendard cursor-pointer hover:text-green-600"
//                   onClick={() => handleDiaryClick(diary.id)}
//                 >
//                   {diary.name}
//                 </li>
//               ))}
//             </ul>
//             <Galpi text="교환 다이어리" />
//             <ul className="mt-2">
//               {diaries.filter(d => d.type === 'exchange').map((diary) => (
//                 <li 
//                   key={diary.id} 
//                   className="mb-2 font-pretendard cursor-pointer hover:text-green-600"
//                   onClick={() => handleDiaryClick(diary.id)}
//                 >
//                   {diary.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </main>
      
//     </div>
//   );
// };

// export default DiaryMainPage;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import Galpi from '../../components/galpi';
import MainButton from '../../components/mainbutton';

const DiaryMainPage = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [currentDiary, setCurrentDiary] = useState(null);
  const [currentDiaryEntries, setCurrentDiaryEntries] = useState([]);

  useEffect(() => {
    const storedDiaries = JSON.parse(localStorage.getItem('diaries') || '[]');
    setDiaries(storedDiaries);

    const diary = storedDiaries.find(d => d.id === diaryId);
    if (diary) {
      setCurrentDiary(diary);
    } else {
      setCurrentDiary(null);
    }

    // 현재 선택된 다이어리의 엔트리들 불러오기 (예시 데이터)
    setCurrentDiaryEntries([
      { date: '2024년 8월 7일 수요일', content: '오늘은 매우매우 기분이 좋은 날이었다!!..', emotion: '🥰', song: '민들레', likes: 7 },
      { date: '2024년 8월 6일 화요일', content: '아앙 오늘은 머 별거 안했는데 하루종일 졸려 ~~', emotion: '🥱', song: 'Thinking Out Loud', likes: 5 },
      { date: '2024년 8월 5일 월요일', content: '악간 화나는 일이 있었음. 나는 분명 립밤을 가방에...', emotion: '😠', song: '민들레', likes: 10 },
      { date: '2024년 8월 4일 일요일', content: '오늘은 다연이를 봐서 기분이 좋았당 그냥 보고만...', emotion: '☺️', song: '민들레', likes: 8 },
    ]);
  }, [diaryId]);

  const handleWrite = () => {
    navigate('/write');
  };
  
  const handleDiaryClick = (clickedDiaryId) => {
    navigate(`/diary/${clickedDiaryId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
      <Nav />
      <main className="flex-grow container mx-auto px-4 py-8 flex">
        <div className="w-3/4 pr-8">
          <div className="flex justify-between items-center">
            <Galpi text={currentDiary ? currentDiary.name : '다이어리'} />
            <div onClick={handleWrite}><MainButton text="기록하기" /></div>
          </div>
          <div className="bg-white rounded-lg p-6">
            {currentDiaryEntries.map((entry, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-pretendard">{entry.date}</span>
                  <span>{entry.emotion}</span>
                </div>
                <p className="mb-2 font-pretendard">{entry.content}</p>
                <div className="flex justify-between items-center">
                  <span className="font-pretendard">♫ {entry.song}</span>
                  <span className="font-pretendard">♥ {entry.likes}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button className="font-pretendard">← Previous</button>
              <button className="font-pretendard">Next →</button>
            </div>
          </div>
        </div>
        
        <div className="w-1/4">
          <h3 className="text-lg font-bold mb-4 font-pretendard">다이어리 목록</h3>
          <div className="bg-white rounded-lg p-4">
            <Galpi text="개인 다이어리" />
            <ul className="mt-2">
              {diaries.filter(d => d.type === 'personal').map((diary) => (
                <li 
                  key={diary.id} 
                  className={`mb-2 font-pretendard cursor-pointer hover:text-green-600 ${diary.id === diaryId ? 'text-green-600 font-bold' : ''}`}
                  onClick={() => handleDiaryClick(diary.id)}
                >
                  {diary.name}
                </li>
              ))}
            </ul>
            <Galpi text="교환 다이어리" />
            <ul className="mt-2">
              {diaries.filter(d => d.type === 'exchange').map((diary) => (
                <li 
                  key={diary.id} 
                  className={`mb-2 font-pretendard cursor-pointer hover:text-green-600 ${diary.id === diaryId ? 'text-green-600 font-bold' : ''}`}
                  onClick={() => handleDiaryClick(diary.id)}
                >
                  {diary.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiaryMainPage;