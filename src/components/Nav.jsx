import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-[#f6f6f6] shadow-md mt-4 pb-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-4xl font-bold text-green-600 font-pretendard"
            >
              무말숲
            </Link>
            <div className="relative">
              <h2
                className="text-base text-green-600 ml-4 font-pretendard"
                style={{ position: "relative", top: "0.2rem" }}
              >
                나만의 감정 음악 일기 FOREST
              </h2>
            </div>
          </div>

          <ul className="flex space-x-4">
            <li>
              <Link to="/notification" className="text-lg font-pretendard">
                알림
              </Link>
            </li>
            <li>
              <Link to="/neighbor" className="text-lg font-pretendard">
                이웃
              </Link>
            </li>
            <li>
              <Link to="/emotionplaylist" className="text-lg font-pretendard">
                감정플레이리스트
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-lg font-pretendard">
                내정보
              </Link>
            </li>
            <li className="text-lg font-pretendard">로그아웃</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
