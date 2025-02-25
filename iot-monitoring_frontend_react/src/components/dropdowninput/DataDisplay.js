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

const DataDisplay = ({ filename, startTimestamp, endTimestamp, data, coordinates, isLoading }) => {
    const [hoveredTimestamp, setHoveredTimestamp] = useState(null);
    const [timeUnit , setTimeUnit ] = useState("second");
    
    
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
    
    const handleTimeScaleChange = (event)  => {
        setTimeUnit(event.target.value);
    };

    return (
        <ChartProvider>
            {/* Main container with flex row */}
            <div className="flex flex-col-reverse w-full md:flex-row w-full gap-4 p-4">
                {/* Left column for graphs */}
                <div className="flex flex-col w-full md:w-1/2 gap-4">
                    {/* Acceleration Graph */}
                    <div className="flex-1 min-h-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-medium mb-2 dark:text-white">Acceleration Graph</h3>
                    <div className="mb-2">
                        <label 
                            htmlFor="timeScale" 
                            className="mr-2 text-gray-700 dark:text-gray-200"
                        > 
                            Time Scale: 
                        </label>
                        <select 
                            id="timeScale" 
                            value={timeUnit} 
                            onChange={handleTimeScaleChange}
                            className="border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-gray-700 
                                    text-gray-900 dark:text-gray-200 
                                    rounded px-2 py-1 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="second">Second</option>
                            <option value="minute">Minute</option>
                        </select>
                    </div>
                        <Acceleration 
                            data={processedData} 
                            onDataHover={handleDataHover}
                            hoveredTimestamp={hoveredTimestamp}
                            timeUnit={timeUnit}
                        />
                    </div>

                    {/* Altitude Graph */}
                    <div className="flex-1 min-h-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-2 dark:text-white">Altitude Graph</h3>
                        <Altitude 
                            data={processedData} 
                            onDataHover={handleDataHover}
                            hoveredTimestamp={hoveredTimestamp}
                            timeUnit={timeUnit}
                        />
                    </div>

                    {/* Speed Graph */}
                    <div className="flex-1 min-h-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-2 dark:text-white">Speed Graph</h3>
                        <Speed 
                            data={processedData} 
                            onDataHover={handleDataHover}
                            hoveredTimestamp={hoveredTimestamp}
                            timeUnit={timeUnit}
                        />
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col w-full md:w-1/2 gap-4">
                    {/* Top section with stats and map */}
                    <div className="flex flex-col md:flex-row w-full gap-4">
                        {/* Stats boxes */}
                        <div className="flex flex-col  gap-2">
                            <DistanceTripBox data={processedData} />
                            <SpeedAvgBox data={processedData} />
                            <AltitudeAvgBox data={processedData} />
                            <FixTypeAvgBox data={processedData} />
                        </div>
                        
                        {/* Map */}
                            {/* <div className="w-full h-full bg-white rounded-lg shadow-md "> */}
                            <div className="w-full h-[600px] md:h-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                <Map 
                                    coordinates={coordinates || []} 
                                    hoveredTimestamp={hoveredTimestamp}
                                    isLoading={isLoading}
                                />
                            </div>
                    </div>

                    {/* Satellites Graph at bottom */}
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium mb-2 dark:text-white">Satellites Graph</h3>
                        <Satellites 
                            data={processedData} 
                            onDataHover={handleDataHover}
                            hoveredTimestamp={hoveredTimestamp}
                            timeUnit={timeUnit}
                        />
                    </div>
                </div>
            </div>
        </ChartProvider>
    );
};

export default DataDisplay;