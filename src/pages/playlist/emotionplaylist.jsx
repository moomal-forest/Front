import React, { useState, useEffect } from "react";
import MainButton from "../../components/mainbutton";
import GreenButton from "../../components/greenbutton";
import WhiteButton from "../../components/whitebutton";

const EmotionPlaylist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);

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
    // 초기 플레이리스트 로드 (예: 로컬 스토리지에서)
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
      <div className="absolute top-4 right-4 z-30">
        <MainButton />
      </div>

      <div className="max-w-2xl mx-auto pt-16 px-4 relative z-10">
        <h1 className="text-4xl font-bold text-green-600 mb-8">
          감정 플레이리스트
        </h1>

        <div className="flex flex-wrap gap-2 justify-around mb-6">
          {emotions.map((emotion, index) => (
            <button
              key={index}
              className="bg-green-100 hover:bg-green-300 rounded-full px-4 py-2 text-green-800 flex items-center"
            >
              <span className="mr-2">{emotion.name}</span>
              <span>{emotion.emoji}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#f6f6f6] pl-6 pr-6 pt-6 pb-3 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="음악 검색"
              className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button onClick={handleSearch} className="text-amber-950 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
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

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {searchResults.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">검색 결과</h2>
              {searchResults.map((song, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-4 last:mb-0"
                >
                  <div className="flex items-center">
                    <img
                      src={
                        song.album.images[0]?.url ||
                        "/path/to/default-image.jpg"
                      }
                      alt={song.name}
                      className="w-12 h-12 mr-4 rounded"
                    />
                    <div>
                      <p className="font-bold text-green-700">{song.name}</p>
                      <p className="text-sm text-gray-600">
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
          <h2 className="text-lg font-bold mb-2">현재 플레이리스트</h2>
          {playlist.map((song, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 last:mb-0"
            >
              <div className="flex items-center">
                <img
                  src={
                    song.album.images[0]?.url || "/path/to/default-image.jpg"
                  }
                  alt={song.name}
                  className="w-12 h-12 mr-4 rounded"
                />
                <div>
                  <p className="font-bold text-green-700">{song.name}</p>
                  <p className="text-sm text-gray-600">
                    {song.artists[0].name} •{" "}
                    {Math.floor(song.duration_ms / 60000)}:
                    {((song.duration_ms % 60000) / 1000)
                      .toFixed(0)
                      .padStart(2, "0")}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <GreenButton text="재생" />
                <WhiteButton
                  text="삭제"
                  onClick={() => removeFromPlaylist(index)}
                />
              </div>
            </div>
          ))}
          <div className="mt-2 text-left text-sm text-green-600">
            <p>
              플레이리스트는 일기를 작성하실 때 선택된 음악들로 이루어집니다.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-0">
        <img src={require("../../img/bg.png")} alt="배경" className="w-full" />
      </div>
    </div>
  );
};

export default EmotionPlaylist;
