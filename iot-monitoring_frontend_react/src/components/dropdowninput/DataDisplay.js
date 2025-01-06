import React, { useState } from 'react';
import Map from '../../components/Map';
import Acceleration from '../../components/Acceleration.js';
import Altitude from '../Altitude.js';

const DataDisplay = ({ filename, startTimestamp, endTimestamp, data, coordinates }) => {
    const [hoveredTimestamp, setHoveredTimestamp] = useState(null);
    const emptyData = [];

    const handleDataHover = (timestamp) => {
        setHoveredTimestamp(timestamp);
    };

    return (
        <div>
            <div>
                <Map 
                    coordinates={coordinates} 
                    hoveredTimestamp={hoveredTimestamp}
                />
            </div>
            <div style={{ marginTop: '5px' }}>
                <h3>Acceleration Data</h3>
                <Acceleration 
                    data={data && data.length > 0 ? data : emptyData} 
                    onDataHover={handleDataHover}  // ส่ง handleDataHover
                    hoveredTimestamp={hoveredTimestamp}
                />
            </div>
            <div style={{ marginTop: '5px' }}>
                <h3>Altitude Data</h3>
                <Altitude 
                    data={data && data.length > 0 ? data : emptyData} 
                    onDataHover={handleDataHover}  // ส่ง handleDataHover
                    hoveredTimestamp={hoveredTimestamp}
                />
            </div>
        </div>
    );
};


export default DataDisplay;