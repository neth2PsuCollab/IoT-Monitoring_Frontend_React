import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useChartContext } from './ChartContext';

const Acceleration = ({ data, onDataHover = () => {}, hoveredTimestamp }) => {
    const chartRef = useRef(null);
    const { hoveredIndex, setHoveredIndex, setHoveredTimestamp } = useChartContext();
    const [timeRange, setTimeRange] = useState('1m'); // Default to 1 minute view

    // Function to format timestamp from milliseconds to HH:mm:ss
    const formatTimestamp = (timestamp) => {
        const time = timestamp.split('.')[0];
        return time.split(' ')[1] || time; // Returns just the time portion
    };

    // Function to filter data based on selected time range
    const getFilteredData = () => {
        if (!data.length) return data;
    
        const ranges = {
            '10s': 10,
            '30s': 30,
            '1m': 60,
            'all': Infinity
        };
    
        const secondsToShow = ranges[timeRange];
        
        if (secondsToShow === Infinity) return data;
    
        const latestTimestamp = new Date(data[data.length - 1].timestamp);
        const cutoffTime = new Date(latestTimestamp.getTime() - secondsToShow * 1000);
    
        return data.filter(item => new Date(item.timestamp) >= cutoffTime);
    };
    

    const filteredData = getFilteredData();

    const chartData = {
        labels: filteredData.map(item => formatTimestamp(item.timestamp)),
        datasets: [
            {
                label: 'AccelerationX',
                data: filteredData.map(item => parseFloat(item.AccelerationX) || 0),
                borderColor: '#8884d8',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'AccelerationY',
                data: filteredData.map(item => parseFloat(item.AccelerationY) || 0),
                borderColor: '#82ca9d',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'AccelerationZ',
                data: filteredData.map(item => parseFloat(item.AccelerationZ) || 0),
                borderColor: '#ffc658',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    useEffect(() => {
        if (hoveredIndex !== null && chartRef.current) {
            const chart = chartRef.current;
            
            if (chart && hoveredIndex >= 0 && hoveredIndex < filteredData.length) {
                const elements = chartData.datasets.map((_, datasetIndex) => ({
                    datasetIndex,
                    index: hoveredIndex
                }));

                chart.tooltip?.setActiveElements(elements, {
                    x: chart.scales.x.getPixelForValue(hoveredIndex),
                    y: chart.scales.y.getPixelForValue(filteredData[hoveredIndex].AccelerationX)
                });
                
                chart.update('none');
            }
        }
    }, [hoveredIndex, filteredData, chartData.datasets]);

    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: (context) => {
                        return formatTimestamp(filteredData[context[0].dataIndex].timestamp);
                    }
                },
                external: function(context) {
                    if (hoveredTimestamp) {
                        const dataIndex = filteredData.findIndex(d => d.timestamp === hoveredTimestamp);
                        const chart = context.chart;
                        
                        if (dataIndex !== -1) {
                            const elements = chartData.datasets.map((_, idx) => ({
                                datasetIndex: idx,
                                index: dataIndex 
                            }));
    
                            if (chart.tooltip._active[0]?.index !== dataIndex) {
                                chart.tooltip.setActiveElements(elements, {
                                    x: chart.scales.x.getPixelForValue(dataIndex),
                                    y: chart.scales.y.getPixelForValue(filteredData[dataIndex].AccelerationX),
                                });
                                chart.update('none');
                            }
                        }
                    }
                }
            },
            legend: {
                position: 'top',
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: function(value) {
                        const timestamp = filteredData[value]?.timestamp;
                        return timestamp ? formatTimestamp(timestamp) : '';
                    }
                }
            }
        },
        hover: {
            mode: 'index',
            intersect: false
        },
        onHover: (event, elements) => {
            if (!event?.native) return;
            
            if (elements && elements.length > 0) {
                const dataIndex = elements[0].index;
                setHoveredIndex(dataIndex);
                setHoveredTimestamp(filteredData[dataIndex].timestamp);
            }
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                    <label className="text-sm">Time Range:</label>
                    <select 
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="text-sm border rounded p-1"
                    >
                        <option value="10s">10 Seconds</option>
                        <option value="30s">30 Seconds</option>
                        <option value="1m">1 Minute</option>
                        <option value="all">All Data</option>
                    </select>
                </div>
            </div>
            <div 
                // style={{ width: '800px', height: '200px' }}
                onMouseMove={(e) => {
                    const chart = e.target.closest('canvas');
                    if (!chart) return;
                    const chartInstance = ChartJS.getChart(chart);
                    if (!chartInstance) return;

                    const elements = chartInstance.getElementsAtEventForMode(e, 'index', { intersect: false }, false);
                    if (elements.length > 0) {
                        const dataIndex = elements[0].index;
                        onDataHover(filteredData[dataIndex].timestamp);
                    }
                }}
            >
                <Line 
                    ref={chartRef}
                    data={chartData} 
                    options={{ ...chartOptions, maintainAspectRatio: false }}
                />
            </div>
        </div>
    );
};

export default Acceleration;