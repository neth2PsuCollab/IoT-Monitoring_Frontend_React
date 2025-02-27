import React, { useEffect, useState } from 'react';
import { fetchTimestamps } from '../../services/api';

const TimestampDropdown = ({ filename, onSelectStart, onSelectEnd }) => {
    const [timestamps, setTimestamps] = useState([]);
    const [displayTimestamps, setDisplayTimestamps] = useState([]); //เวลาที่เอาแค่นาทีกับวิไปแสดง
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [dateDisplay, setDateDisplay] = useState('YYYY-MM-DD'); //ตั้งค่าเริ่มต้น

    useEffect(() => {
        if (filename) {
            const loadTimestamps = async () => {
                const data = await fetchTimestamps(filename);
                
                if (data.length > 0) {
                    const dateMatch = data[0].match(/^(\d{4}-\d{2}-\d{2})/); 
                    if (dateMatch) {
                        setDateDisplay(dateMatch[0]);
                    }

                    const timeMap = new Map();
                    data.forEach(timestamp => {
                        const timeMatch = timestamp.match(/(\d{2}:\d{2}:\d{2})/);
                        if (timeMatch) {
                            timeMap.set(timeMatch[1], timestamp);
                        }
                    });

                    const uniqueDisplayTimes = [...timeMap.keys()].sort();
                    setDisplayTimestamps(uniqueDisplayTimes);
                    setTimestamps([...timeMap.values()]);
                }
            };
            loadTimestamps();
        } else {
            setTimestamps([]);
            setDisplayTimestamps([]);
            setStart('');
            setEnd('');
            setDateDisplay('YYYY-MM-DD'); //แสดงค่าเริ่มต้น
        }
    }, [filename]);

    const formatForSubmission = (displayTime) => {  
        if (!displayTime || !dateDisplay) return '';
        return `${dateDisplay} ${displayTime}.000000+00:00`;
    };

    const handleStartChange = (displayTime) => {
        setStart(displayTime);
        const formattedTime = formatForSubmission(displayTime);
        onSelectStart(formattedTime);
    };

    const handleEndChange = (displayTime) => {
        setEnd(displayTime);
        const formattedTime = formatForSubmission(displayTime);
        onSelectEnd(formattedTime);
    };

    return (
        <div className="flex flex-col md:flex-row items-center text-sm gap-1">
        <span className="ml-1 mr-2 text-gray-700 dark:text-gray-200">
            Date: {dateDisplay}
        </span> 
        <label 
            htmlFor="start" 
            className="mr-1 text-gray-700 dark:text-gray-200"
        >
            Start Time:
        </label>
        <select 
            id="start" 
            value={start} 
            onChange={(e) => handleStartChange(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1"
        >
            <option value="">Select Start Time</option>
            {displayTimestamps.map((time) => (
                <option key={time} value={time}>
                    {time}
                </option>
            ))}
        </select>
        <label 
            htmlFor="start" 
            className="mr-1 text-gray-700 dark:text-gray-200"
        >
            End Time:
        </label>
        <select 
            id="end" 
            value={end} 
            onChange={(e) => handleEndChange(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1"
        >
            <option value="">Select End Time</option>
            {displayTimestamps.map((time) => (
                <option key={time} value={time}>
                    {time}
                </option>
            ))}
        </select>
    </div>
    );
};

export default TimestampDropdown;