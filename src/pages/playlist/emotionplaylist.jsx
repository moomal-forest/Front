import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoAlertCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import GreenButton from '../../components/greenbutton';
import MainButton from '../../components/mainbutton';
import WhiteButton from '../../components/whitebutton';

const EmotionPlaylist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);
  const audioRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    audioRef.current = new Audio();
    fetchEmotions();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => setPlayingSongId(null);
      audioElement.addEventListener('ended', handleEnded);
      return () => {
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const fetchEmotions = async () => {
    try {
      const response = await axios.get('http://localhost:3080/api/playlists/emotions');
      setEmotions(response.data);
    } catch (error) {
      console.error("Error fetching emotions:", error);
      setError("감정 목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const fetchPlaylist = async (emotionId) => {
    try {
      const response = await axios.get(`http://localhost:3080/api/playlists/playlist/${emotionId}`);
      setPlaylist(response.data.songs);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setError("플레이리스트를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(`http://localhost:3080/api/playlists/search`, {
        params: { q: searchQuery }
      });
      setSearchResults(response.data);
      if (response.data.length === 0) {
        setError("검색 결과가 없습니다. 해당 음악이 플레이리스트에 저장되어 있지 않습니다.");
      } else {
        setError(null);
      }
    } catch (error) {
      console.error("Error searching songs:", error);
      setError("검색 중 오류가 발생했습니다.");
    }
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion._id);
    fetchPlaylist(emotion._id);
    setSearchResults([]);
    setError(null);
  };

  const playSong = (song) => {
    if (audioRef.current) {
      if (playingSongId === song._id) {
        audioRef.current.pause();
        setPlayingSongId(null);
      } else {
        audioRef.current.src = song.previewUrl;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        setPlayingSongId(song._id);
      }
    }
  };

  const renderSongItem = (song) => (
    <div key={song._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 last:mb-0">
      <div className="flex items-center mb-2 sm:mb-0">
        <img
          src={song.albumCover || "/path/to/default-image.jpg"}
          alt={song.title}
          className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 rounded"
        />
        <div>
          <p className="font-bold text-green-700 text-sm sm:text-base">{song.title}</p>
          <p className="text-xs sm:text-sm text-gray-600">{song.artist}</p>
        </div>
      </div>
      <div className="flex space-x-4 mt-2 sm:mt-0">
        {playingSongId === song._id ? (
          <WhiteButton
            text="❚❚"
            onClick={() => playSong(song)}
            style={{ padding: '0.5rem 1rem' }}
          />
        ) : (
          <GreenButton
            text="▶"
            onClick={() => playSong(song)}
            style={{ padding: '0.5rem 1rem' }}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white relative z-20">
      <div onClick={() => navigate('/')} className="absolute top-4 right-4 z-30">
        <MainButton text="메인으로" />
      </div>

      <div className="max-w-6xl mx-auto pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 relative z-10 pb-12 sm:pb-16 md:pb-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-4 sm:mb-6 md:mb-8">
          감정 플레이리스트
        </h1>

        <div className="flex flex-wrap gap-2 justify-around mb-4 sm:mb-6">
          {emotions.map((emotion) => (
            <button
              key={emotion._id}
              onClick={() => handleEmotionSelect(emotion)}
              className={`bg-green-100 hover:bg-green-300 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-green-800 flex items-center whitespace-nowrap ${
                selectedEmotion === emotion._id ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <span className="mr-1 sm:mr-2 text-base sm:text-lg md:text-2xl">{emotion.icon}</span>
              <span className="text-base sm:text-lg md:text-2xl font-pretendard">{emotion.name}</span>
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
              {searchResults.map((song) => renderSongItem(song))}
            </div>
          )}

          <h2 className="text-xl sm:text-2xl font-bold mb-2 font-pretendard text-custom-brown">
            {selectedEmotion ? `${emotions.find(e => e._id === selectedEmotion)?.name} 플레이리스트` : '감정을 선택해주세요'}
          </h2>
          {selectedEmotion && playlist.map((song) => renderSongItem(song))}

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


// import React, { useEffect, useState, useRef } from 'react';
// import { IoAlertCircleOutline } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import GreenButton from '../../components/greenbutton';
// import MainButton from '../../components/mainbutton';
// import WhiteButton from '../../components/whitebutton';
// import { mockApi } from '../../mocks/mockApi';

// const EmotionPlaylist = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [emotionPlaylists, setEmotionPlaylists] = useState({});
//   const [selectedEmotion, setSelectedEmotion] = useState(null);
//   const [error, setError] = useState(null);
//   const [playingSongId, setPlayingSongId] = useState(null);
//   const audioRef = useRef(null);

//   const navigate = useNavigate();

//   const emotions = [
//     { name: "😊", label: "행복" },
//     { name: "🥲", label: "속상" },
//     { name: "🥰", label: "설렘" },
//     { name: "🥱", label: "피곤" },
//     { name: "😠", label: "짜증" },
//     { name: "😔", label: "걱정" },
//     { name: "😌", label: "평온" },
//   ];

//   useEffect(() => {
//     audioRef.current = new Audio();
//     fetchEmotionPlaylists();
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const audioElement = audioRef.current;
//     if (audioElement) {
//       const handleEnded = () => setPlayingSongId(null);
//       audioElement.addEventListener('ended', handleEnded);
//       return () => {
//         audioElement.removeEventListener('ended', handleEnded);
//       };
//     }
//   }, []);

//   const fetchEmotionPlaylists = async () => {
//     try {
//       const playlists = await mockApi.getAllEmotionPlaylists();
//       setEmotionPlaylists(playlists);
//     } catch (error) {
//       console.error("Error fetching emotion playlists:", error);
//       setError("플레이리스트를 불러오는 중 오류가 발생했습니다.");
//     }
//   };

//   const handleSearch = () => {
//     if (!searchQuery.trim()) return;

//     const results = [];
//     for (const emotion in emotionPlaylists) {
//       const matchingSongs = emotionPlaylists[emotion].filter(song =>
//         song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         song.artists.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       results.push(...matchingSongs.map(song => ({ ...song, emotion })));
//     }

//     setSearchResults(results);
//     if (results.length === 0) {
//       setError("검색 결과가 없습니다. 해당 음악이 플레이리스트에 저장되어 있지 않습니다.");
//     } else {
//       setError(null);
//     }
//   };

//   const handleEmotionSelect = (emotion) => {
//     setSelectedEmotion(emotion.name);
//     setSearchResults([]);
//     setError(null);
//   };

//   const getSongId = (song) => `${song.name}-${song.artists}`;

//   const playSong = (song) => {
//     const songId = getSongId(song);
//     if (audioRef.current) {
//       if (playingSongId === songId) {
//         audioRef.current.pause();
//         setPlayingSongId(null);
//       } else {
//         audioRef.current.src = song.preview_url;
//         audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
//         setPlayingSongId(songId);
//       }
//     }
//   };

//   const renderSongItem = (song, emotion) => (
//     <div key={getSongId(song)} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 last:mb-0">
//       <div className="flex items-center mb-2 sm:mb-0">
//       <img
//                       src={song.album?.images[0]?.url || "/path/to/default-image.jpg"}
//                       alt={song.name}
//                       className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 rounded"
//                     />
//         <div>
//           <p className="font-bold text-green-700 text-sm sm:text-base">{song.name}</p>
//           <p className="text-xs sm:text-sm text-gray-600">
//             {song.artists} • {emotion ? emotions.find(e => e.name === emotion)?.label : ''}
//           </p>
//         </div>
//       </div>
//       <div className="flex space-x-4 mt-2 sm:mt-0">
//   {playingSongId === getSongId(song) ? (
//     <WhiteButton
//       text="❚❚"
//       onClick={() => playSong(song)}
//       style={{ padding: '0.5rem 1rem' }} // 좌우 패딩 증가
//     />
//   ) : (
//     <GreenButton
//       text="▶"
//       onClick={() => playSong(song)}
//       style={{ padding: '0.5rem 1rem' }} // 좌우 패딩 증가
//     />
//   )}
// </div>

//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white relative z-20">
//       <div onClick={() => navigate('/')} className="absolute top-4 right-4 z-30">
//         <MainButton text="메인으로" />
//       </div>

//       <div className="max-w-6xl mx-auto pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-8 relative z-10 pb-12 sm:pb-16 md:pb-24">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-4 sm:mb-6 md:mb-8">
//           감정 플레이리스트
//         </h1>

//         <div className="flex flex-wrap gap-2 justify-around mb-4 sm:mb-6">
//           {emotions.map((emotion, index) => (
//             <button
//               key={index}
//               onClick={() => handleEmotionSelect(emotion)}
//               className={`bg-green-100 hover:bg-green-300 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-green-800 flex items-center whitespace-nowrap ${
//                 selectedEmotion === emotion.name ? 'ring-2 ring-green-500' : ''
//               }`}
//             >
//               <span className="mr-1 sm:mr-2 text-base sm:text-lg md:text-2xl">{emotion.name}</span>
//               <span className="text-base sm:text-lg md:text-2xl font-pretendard">{emotion.label}</span>
//             </button>
//           ))}
//         </div>

//         <div className="bg-[#f6f6f6] p-4 sm:p-6 rounded-lg shadow-md">
//           <div className="flex items-center mb-4">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="음악 검색"
//               className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base md:text-lg"
//             />
//             <button onClick={handleSearch} className="text-amber-950 p-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </button>
//           </div>

//           {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}

//           {searchResults.length > 0 && (
//             <div className="mb-6">
//               <h2 className="text-base sm:text-lg font-bold mb-2">검색 결과</h2>
//               {searchResults.map((song) => renderSongItem(song, song.emotion))}
//             </div>
//           )}

//           <h2 className="text-xl sm:text-2xl font-bold mb-2 font-pretendard text-custom-brown">
//             {selectedEmotion ? `${emotions.find(e => e.name === selectedEmotion)?.label} 플레이리스트` : '감정을 선택해주세요'}
//           </h2>
//           {selectedEmotion && emotionPlaylists[selectedEmotion]?.map((song) => renderSongItem(song, selectedEmotion))}

//           <div className="mt-4 text-left text-xs sm:text-sm flex text-green-600">
//             <IoAlertCircleOutline className="mt-[2px] sm:mt-[2.8px] mr-1"/>
//             <p>플레이리스트는 일기를 작성하실 때 선택된 음악들로 이루어집니다.</p>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 z-0">
//         <img src={require("../../img/bg.png")} alt="배경" className="w-full h-auto object-cover" />
//       </div>
//     </div>
//   );
// };

// export default EmotionPlaylist;