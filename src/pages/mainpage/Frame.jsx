import React from 'react';
import Galpi from '../../components/galpi';

const Frame = () => {
  return (
    <div className="space-y-8">
      <div>
        <Galpi text="개인 다이어리" />
        <button className="text-green-600 px-4 py-2">
            개인 다이어리 만들기
        </button>
        <div className="h-[172px] bg-[#edebe7] p-4 rounded-b-lg rounded-tr-lg flex items-center justify-center">
          <p className="text-gray-600">
            다이어리가 없어요 :(<br />
            오늘을 기록하기 위해 다이어리를 먼저 만들어주세요.
          </p>
        </div>
      </div>
      <div>
        <Galpi text="교환 다이어리" />
        <button className="text-green-600 px-4 py-2">
            교환 다이어리 만들기
          </button>
        <div className="h-[172px] bg-[#edebe7] p-4 rounded-b-lg rounded-tr-lg flex items-center justify-center">
          <p className="text-gray-600">
            다이어리가 없어요 :(<br />
            오늘을 기록하기 위해 다이어리를 먼저 만들어주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Frame;