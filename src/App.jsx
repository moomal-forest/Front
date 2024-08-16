// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Login from "./pages/auth/login";
// import Signup from "./pages/auth/signup";
// import DiaryCreation from "./pages/diarypage/diaryCreation";
// import DiaryMain from "./pages/diarypage/diarymain";
// import WriteDiary from "./pages/diarypage/writeDiary";
// import Main from "./pages/mainpage/main";
// import ProfilePage from "./pages/mypage/profile";
// import NeighborPage from "./pages/neighbor/neighbor";
// import DiaryPage from "./pages/notification/notification";
// import PlaylistPage from "./pages/playlist/emotionplaylist";

// function App() {
//   return (
//     <Router>

//       <div>
//         <Routes>
//           <Route path="/" element={<Main />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/notification" element={<DiaryPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/neighbor" element={<NeighborPage />} />
//           <Route path="/emotionplaylist" element={<PlaylistPage />} />
//           <Route path="/diaryCreation" element={<DiaryCreation />} />
//           <Route path="/diarymain" element={<DiaryMain />} />
//             <Route path="/write" element={<WriteDiary />} />
//         </Routes>
//       </div>
    
//     </Router>
//   );
// }

// export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import DiaryCreation from "./pages/diarypage/diaryCreation";
import DiaryMain from "./pages/diarypage/diarymain";
import WriteDiary from "./pages/diarypage/writeDiary";
import Main from "./pages/mainpage/main";
import ProfilePage from "./pages/mypage/profile";
import NeighborPage from "./pages/neighbor/neighbor";
import DiaryPage from "./pages/notification/notification";
import PlaylistPage from "./pages/playlist/emotionplaylist";

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
          <Route path="/diarymain" element={<DiaryMain />} />
          <Route path="/write" element={<WriteDiary />} />
          <Route path="/diary/:diaryId" element={<DiaryMain />} /> {/* 새로 추가된 라우트 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;