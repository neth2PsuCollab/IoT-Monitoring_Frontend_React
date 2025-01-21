import React, { useState, useMemo } from 'react';
import Map from '../../components/Map';
import Acceleration from '../Acceleration';
import Altitude from '../Altitude';
import Speed from '../Speed';
import Satellites from '../Satellites';
import { ChartProvider } from '../../components/ChartContext';
import { debounce } from 'lodash';
import DistanceTripBox from '../DistanceTripBox';
import SpeedAvgBox from '../SpeedAvgBox';
import AltitudeAvgBox from '../AltitudeAvgBox';
import FixTypeAvgBox from '../FixTypeAvgBox';

const DataDisplay = ({ filename, startTimestamp, endTimestamp, data, coordinates }) => {
    const [hoveredTimestamp, setHoveredTimestamp] = useState(null);
    
    const handleDataHover = useMemo(
        () => debounce((timestamp) => {
            setHoveredTimestamp(timestamp);
        }, 16),
        []
    );

    const processedData = useMemo(() => {
        if (!data?.length) return [];
        if (data.length > 1000) {
            const samplingRate = Math.floor(data.length / 1000);
            return data.filter((_, index) => index % samplingRate === 0);
        }
        return data;
    }, [data]);
    
    return (
        <ChartProvider>
            {/* Main container with flex row */}
            <div className="flex flex-row w-full gap-4 p-4">
                {/* Left column for graphs */}
                <div className="flex flex-col w-2/4 gap-4 justify-start">
                    {/* Acceleration Graph */}
                    <div className="flex-1 min-h-0 bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-2">Acceleration Graph</h3>
                        <Acceleration 
                            data={processedData} 
                            onDataHover={handleDataHover}
                            hoveredTimestamp={hoveredTimestamp}
                        />
                    </div>

                    {/* Altitude Graph */}
                    <div className="flex-1 min-h-0 bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-2">Altitude Graph</h3>
                        <Altitude 
                            data={processedData} 
                            onDataHover={handleDataHover}
                            hoveredTimestamp={hoveredTimestamp}
                        />
                    </div>

                    {/* Speed Graph */}
                    <div className="flex-1 min-h-0 bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-2">Speed Graph</h3>
                        <Speed 
                            data={processedData} 
                            onDataHover={handleDataHover}
                            hoveredTimestamp={hoveredTimestamp}
                        />
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col w-1/2 gap-4">
                    {/* Top section with stats and map */}
                    <div className="flex flex-row gap-4">
                        {/* Stats boxes */}
                        <div className="flex flex-col w-full gap-2">
                            <DistanceTripBox data={processedData} />
                            <SpeedAvgBox data={processedData} />
                            <AltitudeAvgBox data={processedData} />
                            <FixTypeAvgBox data={processedData} />
                        </div>
                        
                        {/* Map */}
                        <div className="w-full">
                            <div className="w-full bg-white rounded-lg shadow-md ">
                                <Map 
                                    coordinates={coordinates || []} 
                                    hoveredTimestamp={hoveredTimestamp}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Satellites Graph at bottom */}
                    <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-2">Satellites Graph</h3>
                        <Satellites 
                            data={processedData} 
                            onDataHover={handleDataHover}
                            hoveredTimestamp={hoveredTimestamp}
                        />
                    </div>
                </div>
            </div>
        </ChartProvider>
    );
};

export default DataDisplay;