// mockApi.js

// 초기 데이터 설정
let diaries = [
  { id: '1', name: '개인 일기', type: 'personal', color: '#86C1AF' },
  { id: '2', name: '교환 일기', type: 'exchange', color: '#EF95AF' },
];

let entries = {
  '1': [
    { 
      id: '101', 
      date: '2024년 8월 19일 월요일', 
      content: '오늘은 좋은 날이었다.', 
      emotion: '😊', 
      song: {
        name: '행복한 노래',
        artists: ['가수A'],
        preview_url: 'https://example.com/preview1.mp3',
        image: 'https://example.com/image1.jpg'
      }
    },
    { 
      id: '102', 
      date: '2024년 8월 20일 화요일', 
      content: '조금 피곤한 하루였다.', 
      emotion: '🥱', 
      song: {
        name: '잔잔한 노래',
        artists: ['가수B'],
        preview_url: 'https://example.com/preview2.mp3',
        image: 'https://example.com/image2.jpg'
      }
    },
  ],
  '2': [
    { 
      id: '201', 
      date: '2024년 8월 19일 월요일', 
      content: '친구와 좋은 시간을 보냈다.', 
      emotion: '🥰', 
      song: {
        name: '신나는 노래',
        artists: ['가수C', '가수D'],
        preview_url: 'https://example.com/preview3.mp3',
        image: 'https://example.com/image3.jpg'
      }
    },
  ],
};

let recentMusic = [];

// API 요청 지연을 시뮬레이션하는 함수
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const millisToMinutesAndSeconds = (millis) => {
//   const minutes = Math.floor(millis / 60000);
//   const seconds = ((millis % 60000) / 1000).toFixed(0);
//   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// };

// 가짜 API 함수들
export const mockApi = {
  // 모든 다이어리 가져오기
  getDiaries: async () => {
    await delay(300);
    return [...diaries];
  },

  // 새 다이어리 생성
  createDiary: async (newDiary) => {
    await delay(300);
    const diary = { ...newDiary, id: Date.now().toString() };
    diaries.push(diary);
    entries[diary.id] = [];
    return diary;
  },

  // 특정 다이어리 가져오기
  getDiary: async (diaryId) => {
    await delay(200);
    return diaries.find(diary => diary.id === diaryId);
  },

  // 특정 다이어리의 모든 엔트리 가져오기
  getDiaryEntries: async (diaryId) => {
    await delay(300);
    return entries[diaryId] || [];
  },

  // 새 엔트리 생성
  createEntry: async (diaryId, newEntry) => {
    await delay(300);
    const entry = { ...newEntry, id: Date.now().toString() };
    if (!entries[diaryId]) {
      entries[diaryId] = [];
    }
    entries[diaryId].push(entry);
    return entry;
  },

  // 엔트리 삭제
  deleteEntry: async (diaryId, entryId) => {
    await delay(200);
    entries[diaryId] = entries[diaryId].filter(entry => entry.id !== entryId);
  },

  // 최근 음악 추가
  addRecentMusic: async (song) => {
    if (!song) return;
  
    console.log("Received song:", song); // 디버깅을 위해 추가
  
    const formattedSong = {
      name: song.name || "Unknown Title",
      artists: Array.isArray(song.artists) 
        ? song.artists.map(artist => artist.name || artist).join(", ")
        : typeof song.artists === 'string' 
          ? song.artists 
          : "Unknown Artist",
      // duration: song.duration_ms 
      //   ? millisToMinutesAndSeconds(song.duration_ms) 
      //   : (song.duration || "0:00"),
      image: song.album && song.album.images && song.album.images[0] 
        ? song.album.images[0].url 
        : "default_image_url"
    };
  
    console.log("Formatted song:", formattedSong); // 디버깅을 위해 추가
  
    recentMusic.unshift(formattedSong);
    if (recentMusic.length > 5) {
      recentMusic = recentMusic.slice(0, 5);
    }
  },

  // 최근 음악 가져오기
  getRecentMusic: async () => {
    await delay(300);
    return recentMusic;
  },
};