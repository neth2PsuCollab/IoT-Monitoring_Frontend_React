import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useChartContext } from './ChartContext';

const Speed = ({ data, onDataHover = () => {}, hoveredTimestamp , timestamp}) => {
    const chartRef = useRef(null);
    const { hoveredIndex, setHoveredIndex, setHoveredTimestamp } = useChartContext();

    const formatTimestamp = (timestamp) => {
        const match = timestamp.match(/(\d{2}:\d{2}:\d{2})/);
        return match ? match[1] : timestamp;
    };

    const chartData = {
        labels: data.map(item => formatTimestamp(item.timestamp)),
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
    };

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

    const chartOptions = {
        responsive: true,
        plugins: {
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
        }
    };

    // const chartOptions = {
    //     responsive: true,
    //     plugins: {
    //         tooltip: {
    //             enabled: true,
    //             mode: 'index',
    //             intersect: false,
    //             external: function(context) {
    //                 if (hoveredTimestamp) {
    //                     const dataIndex = data.findIndex(d => d.timestamp === hoveredTimestamp);
    //                     const chart = context.chart;
    //                     if (dataIndex !== -1) {
    //                         const elements = chartData.datasets.map((_, idx) => ({
    //                             datasetIndex: idx,
    //                             index: dataIndex
    //                         }));
    
    //                         if (chart.tooltip._active[0]?.index !== dataIndex) {
    //                             chart.tooltip.setActiveElements(elements, {
    //                                 x: chart.scales.x.getPixelForValue(dataIndex),
    //                                 y: chart.scales.y.getPixelForValue(data[dataIndex].Heading),
    //                             });
    //                             chart.update('none');
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //     },
    //     hover: {
    //         mode: 'index',
    //         intersect: false
    //     },
    //     scales: {
    //         x: {
    //             ticks: {
    //                 // กำหนดให้การแสดงผลของแกน X อยู่ในระยะเวลา 10 วินาที
    //                 callback: function(value) {
    //                     const formatTimestamp = (timestamp) => {
    //                         const match = timestamp.match(/(\d{2}:\d{2}:\d{2})/);
    //                         return match ? match[1] : timestamp;
    //                     };
    //                     // แปลง timestamp ที่มีรูปแบบ 14:59:59.925001+00:00
    //                     const timestamp = value;  // ใช้ value ที่ได้รับจาก ticks
                        
    //                     // แปลง timestamp string ให้เป็น Date object
    //                     const date = new Date(timestamp);
                        
    //                     // ปัดวินาทีให้เป็นช่วง 10 วินาที
    //                     const seconds = Math.floor(date.getSeconds() / 10) * 10;
    //                     date.setSeconds(seconds);
                        
    //                     // แสดงเวลาในรูปแบบ HH:MM:SS
    //                     return date.toISOString().slice(11, 19);
    //                 }
    //             }
    //         }
    //     },
        
        
    //     onHover: (event, elements) => {
    //         if (!event?.native) return;
    
    //         if (elements && elements.length > 0) {
    //             const dataIndex = elements[0].index;
    //             setHoveredIndex(dataIndex);
    //             setHoveredTimestamp(data[dataIndex].timestamp);
    //         }
    //     }
    // };
    
    

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

export default Speed;
