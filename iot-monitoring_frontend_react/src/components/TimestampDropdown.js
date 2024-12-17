import React, { useEffect, useState } from 'react';
import { fetchTimestamps } from '../services/api';

const TimestampDropdown = ({ filename, onSelectStart, onSelectEnd }) => {
    const [timestamps, setTimestamps] = useState([]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        if (filename) {
            const loadTimestamps = async () => {
                const data = await fetchTimestamps(filename);
                setTimestamps(data);
            };
            loadTimestamps();
        }
    }, [filename]);

    return (
        <div>
            <select value={start} onChange={(e) => { setStart(e.target.value); onSelectStart(e.target.value); }}>
                <option value="">Select Start Timestamp</option>
                {timestamps.map((timestamp, index) => (
                    <option key={index} value={timestamp}>
                        {timestamp}
                    </option>
                ))}
            </select>
            <select value={end} onChange={(e) => { setEnd(e.target.value); onSelectEnd(e.target.value); }}>
                <option value="">Select End Timestamp</option>
                {timestamps.map((timestamp, index) => (
                    <option key={index} value={timestamp}>
                        {timestamp}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimestampDropdown;
