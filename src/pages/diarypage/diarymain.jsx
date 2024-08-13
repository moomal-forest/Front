import React from 'react';
import Nav from '../../components/Nav';
import Frame from './Frame';

const DiaryMain = () => {
    return (
      <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
        <Nav />
        <main className="flex-grow container mx-auto px-4 py-8">
          
          <p className="text-2xl mt-4 mb-7">안녕하세요, OO님! 오늘 하루는 어떠셨나요?</p>
          
          <div className="flex gap-8">
            <div className="flex-grow">
              <Frame />
            </div>
            <div className="w-80">
              
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default DiaryMain;
