import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';

const DataDisplay = ({ filename, startTimestamp, endTimestamp }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (filename && startTimestamp && endTimestamp) {
            const loadData = async () => {
                const result = await fetchData(filename, startTimestamp, endTimestamp);
                setData(result);
            };
            loadData();
        }
    }, [filename, startTimestamp, endTimestamp]);

    return (
        <div>
            <h3>Data</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataDisplay;
