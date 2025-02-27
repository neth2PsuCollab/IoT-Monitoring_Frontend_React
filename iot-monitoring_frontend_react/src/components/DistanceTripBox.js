import React from 'react';

const DistanceTripBox = ({ data }) => {
    const averageDistanceTrip = data.length > 0 
        ? (data.reduce((sum, item) => sum + parseFloat(item.DistanceTrip || 0), 0) / data.length / 1000).toFixed(1)
        : null;

    return (
        <div className="w-full md:w-48 bg-blue-500 text-white rounded-md flex flex-col justify-start items-center h-36 text-center">
            <div className="border-b border-white/20 w-full text-center py-2 bg-black text-white">
                <div className="text-sm font-medium">
                    Distance trip (Avg)
                </div>
            </div>
            <div className="py-8">
                <div className="text-lg font-bold">
                    {averageDistanceTrip !== null ? averageDistanceTrip : '-'} Km
                </div>
            </div>
        </div>
    );
};

export default DistanceTripBox;
