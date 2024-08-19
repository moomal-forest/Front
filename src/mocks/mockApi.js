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
        emotion: '행복', 
        song: {
          name: '행복한 노래',
          artists: ['가수A'],
          preview_url: 'https://example.com/preview1.mp3'
        }
      },
      { 
        id: '102', 
        date: '2024년 8월 20일 화요일', 
        content: '조금 피곤한 하루였다.', 
        emotion: '피곤', 
        song: {
          name: '잔잔한 노래',
          artists: ['가수B'],
          preview_url: 'https://example.com/preview2.mp3'
        }
      },
    ],
    '2': [
      { 
        id: '201', 
        date: '2024년 8월 19일 월요일', 
        content: '친구와 좋은 시간을 보냈다.', 
        emotion: '설렘', 
        song: {
          name: '신나는 노래',
          artists: ['가수C', '가수D'],
          preview_url: 'https://example.com/preview3.mp3'
        }
      },
    ],
  };
  
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const mockApi = {
    getDiaries: async () => {
      await delay(300);
      return [...diaries];
    },
  
    createDiary: async (newDiary) => {
      await delay(300);
      const diary = { ...newDiary, id: Date.now().toString() };
      diaries.push(diary);
      entries[diary.id] = [];
      return diary;
    },
  
    getDiary: async (diaryId) => {
      await delay(200);
      return diaries.find(diary => diary.id === diaryId);
    },
  
    getDiaryEntries: async (diaryId) => {
      await delay(300);
      return entries[diaryId] || [];
    },
  
    createEntry: async (diaryId, newEntry) => {
      await delay(300);
      const entry = { ...newEntry, id: Date.now().toString() };
      if (!entries[diaryId]) {
        entries[diaryId] = [];
      }
      entries[diaryId].push(entry);
      return entry;
    },
  
    deleteEntry: async (diaryId, entryId) => {
      await delay(200);
      entries[diaryId] = entries[diaryId].filter(entry => entry.id !== entryId);
    },
  
    searchSongs: async (query) => {
      await delay(500);
      return [
        {
          id: '1',
          name: `${query} - 인기곡`,
          artists: ['가수A'],
          album: { images: [{ url: 'https://example.com/album1.jpg' }] },
          preview_url: 'https://example.com/preview1.mp3',
        },
        {
          id: '2',
          name: `${query} - 최신곡`,
          artists: ['가수B', '가수C'],
          album: { images: [{ url: 'https://example.com/album2.jpg' }] },
          preview_url: 'https://example.com/preview2.mp3',
        },
        {
          id: '3',
          name: `또 다른 ${query} 노래`,
          artists: ['가수D'],
          album: { images: [{ url: 'https://example.com/album3.jpg' }] },
          preview_url: 'https://example.com/preview3.mp3',
        },
      ];
    },
  };