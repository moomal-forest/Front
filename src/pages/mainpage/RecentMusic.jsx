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
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-2xl font-semibold mb-4 text-custom-brown">
        최근 추가된 음악
      </h3>
      <ul className="space-y-2">
        {recentTracks.map((track) => (
          <li key={track.id} className="flex items-center space-x-2">
            <div className="w-16 h-16 bg-yellow-200"></div>
            <div>
              <p className="font-semibold text-xl text-custom-brown">
                {track.title}
              </p>
              <p className="text-xl text-gray-600">
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
