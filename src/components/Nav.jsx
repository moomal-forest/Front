// const Nav = () => {
//     return (
//       <nav className="bg-[#f6f6f6] shadow-md mt-4 pb-2">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <h1 className="text-3xl font-bold text-green-600">무말숲</h1>
//               <div className="relative">
//                 <h2 className="text-xs text-green-600 ml-2" style={{ position: 'relative', top: '0.3rem' }}>
//                   나만의 감정 음악 일기 FOREST
//                 </h2>
//               </div>
//             </div>
//             <ul className="flex space-x-4">
//               <li>알림</li>
//               <li>이웃</li>
//               <li>감정플레이리스트</li>
//               <li>내정보</li>
//               <li>로그아웃</li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     );
//   };

// export default Nav;

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header className="">
      <nav className="bg-[#f6f6f6] shadow-md pb-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="text-3xl font-bold text-green-600">
                무말숲
              </Link>
              <div className="relative">
                <h2
                  className="text-xs text-green-600 ml-2"
                  style={{ position: "relative", top: "0.3rem" }}
                >
                  나만의 감정 음악 일기 FOREST
                </h2>
              </div>
            </div>
            <ul className="flex space-x-4">
              <li>
                <Link to="/notification">알림</Link>
              </li>
              <li>
                <Link to="/neighbor">이웃</Link>
              </li>
              <li>
                <Link to="/emotionplaylist">감정플레이리스트</Link>
              </li>
              <li>
                <Link to="/profile">내정보</Link>
              </li>
              <li>로그아웃</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
