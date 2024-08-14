import React from 'react';
import MainButton from '../../components/mainbutton';
import WhiteButton from '../../components/whitebutton';
import GreenButton from '../../components/greenbutton';

const Neighbor = () => {
  const neighbors = [
    { name: '형락', id: 'rakkk21_' },
    { name: '연경', id: 'IIgalore' },
    { name: '윤수', id: 'sysh.102' },
    { name: '현서', id: 'dxrsla' },
    { name: '다연', id: 'zzinddayeon' }
  ];

  return (
    <div className="min-h-screen bg-white relative z-20">
      <div className="absolute top-4 right-4 z-30">
        <MainButton />
      </div>
      
      <div className="max-w-2xl mx-auto pt-16 px-4 relative z-10">
        <h1 className="text-4xl font-bold text-green-600 mb-8">이웃 목록</h1>
        
        <div className="bg-[#f6f6f6] p-6 rounded-lg shadow-md">
          {neighbors.map((neighbor, index) => (
            <div key={index} className="flex justify-between items-center mb-8 last:mb-0">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-950 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {neighbor.name[0]}
                </div>
                <div>
                  <p className="font-bold text-green-700">{neighbor.name}</p>
                  <p className="text-sm text-gray-600">{neighbor.id}</p>
                </div>
              </div>
              <GreenButton text="삭제" />
            </div>
          ))}
          <div className="mt-4 flex justify-center">
          <WhiteButton text="이웃 추가" />
          </div>
        </div>
    
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <img src={require('../../img/bg.png')} alt="배경" className="w-full" />
      </div>
    </div>
  );
};

export default Neighbor;