import React, { useState } from "react";
import { GoBell } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import NotificationPopup from "../components/NotificationPopup";

const Nav = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthService.logout();
    navigate("/login");
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <nav className="bg-[#f6f6f6] shadow-md mt-4 pb-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <Link
                to="/"
                className="text-2xl sm:text-4xl font-bold text-green-600 font-pretendard"
              >
                무말숲
              </Link>
              <h2
                className="text-xs sm:text-base text-green-600 font-pretendard hidden sm:inline"
              >
                나만의 감정 음악 일기 FOREST
              </h2>
            </div>

            <ul className="flex items-center space-x-2 sm:space-x-4">
              <li>
                <button
                  onClick={togglePopup}
                  className="text-sm sm:text-lg font-pretendard relative"
                >
                  <GoBell />
                  {/* Badge or Notification count can be added here */}
                </button>
              </li>
              <li>
                <Link to="/neighbor" className="text-sm sm:text-lg font-pretendard">
                  이웃
                </Link>
              </li>
              <li>
                <Link to="/emotionplaylist" className="text-sm sm:text-lg font-pretendard">
                  감플리
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm sm:text-lg font-pretendard">
                  내정보
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-sm sm:text-lg font-pretendard">
                  로그아웃
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Notification Popup */}
      <NotificationPopup isOpen={isPopupOpen} onClose={togglePopup} />
    </>
  );
};

export default Nav;
