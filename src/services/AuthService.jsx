// // src/services/AuthService.js

// import axios from 'axios';

// const API_URL = 'http://localhost:3080/auth/'; // 백엔드 서버 주소에 맞게 수정하세요

// const AuthService = {
//   login: async (userID, password) => {
//     try {
//       const response = await axios.post(API_URL + 'login', { userID, password });
//       if (response.data.accessToken) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//       return response.data;
//     } catch (error) {
//       throw error.response.data;
//     }
//   },

//   signup: async (userID, fullname, password) => {
//     try {
//       const response = await axios.post(API_URL + 'signup', { userID, fullname, password });
//       if (response.data.accessToken) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }
//       return response.data;
//     } catch (error) {
//       throw error.response.data;
//     }
//   },

//   logout: async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (user && user.refreshToken) {
//         await axios.post(API_URL + 'logout', { refreshToken: user.refreshToken });
//       }
//     } catch (error) {
//       console.error('로그아웃 중 오류 발생:', error);
//     } finally {
//       localStorage.removeItem('user');
//     }
//   },

//   getCurrentUser: () => {
//     return JSON.parse(localStorage.getItem('user'));
//   },

//   isLoggedIn: () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user && user.accessToken ? true : false;
//   }
// };

// export default AuthService;

// src/services/AuthService.js

const AuthService = {
  login: (userID, password) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.userID === userID && u.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve({ message: "로그인 성공" });
      } else {
        reject({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
      }
    });
  },

  signup: (userID, fullname, password) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = users.find(u => u.userID === userID);
      
      if (existingUser) {
        reject({ message: "이미 존재하는 아이디입니다." });
      } else {
        const newUser = { userID, fullname, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        resolve({ message: "회원가입 성공" });
      }
    });
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  },

  isLoggedIn: () => {
    return localStorage.getItem('currentUser') !== null;
  }
};

export default AuthService;