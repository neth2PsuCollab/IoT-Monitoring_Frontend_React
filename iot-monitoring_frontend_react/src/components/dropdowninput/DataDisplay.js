// DataDisplay.js
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
            <div className="main-container">
                {/* Header Section
                <div className="header-section">
                    <div className="logo-title">Logo and title</div>
                </div> */}

                {/* Content Section */}
                <div className="content-container">
                    {/* Graphs Column */}
                    <div className="graphs-column">
                        <div className="graph-section">
                            <h3>Acceleration Graph</h3>
                            <Acceleration 
                                data={processedData} 
                                onDataHover={handleDataHover}
                                hoveredTimestamp={hoveredTimestamp}
                            />
                        </div>
                        <div className="graph-section">
                            <h3>Altitude Graph</h3>
                            <Altitude 
                                data={processedData} 
                                onDataHover={handleDataHover}
                                hoveredTimestamp={hoveredTimestamp}
                            />
                        </div>
                        <div className="graph-section">
                            <h3>Speed Graph</h3>
                            <Speed 
                                data={processedData} 
                                onDataHover={handleDataHover}
                                hoveredTimestamp={hoveredTimestamp}
                            />
                        </div>
                    </div>

                    {/* Stats & Map Column */}
                    <div className="stats-map-column">
                        <div className="stats-boxes">
                            <DistanceTripBox data={processedData} />
                            <SpeedAvgBox data={processedData} />
                            <AltitudeAvgBox data={processedData} />
                            <FixTypeAvgBox data={processedData} />
                        </div>
                        <div className="map-container">
                            <Map 
                                coordinates={coordinates || []} 
                                hoveredTimestamp={hoveredTimestamp}
                            />
                        </div>
                        <div className="satellites-graph">
                            <h3>Satellites Graph</h3>
                            <Satellites 
                                data={processedData} 
                                onDataHover={handleDataHover}
                                hoveredTimestamp={hoveredTimestamp}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ChartProvider>
    );
};

export default DataDisplay;