import React from 'react';

const AltitudeAvgBox = ({ data }) => {
    const averageAltitude = data.length > 0 
        ? (data.reduce((sum, item) => sum + parseFloat(item.Altitude || 0), 0) / data.length).toFixed(1)
        : null;

    return (
        <div className="w-full md:w-48 bg-pink-500 text-white rounded-md flex flex-col justify-start items-center h-36 text-center">
            <div className="border-b border-white/20 w-full text-center py-2 bg-black text-white">
                <div className="text-sm font-medium">
                    Altitude trip (Avg)
                </div>
            </div>
            <div className="py-8">
                <div className="text-lg font-bold">
                    {averageAltitude !== null ? averageAltitude : '-'} m
                </div>
            </div>
        </div>
    );
};

export default AltitudeAvgBox;
