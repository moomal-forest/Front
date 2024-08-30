import axios from 'axios';
import React, { useEffect, useState } from "react";

const RecentMusic = () => {
  const [recentTracks, setRecentTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentMusic = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3080/api/music/recent');
        setRecentTracks(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch recent music:", err);
        setError("최근 음악을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentMusic();
  }, []);

  if (isLoading) {
    return <div className="bg-white rounded-lg p-3 sm:p-4">로딩 중...</div>;
  }

  if (error) {
    return <div className="bg-white rounded-lg p-3 sm:p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4">
      <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-custom-brown">
        최근 추가된 음악
      </h3>
      {recentTracks.length === 0 ? (
        <p className="text-gray-500">최근에 추가된 음악이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {recentTracks.map((track, index) => (
            <li key={index} className="flex items-center space-x-2">
              <img 
                src={track.albumCover || "/path/to/default-album-image.jpg"}
                alt={track.title} 
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-base sm:text-xl text-custom-brown">
                  {track.title}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  {track.artist}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentMusic;

// import React, { useEffect, useState } from "react";
// import { mockApi } from '../../mocks/mockApi';

// const RecentMusic = () => {
//   const [recentTracks, setRecentTracks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecentMusic = async () => {
//       try {
//         setIsLoading(true);
//         const music = await mockApi.getRecentMusic();
//         setRecentTracks(music);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch recent music:", err);
//         setError("최근 음악을 불러오는 데 실패했습니다.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRecentMusic();
//   }, []);

//   const formatArtists = (artists) => {
//     if (Array.isArray(artists)) {
//       return artists.join(", ");
//     } else if (typeof artists === 'string') {
//       return artists;
//     } else {
//       return "Unknown Artist";
//     }
//   };

//   if (isLoading) {
//     return <div className="bg-white rounded-lg p-3 sm:p-4">로딩 중...</div>;
//   }

//   if (error) {
//     return <div className="bg-white rounded-lg p-3 sm:p-4 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg p-3 sm:p-4">
//       <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-custom-brown">
//         최근 추가된 음악
//       </h3>
//       {recentTracks.length === 0 ? (
//         <p className="text-gray-500">최근에 추가된 음악이 없습니다.</p>
//       ) : (
//         <ul className="space-y-2">
//           {recentTracks.map((track, index) => (
//             <li key={index} className="flex items-center space-x-2">
//               <img 
//                 src={track.image || "/path/to/default-album-image.jpg"}
//                 alt={track.name} 
//                 className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
//               />
//               <div>
//                 <p className="font-semibold text-base sm:text-xl text-custom-brown">
//                   {track.name}
//                 </p>
//                 <p className="text-sm sm:text-base text-gray-600">
//                   {formatArtists(track.artists)}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RecentMusic;