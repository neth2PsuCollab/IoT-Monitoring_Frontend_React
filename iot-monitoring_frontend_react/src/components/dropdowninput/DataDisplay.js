import React, { useState, useMemo } from 'react';
import Map from '../../components/Map';
import Acceleration from '../Acceleration';
import Altitude from '../Altitude';
import Speed from '../Speed';
import Satellites from '../Satellites';

import { ChartProvider } from '../../components/ChartContext';
import { debounce } from 'lodash';

const DataDisplay = ({ filename, startTimestamp, endTimestamp, data, coordinates }) => {
    const [hoveredTimestamp, setHoveredTimestamp] = useState(null);
    
    // Debounce the hover handler to reduce update frequency
    const handleDataHover = useMemo(
        () => debounce((timestamp) => {
            setHoveredTimestamp(timestamp);
        }, 16), // roughly 60fps
        []
    );

    // Memoize the processed data
    const processedData = useMemo(() => {
        if (!data?.length) return [];
        
        // If data is too large, consider sampling
        if (data.length > 1000) {
            const samplingRate = Math.floor(data.length / 1000);
            return data.filter((_, index) => index % samplingRate === 0);
        }
        return data;
    }, [data]);
    
    return (
        <ChartProvider>
            <div>
                {/* <div>
                    <Map 
                        coordinates={coordinates || []} 
                        hoveredTimestamp={hoveredTimestamp}
                    />
                </div> */}

                <div style={{ marginTop: '5px' }}>
                    <h3>Acceleration Graph</h3>
                    <Acceleration 
                        data={processedData} 
                        onDataHover={handleDataHover}
                        hoveredTimestamp={hoveredTimestamp}
                    />
                </div>

                <div style={{ marginTop: '5px' }}>
                    <h3>Altitude Graph</h3>
                    <Altitude 
                        data={processedData} 
                        onDataHover={handleDataHover}
                        hoveredTimestamp={hoveredTimestamp}
                    />
                </div>

                <div style={{ marginTop: '5px' }}>
                    <h3>Speed Graph</h3>
                    <Speed 
                        data={processedData} 
                        onDataHover={handleDataHover}
                        hoveredTimestamp={hoveredTimestamp}
                    />
                </div>

                <div style={{ marginTop: '5px' }}>
                    <h3>Satellites Graph</h3>
                    <Satellites 
                        data={processedData} 
                        onDataHover={handleDataHover}
                        hoveredTimestamp={hoveredTimestamp}
                    />
                </div>
            </div>
        </ChartProvider>
    );
};

export default DataDisplay;