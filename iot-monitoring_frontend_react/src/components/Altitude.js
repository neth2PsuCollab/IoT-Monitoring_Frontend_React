import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, scales } from 'chart.js/auto';
import { useChartContext } from './ChartContext';
import 'chartjs-adapter-date-fns' ;

const Altitude = ({ data, onDataHover = () => {}, hoveredTimestamp, timeUnit }) => {
    const chartRef = useRef(null);
    const { hoveredIndex, setHoveredIndex, setHoveredTimestamp } = useChartContext();  
    // Function to format time as HH:MM:SS
    const formatTimestamp = (timestamp) => {
        const match = timestamp.match(/(\d{2}:\d{2}:\d{2})/);
        return match ? match[1] : timestamp;
    };

    const chartData = useMemo(() => ({
        labels: data.map(item => new Date(item.timestamp).toISOString().split(".")[0]),
        datasets: [
            {
                label: 'Heading',
                data: data.map(item => parseFloat(item.Heading) || 0),
                borderColor: '#ff7300',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0, // Remove point markers to improve performance
            },
            {
                label: 'Roll',
                data: data.map(item => parseFloat(item.Roll) || 0),
                borderColor: '#3875ff',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0, // Remove point markers to improve performance
            },
            {
                label: 'Pitch',
                data: data.map(item => parseFloat(item.Pitch) || 0),
                borderColor: '#82ca9d',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0, // Remove point markers to improve performance
            },
        ],
    }), [data]);

    useEffect(() => {
        if (hoveredIndex !== null && chartRef.current) {
            const chart = chartRef.current;
            
            if (chart && hoveredIndex >= 0 && hoveredIndex < data.length) {
                const elements = chartData.datasets.map((_, datasetIndex) => ({
                    datasetIndex,
                    index: hoveredIndex
                }));

                chart.tooltip?.setActiveElements(elements, {
                    x: chart.scales.x.getPixelForValue(hoveredIndex),
                    y: chart.scales.y.getPixelForValue(data[hoveredIndex].Altitude)
                });
                
                chart.update('none');
            }
        }
    }, [hoveredIndex, data, chartData.datasets]);

    const chartOptions = useMemo(() => ({
            responsive: true,
            animation: {
                duration: 300, // Reduced animation duration
            },
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'line',
                    },
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false
                },
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
                    setHoveredTimestamp(data[dataIndex].timestamp);
                }
            },
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: timeUnit,
                        tooltipFormat: "HH:mm:ss"
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10 // Limit number of x-axis ticks
                    }
                },
            },
            elements: {
                line: {
                    borderWidth: 2 // Consistent line width
                }
            }
        }), [data, timeUnit, setHoveredIndex, setHoveredTimestamp]);

    return (
        <div //style={{ width: '900px', height: '200px' }}
        onMouseMove={(e) => {
            const chart = e.target.closest('canvas');
            if (!chart) return;
            const chartInstance = ChartJS.getChart(chart);
            if (!chartInstance) return;

            const elements = chartInstance.getElementsAtEventForMode(e, 'index', { intersect: false }, false);
            if (elements.length > 0) {
                const dataIndex = elements[0].index;
                onDataHover(data[dataIndex].timestamp);
            }
        }}
        >
            <Line 
                ref={chartRef}
                data={chartData} 
                options={{ ...chartOptions, maintainAspectRatio: false }}
            />
        </div>
    );
};

export default React.memo(Altitude);