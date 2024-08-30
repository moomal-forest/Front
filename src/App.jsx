import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// Auth pages
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

// Main pages
import Main from "./pages/mainpage/main";
import ProfilePage from "./pages/mypage/profile";
import NeighborPage from "./pages/neighbor/neighbor";

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
        <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/neighbor" element={<PrivateRoute><NeighborPage /></PrivateRoute>} />
      
        <Route path="/emotionplaylist" element={<PrivateRoute><PlaylistPage /></PrivateRoute>} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Diary routes */}
        <Route path="/diaryCreation" element={<PrivateRoute><DiaryCreation /></PrivateRoute>} />
        <Route path="/diary/:diaryId" element={<PrivateRoute><DiaryMain /></PrivateRoute>} />
        <Route path="/write/:diaryId" element={<PrivateRoute><WriteDiary /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;