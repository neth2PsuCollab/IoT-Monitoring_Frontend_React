import React, { useState } from 'react';
import FilenameDropdown from './components/dropdowninput/FilenameDropdown';
import TimestampDropdown from './components/dropdowninput/TimestampDropdown';
import DataDisplay from './components/dropdowninput/DataDisplay';
import { fetchData } from './services/api';

const App = () => {
    const [filename, setFilename] = useState('');
    const [startTimestamp, setStartTimestamp] = useState('');
    const [endTimestamp, setEndTimestamp] = useState('');
    const [submit, setSubmit] = useState(false);
    const [data, setData] = useState(null);
    const [coordinates, setCoordinates] = useState([]);

    const handleSubmit = () => {
        setSubmit(true);
        const fetchAndSetData = async () => {
            if (filename && startTimestamp && endTimestamp) {
                const result = await fetchData(filename, startTimestamp, endTimestamp);
                setData(result);
                
                // Format coordinates for the map
                if (Array.isArray(result)) {
                    const formattedCoordinates = result.map(item => ({
                        latitude: parseFloat(item.Latitude),
                        longitude: parseFloat(item.Longitude),
                        timestamp: String(item.timestamp),
                        altitude: parseFloat(item.Altitude),
                        speed: parseFloat(item.Speed),
                        heading: parseFloat(item.Heading)
                    }));
                    setCoordinates(formattedCoordinates);
                }
            }
        };
        fetchAndSetData();
    };

    const resetSelections = () => {
        setFilename('');
        setStartTimestamp('');
        setEndTimestamp('');
        setSubmit(false);
    };

    return (
        <div style={{ display: 'flex', ap: '30px', flexDirection: 'column', alignItems: 'flex-end', padding: '20px', backgroundColor: '#f4f4f4', height: '100vh' }}>
            {/* Dropdown container */}
            <div style={{ display: 'flex', gap: '10px', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                {/* Filename dropdown */}
                <FilenameDropdown
                    selectedFilename={filename}
                    onSelect={(selectedFilename) => {
                        setFilename(selectedFilename);
                        setSubmit(false); // Reset submit when changing filename
                    }}
                />

                {/* Timestamp dropdowns */}
                <TimestampDropdown
                    filename={filename}
                    onSelectStart={setStartTimestamp}
                    onSelectEnd={setEndTimestamp}
                />

                {/* Submit button */}
                <button
                    onClick={handleSubmit}
                    disabled={!filename || !startTimestamp || !endTimestamp}
                    style={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Submit
                </button>
            </div>

            {/* Data display */}
            {(
                <div style={{ marginTop: '20px', width: '100%' }}>
                    <DataDisplay
                        filename={filename}
                        startTimestamp={startTimestamp}
                        endTimestamp={endTimestamp}
                        data = {data}
                        coordinates = {coordinates}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
