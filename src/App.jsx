import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/mainpage/main";
import DiaryPage from "./pages/notification/notification";
import ProfilePage from "./pages/mypage/profile";
import NeighborPage from "./pages/neighbor/neighbor";
import PlaylistPage from "./pages/playlist/emotionplaylist";
import WriteDiary from "./pages/diarypage/writeDiary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notification" element={<DiaryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/neighbor" element={<NeighborPage />} />
        <Route path="/emotionplaylist" element={<PlaylistPage />} />
        <Route path="/write" element={<WriteDiary />} />
      </Routes>
    </Router>
  );
}

export default App;
