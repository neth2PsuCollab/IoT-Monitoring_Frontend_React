import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services/api';
import Map from '../../components/Map';

const DataDisplay = ({ filename, startTimestamp, endTimestamp ,data , coordinates}) => {
    
    // const [data, setData] = useState(null);
    // const [coordinates, setCoordinates] = useState([]);
    const [submit, setSubmit] = useState(false);

    // useEffect(() => {
    //     const fetchAndSetData = async () => {
    //         if (filename && startTimestamp && endTimestamp) {
    //             const result = await fetchData(filename, startTimestamp, endTimestamp);
    //             setData(result);
                
    //             // Format coordinates for the map
    //             if (Array.isArray(result)) {
    //                 const formattedCoordinates = result.map(item => ({
    //                     latitude: parseFloat(item.Latitude),
    //                     longitude: parseFloat(item.Longitude)
    //                 }));
    //                 setCoordinates(formattedCoordinates);
    //             }
    //         }
    //     };
    //     fetchAndSetData();
    // }, [filename, startTimestamp, endTimestamp]);

    return (
        <div 
        // style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '800px', margin: '0 auto' }}
        >
            {/* <h3>Data</h3> */}
            {/* {data ? ( */}
                <div>
                    {/* <div style={{ marginBottom: '20px' }}>
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div> */}
                    <div>
                        <Map coordinates={coordinates} />
                    </div>
                </div>
            {/* ) : (
                <p>Loading...</p>
            )} */}
        </div>
    );
};

export default DataDisplay;