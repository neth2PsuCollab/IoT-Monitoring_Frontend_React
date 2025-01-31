import React, { useRef, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useChartContext } from './ChartContext';
import 'chartjs-adapter-date-fns' ;


const Speed = ({ data, onDataHover = () => {} ,timeUnit}) => {
    const chartRef = useRef(null);
    const { hoveredIndex, setHoveredIndex, setHoveredTimestamp } = useChartContext();

    const formatTimestamp = (timestamp) => {
        const match = timestamp.match(/(\d{2}:\d{2}:\d{2})/);
        return match ? match[1] : timestamp;
    };

    const chartData = useMemo(() => ({
        labels: data.map(item => new Date(item.timestamp).toISOString().split(".")[0]),
        datasets: [
            {
                label: 'Speed',
                data: data.map(item => parseFloat(item.Speed) || 0),
                borderColor: '#ff0000',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0, 
            }
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
                    y: chart.scales.y.getPixelForValue(data[hoveredIndex].Speed)
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
                            displayFormats: {
                                second: 'HH:mm:ss',
                                minute: 'HH:mm',
                                hour: 'HH:mm'
                            },
                            tooltipFormat: 'HH:mm:ss'
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
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

export default React.memo(Speed);
