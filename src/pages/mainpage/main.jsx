import React from 'react';
import Nav from '../../components/Nav';
import Frame from './Frame';
import MonthlyEmotion from './MonthlyEmotion';
import RecentMusic from './RecentMusic';

const Main = () => {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br to-blue-200 from-green-300">
        <Nav />
        <main className="flex-grow container mx-auto px-4 py-8">
          
          <p className="text-2xl mt-4 mb-7">안녕하세요, OO님! 오늘 하루는 어떠셨나요?</p>
          
          <div className="flex gap-8">
            <div className="flex-grow">
              <Frame />
            </div>
            <div className="w-80">
              <MonthlyEmotion />
              <RecentMusic />
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default Main;