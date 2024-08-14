import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GreenButton from "../../components/greenbutton";

const WriteDiary = () => {
  const [input, setInput] = useState({
    emotion: "",
    content: "",
    selectedSong: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const emotions = [
    { name: "행복", emoji: "😊" },
    { name: "속상", emoji: "😢" },
    { name: "설렘", emoji: "🥰" },
    { name: "피곤", emoji: "🥱" },
    { name: "짜증", emoji: "😠" },
    { name: "걱정", emoji: "😔" },
    { name: "평온", emoji: "😌" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmotionSelect = (emotion) => {
    setInput((prev) => ({ ...prev, emotion: emotion.name }));
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setError(null);
      const response = await fetch(
        `http://localhost:3080/search?query=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching tracks:", error);
      setError("검색 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleSongSelect = (song) => {
    console.log(song);
    setInput((prev) => ({ ...prev, selectedSong: song }));
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    // 검색 결과 초기화
    setSearchResults([]);
    setSearchQuery("");
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div
      className="container mx-auto mt-8 px-4 py-8 max-w-6xl"
          >
      <h1 className="text-4xl font-bold mb-8 text-center text-green-600">
        일기 작성
      </h1>
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      <form  className="space-y-6 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노래 검색
            </label>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="음악 검색"
                className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                검색
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="mb-6 max-h-60 overflow-y-auto">
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
                          {song.artists.join(", ")}
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-lg inline-block pl-3 pr-3"
                      onClick={() => handleSongSelect(song)}
                    >
                      선택
                    </button>
                  </div>
                ))}
              </div>
            )}
            {input.selectedSong && (
              <div className="mb-4 p-4 bg-green-100 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">선택된 노래</h3>
                <div className="flex items-center">
                  <img
                    src={
                      input.selectedSong.album.images[0]?.url ||
                      "/path/to/default-image.jpg"
                    }
                    alt={input.selectedSong.name}
                    className="w-16 h-16 mr-4 rounded"
                  />
                  <div>
                    <p className="font-semibold">{input.selectedSong.name}</p>
                    <p className="text-sm text-gray-600">
                      {input.selectedSong.artists.join(", ")}
                    </p>
                  </div>
                </div>
                {input.selectedSong.preview_url && (
                  <div className="mt-4">
                    <audio
                      ref={audioRef}
                      src={input.selectedSong.preview_url}
                    />
                    <button
                      onClick={togglePlayPause}
                      className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                      {isPlaying ? "일시정지" : "미리듣기"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              오늘의 감정
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
              {emotions.map((emotion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleEmotionSelect(emotion)}
                  className={`bg-green-100 hover:bg-green-300 rounded-full px-4 py-2 text-green-800 flex items-center justify-center ${
                    input.emotion === emotion.name
                      ? "ring-2 ring-green-500"
                      : ""
                  }`}
                >
                  <span className="mr-2">{emotion.name}</span>
                  <span>{emotion.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            일기 내용
          </label>
          <textarea
            id="content"
            name="content"
            value={input.content}
            onChange={handleChange}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300"
            rows={10}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "일기 저장"}
        </button>
      </form>
    </div>
  );
};

export default WriteDiary;
