import React from 'react';
import Nav from '../../components/Nav';
import Frame from './Frame';
import MonthlyEmotion from './MonthlyEmotion';
import RecentMusic from './RecentMusic';

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f6] box-border">
      <Nav />
      <main className="flex-grow container mx-auto px-4 py-4 sm:py-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          <div className="flex-grow">
            <Frame />
          </div>
          <div className="w-full lg:w-80 flex flex-col gap-4">
            <MonthlyEmotion />
            <RecentMusic />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;