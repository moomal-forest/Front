
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import Galpi from '../../components/galpi';
import MainButton from '../../components/mainbutton';
import WhiteButton from '../../components/whitebutton';
import { mockApi } from '../../mocks/mockApi';

const DiaryMain = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [currentDiary, setCurrentDiary] = useState(null);
  const [currentDiaryEntries, setCurrentDiaryEntries] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingEntry, setCurrentPlayingEntry] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const allDiaries = await mockApi.getDiaries();
      setDiaries(allDiaries);

      if (diaryId) {
        const diary = await mockApi.getDiary(diaryId);
        setCurrentDiary(diary);
        const entries = await mockApi.getDiaryEntries(diaryId);
        setCurrentDiaryEntries(entries);
      }
    };

    fetchData();
  }, [diaryId]);

  const handleWrite = () => {
    navigate(`/write/${diaryId}`);
  };
  
  const handleDiaryClick = (clickedDiaryId) => {
    navigate(`/diary/${clickedDiaryId}`);
  };

  const handleDeleteEntry = async (entryId) => {
    await mockApi.deleteEntry(diaryId, entryId);
    const updatedEntries = await mockApi.getDiaryEntries(diaryId);
    setCurrentDiaryEntries(updatedEntries);
  };

  const handleEntryClick = (entry) => {
    if (audioRef.current && entry.song.preview_url) {
      if (currentPlayingEntry === entry.id) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        audioRef.current.src = entry.song.preview_url;
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentPlayingEntry(entry.id);
      }
    } else {
      console.error("Preview URL is not available for this song");
    }
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
            {currentDiaryEntries.map((entry) => (
              <div key={entry.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-pretendard">{entry.date}</span>
                  <span>{entry.emotion}</span>
                </div>
                <p className="mb-2 font-pretendard cursor-pointer" onClick={() => handleEntryClick(entry)}>
                  {entry.content}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-pretendard">
                    ♫ {entry.song.name} - {entry.song.artists.join(", ")}
                    {currentPlayingEntry === entry.id && (
                      <button onClick={() => handleEntryClick(entry)} className="ml-2">
                        {isPlaying ? "⏸️" : "▶️"}
                      </button>
                    )}
                  </span>
                  <WhiteButton text="삭제" onClick={() => handleDeleteEntry(entry.id)} />
                </div>
              </div>
            ))}
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
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default DiaryMain;