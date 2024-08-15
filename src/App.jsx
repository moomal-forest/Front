import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/mainpage/main";
import DiaryPage from "./pages/notification/notification";
import ProfilePage from "./pages/mypage/profile";
import NeighborPage from "./pages/neighbor/neighbor";
import PlaylistPage from "./pages/playlist/emotionplaylist";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import DiaryCreation from "./pages/diarypage/diaryCreation";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notification" element={<DiaryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/neighbor" element={<NeighborPage />} />
          <Route path="/emotionplaylist" element={<PlaylistPage />} />
          <Route path="/diaryCreation" element={<DiaryCreation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
