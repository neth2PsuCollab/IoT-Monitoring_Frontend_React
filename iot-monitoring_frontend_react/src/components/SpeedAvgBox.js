import React from 'react';

const SpeedAvgBox = ({ data }) => {
  const averageSpeed = data.length > 0 
    ? (data.reduce((sum, item) => sum + parseFloat(item.Speed || 0), 0) / data.length).toFixed(2)
    : null;

  return (
    <div className="w-full bg-red-400 text-white rounded-md flex flex-col justify-start items-center h-36 text-center">
      <div className="border-b border-white/20 w-full text-center py-2 bg-black text-white">
        <div className="text-sm font-medium">
          Speed (Avg)
        </div>
      </div>
      <div className="py-8">
        <div className="text-lg font-bold">
          {averageSpeed !== null ? averageSpeed : '-'} Km/h
        </div>
      </div>
    </div>
  );
};

export default SpeedAvgBox;
