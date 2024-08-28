// mockApi.js

// 초기 데이터 설정
let diaries = [
  { id: "1", name: "개인 일기", type: "personal", color: "#86C1AF" }, // 개인 일기
  { id: "2", name: "교환 일기", type: "exchange", color: "#EF95AF" }, // 교환 일기
];

let entries = {
  1: [
    {
      id: "101",
      date: "2024년 8월 19일 월요일",
      content: "오늘은 좋은 날이었다.",
      emotion: "😊",
      song: {
        // 일기와 연결된 음악 정보
        name: "행복한 노래",
        artists: ["가수A"],
        preview_url: "https://example.com/preview1.mp3",
        image: "https://example.com/image1.jpg",
      },
    },
    {
      id: "102",
      date: "2024년 8월 20일 화요일",
      content: "조금 피곤한 하루였다.",
      emotion: "🥱",
      song: {
        // 일기와 연결된 음악 정보
        name: "잔잔한 노래",
        artists: ["가수B"],
        preview_url: "https://example.com/preview2.mp3",
        image: "https://example.com/image2.jpg",
      },
    },
  ],
  2: [
    {
      id: "201",
      date: "2024년 8월 19일 월요일",
      content: "친구와 좋은 시간을 보냈다.",
      emotion: "🥰",
      song: {
        // 일기와 연결된 음악 정보
        name: "신나는 노래",
        artists: ["가수C", "가수D"],
        preview_url: "https://example.com/preview3.mp3",
        image: "https://example.com/image3.jpg",
      },
    },
  ],
};

// 최근 추가된 음악을 저장하는 배열
let recentMusic = [];

let emotionPlaylists = {};

// API 요청 지연을 시뮬레이션하는 함수
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 가짜 API 함수들
export const mockApi = {
  // 모든 다이어리 가져오기
  getDiaries: async () => {
    await delay(300); // 300ms 지연
    return [...diaries]; // 다이어리 목록 복사 및 반환
  },

  // 새 다이어리 생성
  createDiary: async (newDiary) => {
    await delay(300); // 300ms 지연
    const diary = { ...newDiary, id: Date.now().toString() }; // 새 다이어리 생성
    diaries.push(diary); // 다이어리 목록에 추가
    entries[diary.id] = []; // 새 다이어리의 엔트리 배열 초기화
    return diary; // 생성된 다이어리 반환
  },

  // 특정 다이어리 가져오기
  getDiary: async (diaryId) => {
    await delay(200); // 200ms 지연
    return diaries.find((diary) => diary.id === diaryId); // 다이어리 ID로 다이어리 찾기
  },

  // 특정 다이어리의 모든 엔트리 가져오기
  getDiaryEntries: async (diaryId) => {
    await delay(300); // 300ms 지연
    return entries[diaryId] || []; // 해당 다이어리의 엔트리 배열 반환
  },

  // 새 엔트리 생성
  createEntry: async (diaryId, newEntry) => {
    await delay(300); // 300ms 지연
    const entry = { ...newEntry, id: Date.now().toString() }; // 새 엔트리 생성
    if (!entries[diaryId]) {
      // 해당 다이어리의 엔트리 배열이 없으면 초기화
      entries[diaryId] = [];
    }
    entries[diaryId].push(entry); // 엔트리 배열에 추가
    return entry; // 생성된 엔트리 반환
  },

  // 엔트리 삭제
  deleteEntry: async (diaryId, entryId) => {
    await delay(200); // 200ms 지연
    entries[diaryId] = entries[diaryId].filter((entry) => entry.id !== entryId); // 해당 엔트리 삭제
  },

  // 최근 음악 추가
  addRecentMusic: async (song) => {
    if (!song) return; // song이 없으면 반환

    console.log("Received song:", song); // 디버깅용 로그 추가

    const formattedSong = {
      name: song.name || "Unknown Title", // 음악 제목, 없으면 "Unknown Title"
      artists: Array.isArray(song.artists)
        ? song.artists.map((artist) => artist.name || artist).join(", ") // 여러 아티스트 처리
        : typeof song.artists === "string"
        ? song.artists
        : "Unknown Artist", // 아티스트 정보, 없으면 "Unknown Artist"
      image:
        song.album && song.album.images && song.album.images[0]
          ? song.album.images[0].url // 앨범 이미지 URL
          : "default_image_url", // 없으면 기본 이미지 URL
    };

    console.log("Formatted song:", formattedSong); // 디버깅용 로그 추가

    recentMusic.unshift(formattedSong); // 최근 음악 목록의 맨 앞에 추가
    if (recentMusic.length > 5) {
      // 최근 음악이 5개를 넘으면
      recentMusic = recentMusic.slice(0, 5); // 5개로 자르기
    }
  },

  // 최근 음악 가져오기
  getRecentMusic: async () => {
    await delay(300); // 300ms 지연
    return recentMusic; // 최근 음악 목록 반환
  },


  addSongToEmotionPlaylist: async (emotion, song) => {
    await delay(200);
    if (!emotionPlaylists[emotion]) {
      emotionPlaylists[emotion] = [];
    }
    emotionPlaylists[emotion].push(song);
  },

  // 감정별 플레이리스트 가져오기
  getEmotionPlaylist: async (emotion) => {
    await delay(300);
    return emotionPlaylists[emotion] || [];
  },

  // 모든 감정 플레이리스트 가져오기
  getAllEmotionPlaylists: async () => {
    await delay(300);
    return emotionPlaylists;
  }

};
