
import axios from 'axios';
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Galpi from "../../components/galpi";
import GreenButton from "../../components/greenbutton";
import WhiteButton from "../../components/whitebutton";
import { mockApi } from '../../mocks/mockApi';

const WriteDiary = () => {
  const { diaryId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

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

  const emotions = [
    { name: "😊", label: "행복" },
    { name: "🥲", label: "속상" },
    { name: "🥰", label: "설렘" },
    { name: "🥱", label: "피곤" },
    { name: "😠", label: "짜증" },
    { name: "😔", label: "걱정" },
    { name: "😌", label: "평온" },
  ];
  

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmotionSelect = (emotion) => {
    setInput((prev) => ({ ...prev, emotion: emotion.name }));
  };

  // // 실제 백엔드 API를 사용하는 음악 검색 함수
  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) return;

  //   try {
  //     setError(null);
  //     const response = await fetch(
  //       `http://localhost:3080/search?query=${encodeURIComponent(searchQuery)}`
  //     );
  //     if (!response.ok) throw new Error("Search failed");
  //     const data = await response.json();
  //     setSearchResults(data);
  //   } catch (error) {
  //     console.error("Error searching tracks:", error);
  //     setError("검색 중 오류가 발생했습니다. 다시 시도해 주세요.");
  //   }
  // };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setError(null);

      const response = await axios.get(`http://localhost:3080/api/music/search`, {
        params: { query: searchQuery }
      });
      setSearchResults(response.data);

    } catch (error) {
      console.error("Error searching tracks:", error);
      setError("검색 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleSongSelect = (song) => {
    setInput((prev) => ({ ...prev, selectedSong: song }));
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
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
    if (!input.emotion || !input.content || !input.selectedSong) {
      setError("모든 필드를 채워주세요.");
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    const newEntry = {
      date: getCurrentDate(),
      content: input.content,
      emotion: input.emotion,
      song: {
        name: input.selectedSong.name,
        artists: input.selectedSong.artists,
        preview_url: input.selectedSong.preview_url,
        duration_ms: input.selectedSong.duration_ms, // 추가
        album: {
          images: input.selectedSong.album?.images || []
        }
      }
    };
  
    try {
      await mockApi.createEntry(diaryId, newEntry);
      await mockApi.addRecentMusic({
        ...input.selectedSong,
        duration_ms: input.selectedSong.duration_ms // 이 부분이 있는지 확인
      });  // 여기서 전체 selectedSong 객체를 전달
      console.log("일기를 작성하였습니다.");
      navigate(`/diary/${diaryId}`);
    } catch (error) {
      console.error("Error submitting diary entry:", error);
      setError("일기 작성 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!input.emotion || !input.content || !input.selectedSong) {
  //     setError("모든 필드를 채워주세요.");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   setError(null);

  //   const newEntry = {
  //     date: getCurrentDate(),
  //     content: input.content,
  //     emotion: input.emotion,
  //     song: {
  //       name: input.selectedSong.name,
  //       artists: input.selectedSong.artists.map(artist => artist.name),
  //       preview_url: input.selectedSong.preview_url
  //     }
  //   };

  //   try {
  //     // mockApi를 사용하여 일기 작성
  //     await mockApi.createEntry(diaryId, newEntry);
  //     console.log("일기를 작성하였습니다.");
  //     navigate(`/diary/${diaryId}`);
  //   } catch (error) {
  //     console.error("Error submitting diary entry:", error);
  //     setError("일기 작성 중 오류가 발생했습니다. 다시 시도해 주세요.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <Galpi text={getCurrentDate()} />
        <div className="bg-[#f6f6f6] rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Left Column - Music Search */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">음악 검색</h2>
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
                  {searchResults.map((song, index) => (
                    <div key={index} className="flex justify-between items-center mb-4 last:mb-0">
                      <div className="flex items-center">
                        <img
                          src={song.album.images[0]?.url || "/path/to/default-image.jpg"}
                          alt={song.name}
                          className="w-12 h-12 mr-4 rounded"
                        />
                        <div>
                          <p className="font-bold text-green-700">{song.name}</p>
                          <p className="text-sm text-gray-600">{song.artists.join(", ")}</p>
                        </div>
                      </div>
                      <WhiteButton text="선택" onClick={() => handleSongSelect(song)} />
                    </div>
                  ))}
                </div>
              )}
              {input.selectedSong && (
                <div className="mb-4 p-4 bg-green-100 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">선택된 노래</h3>
                  <div className="flex items-center">
                    <img
                      src={input.selectedSong.album.images[0]?.url || "/path/to/default-image.jpg"}
                      alt={input.selectedSong.name}
                      className="w-16 h-16 mr-4 rounded"
                    />
                    <div>
                      <p className="font-semibold">{input.selectedSong.name}</p>
                      <p className="text-sm text-gray-600">{input.selectedSong.artists.join(", ")}</p>
                    </div>
                  </div>
                  {input.selectedSong.preview_url && (
                    <div className="mt-4">
                      <audio ref={audioRef} src={input.selectedSong.preview_url} />
                      <WhiteButton text={isPlaying ? "일시정지" : "미리듣기"} onClick={togglePlayPause} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Diary Writing */}
            <div className="md:w-1/2">
              <h2 className="text-xl font-bold mb-4">일기 작성</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  오늘의 감정
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {emotions.map((emotion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleEmotionSelect(emotion)}
                      className={`bg-green-100 hover:bg-green-300 rounded-full px-4 py-2 text-green-800 flex items-center justify-center ${
                        input.emotion === emotion.name ? "ring-2 ring-green-500" : ""
                      }`}
                    >
                      <span className="mr-2">{emotion.name}</span>
                      <span>{emotion.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
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
              {error && (
                <div className="mb-4 text-red-500">{error}</div>
              )}
              <div className="flex justify-end space-x-4">
                <WhiteButton text="취소" onClick={() => navigate(-1)} />
                <GreenButton 
                  text={isSubmitting ? "작성 중..." : "작성"} 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                />
              </div>
            </div>
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

export default WriteDiary;
