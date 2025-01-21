import React, { useState } from 'react';
import FilenameDropdown from './components/dropdowninput/FilenameDropdown';
import TimestampDropdown from './components/dropdowninput/TimestampDropdown';
import DataDisplay from './components/dropdowninput/DataDisplay';
import { fetchData } from './services/api';
import HeaderSection from './components/Header';

const App = () => {
    const [filename, setFilename] = useState('');
    const [startTimestamp, setStartTimestamp] = useState('');
    const [endTimestamp, setEndTimestamp] = useState('');
    const [submit, setSubmit] = useState(false);
    const [data, setData] = useState(null);
    const [coordinates, setCoordinates] = useState([]);

    const handleSubmit = () => {
        if (startTimestamp && endTimestamp && startTimestamp > endTimestamp) {
            alert('Error: Start Timestamp must be earlier than End Timestamp.');
            return;
        }
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
        <div className="flex flex-col h-screen bg-gray-200 p-5 gap-1">
            {/* Header Section and Input Container */}
            <div className="flex flex-raw w-full gap-5">
                {/* Header Section */}
                <div className="basis-1/3">
                <HeaderSection />
                </div>
                {/* Input Container */}
                <div className="basis-2/3 flex gap-5 bg-white p-3 rounded-lg shadow-md justify-end">
                    {/* Filename Dropdown */}
                    <FilenameDropdown
                        selectedFilename={filename}
                        onSelect={(selectedFilename) => {
                            setFilename(selectedFilename);
                            setSubmit(false);
                        }}
                    />
    
                    {/* Timestamp Dropdowns */}
                    <TimestampDropdown
                        filename={filename}
                        onSelectStart={setStartTimestamp}
                        onSelectEnd={setEndTimestamp}
                    />
    
                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!filename || !startTimestamp || !endTimestamp}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    >
                        Submit
                    </button>
                </div>
            </div>
    
            {/* Data Display Section */}
            <div className="flex-1 overflow-auto">
                <DataDisplay
                    filename={filename}
                    startTimestamp={startTimestamp}
                    endTimestamp={endTimestamp}
                    data={data}
                    coordinates={coordinates}
                />
            </div>
        </div>
    );
    
};

export default App;