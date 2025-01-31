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
    const [isLoading, setIsLoading] = useState(false); // ✅ เพิ่ม state สำหรับ loading

    const handleSubmit = async () => {
        if (startTimestamp && endTimestamp && startTimestamp > endTimestamp) {
            alert('Error: Start Timestamp must be earlier than End Timestamp.');
            return;
        }

        setSubmit(true);
        setIsLoading(true); //เริ่มโหลด

        try {
            if (filename && startTimestamp && endTimestamp) {
                const result = await fetchData(filename, startTimestamp, endTimestamp);
                setData(result);

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
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); //โหลดเสร็จแล้วปิด loading
        }
    };

    const resetSelections = () => {
        setFilename('');
        setStartTimestamp('');
        setEndTimestamp('');
        setSubmit(false);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-200 p-5 gap-1 relative">
            {/* ✅ Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                        <p className="mt-3 text-gray-700 font-bold">Loading Data...</p>
                    </div>
                </div>
            )}

            {/* Header Section and Input Container */}
            <div className="flex flex-col md:flex-row md:gap-5">
                {/* Header Section */}
                <div className="flex-1 md:basis-2/5 w-full">
                    <HeaderSection />
                </div>

                {/* Input Container */}
                <div className="md:basis-3/5 w-full flex flex-col md:flex-row gap-2 bg-white p-3 rounded-lg shadow-md md:justify-end">
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
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default App;
