import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useChartContext } from './ChartContext';

const Altitude = ({ data, onDataHover = () => {}, hoveredTimestamp ,timestamp}) => {
    const chartRef = useRef(null);
    const { hoveredIndex, setHoveredIndex, setHoveredTimestamp } = useChartContext();
    const [timeInterval, setTimeInterval] = useState(10); // Default: 10 seconds

    // Function to parse timestamp and return Date object
    const parseTimestamp = (timestamp) => {
        return new Date(timestamp.split('+')[0]);
    };

    // Function to format time as HH:MM:SS
    const formatTimeOnly = (timestamp) => {
        const date = parseTimestamp(timestamp);
        return date.toTimeString().split(' ')[0];
    };

    // Sort data by timestamp
    const sortedData = [...data].sort((a, b) => {
        return parseTimestamp(a.timestamp) - parseTimestamp(b.timestamp);
    });

    // Get the start and end times
    const startTime = parseTimestamp(sortedData[0].timestamp);
    const endTime = parseTimestamp(sortedData[sortedData.length - 1].timestamp);

    // Function to check if a timestamp should display label based on interval
    const shouldDisplayLabel = (timestamp, index) => {
        if (index === 0 || index === sortedData.length - 1) return true;

        const currentTime = parseTimestamp(timestamp);
        const timeDiffFromStart = Math.floor((currentTime - startTime) / 1000);

        switch (timeInterval) {
            case 60: // 1 minute
                return timeDiffFromStart % 60 === 0;
            case 30: // 30 seconds
                return timeDiffFromStart % 30 === 0;
            case 10: // 10 seconds
                return timeDiffFromStart % 10 === 0;
            default:
                return true;
        }
    };

    const chartData = {
        labels: sortedData.map(item => formatTimeOnly(item.timestamp)),
        datasets: [
            {
                label: 'Heading',
                data: sortedData.map(item => parseFloat(item.Heading) || 0),
                borderColor: '#ff7300',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'Roll',
                data: sortedData.map(item => parseFloat(item.Roll) || 0),
                borderColor: '#3875ff',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'Pitch',
                data: sortedData.map(item => parseFloat(item.Pitch) || 0),
                borderColor: '#82ca9d',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    useEffect(() => {
        if (hoveredIndex !== null && chartRef.current) {
            const chart = chartRef.current;
            
            if (chart && hoveredIndex >= 0 && hoveredIndex < sortedData.length) {
                const elements = chartData.datasets.map((_, datasetIndex) => ({
                    datasetIndex,
                    index: hoveredIndex
                }));

                chart.tooltip?.setActiveElements(elements, {
                    x: chart.scales.x.getPixelForValue(hoveredIndex),
                    y: chart.scales.y.getPixelForValue(sortedData[hoveredIndex].Satellites)
                });
                
                chart.update('none');
            }
        }
    }, [hoveredIndex, sortedData, chartData.datasets]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                external: function (context) {
                    if (hoveredTimestamp) {
                        const dataIndex = sortedData.findIndex(
                            d => formatTimeOnly(d.timestamp) === formatTimeOnly(hoveredTimestamp)
                        );
                        const chart = context.chart;
                        if (dataIndex !== -1) {
                            const elements = chartData.datasets.map((_, idx) => ({
                                datasetIndex: idx,
                                index: dataIndex
                            }));

                            if (chart.tooltip._active[0]?.index !== dataIndex) {
                                chart.tooltip.setActiveElements(elements, {
                                    x: chart.scales.x.getPixelForValue(dataIndex),
                                    y: chart.scales.y.getPixelForValue(sortedData[dataIndex].Heading),
                                });
                                chart.update('none');
                            }
                        }
                    }
                }
            },
        },
        scales: {
            x: {
                // grid: {
                //     display: true,
                //     drawOnChartArea: true,
                // },
                ticks: {
                    maxRotation: 0,
                    autoSkip: false,
                    callback: (value, index) => {
                        const timestamp = sortedData[index].timestamp;
                        if (shouldDisplayLabel(timestamp, index)) {
                            return formatTimeOnly(timestamp);
                        }
                        // return '';
                    },
                },
            },
            y: {
                grid: {
                    display: true,
                    drawOnChartArea: true,
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
                setHoveredTimestamp(sortedData[dataIndex].timestamp);
            }
        }
    };

    return (
        <div style={{ width: '900px', height: '200px' }}
            onMouseMove={(e) => {
                const chart = e.target.closest('canvas');
                if (!chart) return;
                const chartInstance = ChartJS.getChart(chart);
                if (!chartInstance) return;

                const elements = chartInstance.getElementsAtEventForMode(e, 'index', { intersect: false }, false);
                if (elements.length > 0) {
                    const dataIndex = elements[0].index;
                    onDataHover(sortedData[dataIndex].timestamp);
                }
            }}
        >
            <div>
                <label>เลือกช่วงเวลาแสดงในแกน X: </label>
                <select value={timeInterval} onChange={(e) => setTimeInterval(Number(e.target.value))}>
                    <option value={60}>1 นาที</option>
                    <option value={30}>30 วินาที</option>
                    <option value={10}>10 วินาที</option>
                </select>
            </div>
            <Line
                ref={chartRef}
                data={chartData}
                options={chartOptions}
            />
        </div>
    );
};

export default Altitude;