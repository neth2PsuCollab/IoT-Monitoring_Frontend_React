import React, { useState } from 'react';
import Map from '../../components/Map';
import Acceleration from '../../components/Acceleration.js';
import Altitude from '../Altitude.js';

const DataDisplay = ({ filename, startTimestamp, endTimestamp, data, coordinates }) => {
    const [hoveredTimestamp, setHoveredTimestamp] = useState(null);

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
                {data ? (
                    <Acceleration 
                        data={data} 
                        onDataHover={setHoveredTimestamp}
                    />
                ) : (
                    <p>Loading Acceleration Data...</p>
                )}
            </div>
            <div style={{ marginTop: '5px' }}>
                <h3>Altitude Data</h3>
                {data ? (
                    <Altitude 
                        data={data} 
                        onDataHover={setHoveredTimestamp}
                    />
                ) : (
                    <p>Loading Altitude Data...</p>
                )}
            </div>
        </div>
    );
};

export default DataDisplay;