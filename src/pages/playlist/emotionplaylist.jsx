
import React, { useEffect, useState } from 'react';
import { IoAlertCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import GreenButton from '../../components/greenbutton';
import MainButton from '../../components/mainbutton';
import WhiteButton from '../../components/whitebutton';

const EmotionPlaylist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const emotions = [
    { name: "행복", emoji: "😊" },
    { name: "속상", emoji: "😢" },
    { name: "설렘", emoji: "🥰" },
    { name: "피곤", emoji: "🥱" },
    { name: "짜증", emoji: "😠" },
    { name: "걱정", emoji: "😔" },
    { name: "평온", emoji: "😌" },
  ];

  useEffect(() => {
    const savedPlaylist = localStorage.getItem("emotionPlaylist");
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setError(null);
      const response = await fetch(
        `http://localhost:3080/search?query=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching tracks:", error);
      setError("검색 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const addToPlaylist = (song) => {
    const updatedPlaylist = [...playlist, song];
    setPlaylist(updatedPlaylist);
    localStorage.setItem("emotionPlaylist", JSON.stringify(updatedPlaylist));
  };

  const removeFromPlaylist = (index) => {
    const updatedPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(updatedPlaylist);
    localStorage.setItem("emotionPlaylist", JSON.stringify(updatedPlaylist));
  };

  return (
    <div className="min-h-screen bg-white relative z-20">
      <div onClick={handleClick} className="absolute top-4 right-4 z-30" >
        <MainButton text="메인으로" />
      </div>

      <div className="max-w-6xl mx-auto pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 relative z-10 pb-12 sm:pb-16 md:pb-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-4 sm:mb-6 md:mb-8">
          감정 플레이리스트
        </h1>

        <div className="flex flex-wrap gap-2 justify-around mb-4 sm:mb-6">
          {emotions.map((emotion, index) => (
            <button
              key={index}
              className="bg-green-100 hover:bg-green-300 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-green-800 flex items-center whitespace-nowrap"
            >
              <span className="mr-1 sm:mr-2 text-base sm:text-lg md:text-2xl font-pretendard">
                {emotion.name}
              </span>
              <span className="text-lg sm:text-xl md:text-2xl">{emotion.emoji}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#f6f6f6] p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="음악 검색"
              className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base md:text-lg"
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

          {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}

          {searchResults.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-bold mb-2">검색 결과</h2>
              {searchResults.map((song, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 last:mb-0"
                >
                  <div className="flex items-center mb-2 sm:mb-0">
                    <img
                      src={
                        song.album.images[0]?.url ||
                        "/path/to/default-image.jpg"
                      }
                      alt={song.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 rounded"
                    />
                    <div>
                      <p className="font-bold text-green-700 text-sm sm:text-base">{song.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {song.artists.join(", ")} •{" "}
                        {Math.floor(song.duration_ms / 60000)}:
                        {((song.duration_ms % 60000) / 1000)
                          .toFixed(0)
                          .padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                  <GreenButton
                    text="추가"
                    onClick={() => addToPlaylist(song)}
                  />
                </div>
              ))}
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-bold mb-2 font-pretendard text-custom-brown">
            현재 플레이리스트
          </h2>
          {playlist.map((song, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 last:mb-0"
            >
              <div className="flex items-center mb-2 sm:mb-0">
                <img
                  src={
                    song.album.images[0]?.url || "/path/to/default-image.jpg"
                  }
                  alt={song.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 rounded"
                />
                <div>
                  <p className="font-bold text-green-700 text-sm sm:text-base">{song.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {song.artists[0].name} •{" "}
                    {Math.floor(song.duration_ms / 60000)}:
                    {((song.duration_ms % 60000) / 1000)
                      .toFixed(0)
                      .padStart(2, "0")}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <GreenButton text="재생" />
                <WhiteButton
                  text="삭제"
                  onClick={() => removeFromPlaylist(index)}
                />
              </div>
            </div>
          ))}

          <div className="mt-4 text-left text-xs sm:text-sm flex text-green-600">
            <IoAlertCircleOutline className="mt-[2px] sm:mt-[2.8px] mr-1"/>
            <p>플레이리스트는 일기를 작성하실 때 선택된 음악들로 이루어집니다.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-0">
        <img src={require("../../img/bg.png")} alt="배경" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default EmotionPlaylist;
