import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Auth pages
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

// Main pages
import Main from "./pages/mainpage/main";
import ProfilePage from "./pages/mypage/profile";
import NeighborPage from "./pages/neighbor/neighbor";
import DiaryPage from "./pages/notification/notification";
import PlaylistPage from "./pages/playlist/emotionplaylist";

// Diary pages
import DiaryCreation from "./pages/diarypage/diaryCreation";
import DiaryMain from "./pages/diarypage/diarymain";
import WriteDiary from "./pages/diarypage/writeDiary";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/neighbor" element={<NeighborPage />} />
        <Route path="/notification" element={<DiaryPage />} />
        <Route path="/emotionplaylist" element={<PlaylistPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Diary routes */}
        <Route path="/diaryCreation" element={<DiaryCreation />} />
        <Route path="/diary/:diaryId" element={<DiaryMain />} />
        <Route path="/write/:diaryId" element={<WriteDiary />} />
      </Routes>
    </Router>
  );
}

export default App;