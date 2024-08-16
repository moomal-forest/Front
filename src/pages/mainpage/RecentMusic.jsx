
import React from "react";

const RecentMusic = () => {
  const recentTracks = [
    { id: 1, title: "민들레 (single.ver)", artist: "우효", duration: "4:13" },
    { id: 2, title: "민들레 (single.ver)", artist: "우효", duration: "4:13" },
    { id: 3, title: "민들레 (single.ver)", artist: "우효", duration: "4:13" },
    { id: 4, title: "민들레 (single.ver)", artist: "우효", duration: "4:13" },
    { id: 5, title: "민들레 (single.ver)", artist: "우효", duration: "4:13" },
  ];

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4">
      <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-custom-brown">
        최근 추가된 음악
      </h3>
      <ul className="space-y-2">
        {recentTracks.map((track) => (
          <li key={track.id} className="flex items-center space-x-2">
            <img src={require(`../../img/민들레.png`)}
                  alt="민들레" className="w-12 h-12 sm:w-16 sm:h-16"></img>
            <div>
              <p className="font-semibold text-base sm:text-xl text-custom-brown">
                {track.title}
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                {track.artist} • {track.duration}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentMusic;