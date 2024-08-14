import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/mainpage/main';
import DiaryPage from './pages/notification/notification';
import ProfilePage from './pages/mypage/profile';
import NeighborPage from './pages/neighbor/neighbor';
import PlaylistPage from './pages/playlist/emotionplaylist';

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/notification" element={<DiaryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/neighbor" element={<NeighborPage />} />
          <Route path="/emotionplaylist" element={<PlaylistPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;