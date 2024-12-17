import axios from 'axios';

const BASE_URL = 'https://bcwgx4pe5f.execute-api.ap-southeast-1.amazonaws.com';

export const fetchFilenames = async () => {
    const response = await axios.get(`${BASE_URL}/testfilename/filename`);
    return response.data.filenames;
};

export const fetchTimestamps = async (filename) => {
    const response = await axios.get(`${BASE_URL}/testfilename/timestamp`, {
        params: { filename }
    });
    return response.data.timestamps;
};

export const fetchData = async (filename, startTimestamp, endTimestamp) => {
    const response = await axios.get(`${BASE_URL}/testfilename/data`, {
        params: { filename, start_timestamp: startTimestamp, end_timestamp: endTimestamp }
    });
    return response.data.data;
};
