import React, { useState } from 'react';
import FilenameDropdown from './components/FilenameDropdown';
import TimestampDropdown from './components/TimestampDropdown';
import DataDisplay from './components/DataDisplay';

const App = () => {
    const [filename, setFilename] = useState('');
    const [startTimestamp, setStartTimestamp] = useState('');
    const [endTimestamp, setEndTimestamp] = useState('');

    return (
        <div>
            <h1>Dashboard</h1>
            <FilenameDropdown onSelect={setFilename} />
            {filename && (
                <TimestampDropdown
                    filename={filename}
                    onSelectStart={setStartTimestamp}
                    onSelectEnd={setEndTimestamp}
                />
            )}
            {filename && startTimestamp && endTimestamp && (
                <DataDisplay
                    filename={filename}
                    startTimestamp={startTimestamp}
                    endTimestamp={endTimestamp}
                />
            )}
        </div>
    );
};

export default App;
