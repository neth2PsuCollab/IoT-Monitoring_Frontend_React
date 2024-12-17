import React, { useEffect, useState } from 'react';
import { fetchFilenames } from '../services/api';

const FilenameDropdown = ({ onSelect }) => {
    const [filenames, setFilenames] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        const loadFilenames = async () => {
            const data = await fetchFilenames();
            setFilenames(data);
        };
        loadFilenames();
    }, []);

    const handleChange = (event) => {
        setSelected(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <select value={selected} onChange={handleChange}>
            <option value="">Select Filename</option>
            {filenames.map((filename, index) => (
                <option key={index} value={filename}>
                    {filename}
                </option>
            ))}
        </select>
    );
};

export default FilenameDropdown;
