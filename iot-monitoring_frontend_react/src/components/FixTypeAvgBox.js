import React from 'react';

const FixTypeAvgBox = ({ data }) => {
  const averageFixType = data.length > 0 
    ? (data.reduce((sum, item) => sum + parseFloat(item.FixType || 0), 0) / data.length).toFixed(1)
    : null;

  return (
    <div className="w-full md:w-48 bg-green-500 text-white rounded-md flex flex-col justify-start items-center h-36 text-center">
      <div className="border-b border-white/20 w-full text-center py-2 bg-black text-white">
        <div className="text-sm font-medium">
          Fix (Avg)
        </div>
      </div>
      <div className="py-8">
        <div className="text-xl font-bold">
          {averageFixType !== null ? averageFixType : '-'}
        </div>
      </div>
    </div>
  );
};

export default FixTypeAvgBox;
