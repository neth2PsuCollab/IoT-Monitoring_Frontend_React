import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, scales } from 'chart.js/auto';
import { useChartContext } from './ChartContext';
import 'chartjs-adapter-date-fns' ;

const Altitude = ({ data, onDataHover = () => {}, hoveredTimestamp, timeUnit }) => {
    const chartRef = useRef(null);
    const { hoveredIndex, setHoveredIndex, setHoveredTimestamp } = useChartContext();  
    const [isDarkMode, setIsDarkMode] = useState(false);
        
            useEffect(() => {
                const checkTheme = () => {
                    setIsDarkMode(document.documentElement.classList.contains('dark'));
                };
        
                checkTheme();
        
                const observer = new MutationObserver(checkTheme);
                observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class']
                });
        
                return () => observer.disconnect();
            }, []);

    const chartData = useMemo(() => {
        // console.log("Raw data:", data); // ตรวจสอบข้อมูลที่เข้ามา
        return {
            labels: data.map(item => {
                const timestamp = new Date(item.timestamp).toISOString().split(".")[0];
                // console.log("Formatted timestamp:", timestamp); // ตรวจสอบค่าที่ถูกแปลงแล้ว
                return timestamp;
            }),
            datasets: [
                {
                    label: 'Heading',
                    data: data.map(item => parseFloat(item.Heading) || 0),
                    borderColor: '#ff7300',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                },
                {
                    label: 'Roll',
                    data: data.map(item => parseFloat(item.Roll) || 0),
                    borderColor: '#3875ff',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                },
                {
                    label: 'Pitch',
                    data: data.map(item => parseFloat(item.Pitch) || 0),
                    borderColor: '#82ca9d',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                },
            ],
        };
    }, [data]);
    

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
                animation: { duration: 300 },
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'line',
                            color: isDarkMode ? '#fff' : '#000'
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
                            maxTicksLimit: 10,
                            color: isDarkMode ? '#fff' : '#000'
                        },
                        grid: {
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: isDarkMode ? '#fff' : '#000'
                        },
                        grid: {
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
            }), [data, timeUnit, setHoveredIndex, setHoveredTimestamp, isDarkMode]);

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