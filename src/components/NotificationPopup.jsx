import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const NotificationPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-4 bg-white shadow-lg rounded-lg w-80 h-96 p-4 z-50 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        <IoClose size={20} />
      </button>
      <h3 className="text-lg font-semibold mb-4 text-green-600">알림</h3>
      <div>
        {/* Sample notifications */}
        <div className="mb-4 border-b border-gray-200 pb-2">
          <p className="font-medium">알림 제목 1</p>
          <p>알림 내용이 여기 들어갑니다.</p>
        </div>
        <div className="mb-4 border-b border-gray-200 pb-2">
          <p className="font-medium">알림 제목 2</p>
          <p>알림 내용이 여기 들어갑니다.</p>
        </div>
        {/* Add more notifications here */}
      </div>
    </div>
  );
};

export default NotificationPopup;
