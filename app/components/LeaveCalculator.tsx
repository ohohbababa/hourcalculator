"use client";
import React, { useState } from 'react';

const LeaveCalculator = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hours, setHours] = useState(null);

  const convertTimeToHours = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + minutes / 60;
  };

  const calculateHours = () => {
    if (!startTime || !endTime) return;

    let start = convertTimeToHours(startTime);
    let end = convertTimeToHours(endTime);

    // 工作時間為 9:00-18:00，午休時間為 12:00-13:00
    const workStart = 9;
    const workEnd = 18;
    const lunchStart = 12;
    const lunchEnd = 13;

    // 確保時間在工作時間範圍內
    start = Math.max(start, workStart);
    end = Math.min(end, workEnd);

    // 如果結束時間小於等於開始時間，則為0小時
    if (end <= start) {
      setHours(0);
      return;
    }

    let totalHours = end - start;

    // 處理午休時間
    if (start < lunchEnd && end > lunchStart) {
      // 計算重疊的午休時間
      const lunchOverlapStart = Math.max(start, lunchStart);
      const lunchOverlapEnd = Math.min(end, lunchEnd);
      totalHours -= (lunchOverlapEnd - lunchOverlapStart);
    }

    setHours(Math.max(0, totalHours));
  };

  // 生成時間選項（09:00 - 18:00）
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 18; hour++) {
      options.push(
        <option key={`${hour}:00`} value={`${String(hour).padStart(2, '0')}:00`}>
          {String(hour).padStart(2, '0')}:00
        </option>
      );
      options.push(
        <option key={`${hour}:30`} value={`${String(hour).padStart(2, '0')}:30`}>
          {String(hour).padStart(2, '0')}:30
        </option>
      );
    }
    return options;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-center mb-6">請假時數計算器</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">開始時間</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setHours(null);
              }}
            >
              <option value="">請選擇時間</option>
              {generateTimeOptions()}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">結束時間</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setHours(null);
              }}
            >
              <option value="">請選擇時間</option>
              {generateTimeOptions()}
            </select>
          </div>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={calculateHours}
            disabled={!startTime || !endTime}
          >
            計算時數
          </button>

          {hours !== null && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-center font-medium">
                請假時數：{hours.toFixed(1)} 小時
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveCalculator;