import axios from 'axios';
import React, { useEffect, useState } from "react";

const MonthlyEmotion = () => {
  const [monthlyEmotion, setMonthlyEmotion] = useState(null);

  useEffect(() => {
    const fetchMonthlyEmotion = async () => {
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // JavaScript의 월은 0부터 시작하므로 1을 더합니다.

        const response = await axios.get(`http://localhost:3080/api/posts/monthly-emotion`, {
          params: { year, month }
        });

        setMonthlyEmotion(response.data.emotion);
      } catch (error) {
        console.error("Error fetching monthly emotion:", error);
      }
    };

    fetchMonthlyEmotion();
  }, []);

  const getEmoticonForEmotion = (emotion) => {
    const emotionMap = {
      "😊": "😊",
      "🥲": "🥲",
      "🥰": "🥰",
      "🥱": "🥱",
      "😠": "😠",
      "😔": "😔",
      "😌": "😌"
    };
    return emotionMap[emotion] || "😐";
  };

  return (
    <div className="flex flex-col items-center mb-4 sm:mb-8">
      <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-custom-brown">
        이번 달의 감정
      </h3>
      <div className="text-4xl sm:text-6xl">
        {monthlyEmotion ? getEmoticonForEmotion(monthlyEmotion) : "😐"}
      </div>
    </div>
  );
};

export default MonthlyEmotion;


// import React from "react";

// const MonthlyEmotion = () => {
//   return (
//     <div className="flex flex-col items-center mb-4 sm:mb-8">
//       <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-custom-brown">
//         8월의 감정
//       </h3>
//       <div className="text-4xl sm:text-6xl">😊</div>
//     </div>
//   );
// };

// export default MonthlyEmotion;