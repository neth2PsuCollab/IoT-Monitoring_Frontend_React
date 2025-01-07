import React, { useState } from 'react';
import Map from '../../components/Map';
import Acceleration from '../../components/Acceleration.js';
import Altitude from '../Altitude.js';

const DataDisplay = ({ filename, startTimestamp, endTimestamp, data, coordinates }) => {
    const [hoveredTimestamp, setHoveredTimestamp] = useState(null);

    const handleDataHover = (timestamp) => {
        setHoveredTimestamp(timestamp); // ส่งค่า hoveredTimestamp ไปที่กราฟทั้งหมด
    };

    return (
        <div>
            {/* แผนที่ */}
            <div>
                <Map 
                    coordinates={coordinates || []} 
                    hoveredTimestamp={hoveredTimestamp}  // ส่ง hoveredTimestamp ให้ Map
                />
            </div>

            {/* Acceleration Graph */}
            <div style={{ marginTop: '5px' }}>
                <h3>Acceleration Data</h3>
                <Acceleration 
                    data={data?.length ? data : []} 
                    onDataHover={handleDataHover}  
                    hoveredTimestamp={hoveredTimestamp}  // ส่ง hoveredTimestamp ให้ Acceleration
                />
            </div>

            {/* Altitude Graph */}
            <div style={{ marginTop: '5px' }}>
                <h3>Altitude Data</h3>
                <Altitude 
                    data={data?.length ? data : []} 
                    onDataHover={handleDataHover}  
                    hoveredTimestamp={hoveredTimestamp}  // ส่ง hoveredTimestamp ให้ Altitude
                />
            </div>
        </div>
    );
};


export default DataDisplay;
