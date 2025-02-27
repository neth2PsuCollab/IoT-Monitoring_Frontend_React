import React, { useEffect, useState } from 'react';
import { fetchFilenames } from '../../services/api';

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
        <div
            className="flex items-center justify-center md:ml-4" // ใช้ Flexbox เพื่อจัดให้อยู่กลาง
        >
            <div className="inline-flex items-center text-sm">
            <label 
                htmlFor="filename" 
                className="mr-2 text-gray-700 dark:text-gray-200"
            >
                Filename:
            </label>
                <select
                    id="filename"
                    value={selected}
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1"
                >
                    <option value="">Select Filename</option>
                    {filenames.map((filename, index) => (
                        <option key={index} value={filename}>
                            {filename}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilenameDropdown;