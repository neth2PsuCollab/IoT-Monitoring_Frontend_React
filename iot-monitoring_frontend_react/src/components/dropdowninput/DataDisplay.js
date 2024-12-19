import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services/api';

const DataDisplay = ({ filename, startTimestamp, endTimestamp }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchAndSetData = async () => {
            if (filename && startTimestamp && endTimestamp) {
                const result = await fetchData(filename, startTimestamp, endTimestamp);
                setData(result);
            }
        };
        fetchAndSetData();
    }, [filename, startTimestamp, endTimestamp]);

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '800px', margin: '0 auto' }}>
            <h3>Data</h3>
            {data ? (
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DataDisplay;
