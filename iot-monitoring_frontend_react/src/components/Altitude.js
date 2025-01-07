import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chart.js/auto';

const Altitude = ({ data, onDataHover, hoveredTimestamp }) => {
    const formatTimestamp = (timestamp) => timestamp.split('.')[1] || timestamp;

    const chartData = {
        labels: data.map(item => formatTimestamp(item.timestamp)),
        datasets: [
            {
                label: 'Heading',
                data: data.map(item => parseFloat(item.Heading) || 0),
                borderColor: '#ff7300',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'Roll',
                data: data.map(item => parseFloat(item.Roll) || 0),
                borderColor: '#3875ff',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'Pitch',
                data: data.map(item => parseFloat(item.Pitch) || 0),
                borderColor: '#82ca9d',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                external: function(context) {
                    if (hoveredTimestamp) {
                        const dataIndex = data.findIndex(d => d.timestamp === hoveredTimestamp);
                        const chart = context.chart;
    
                        if (dataIndex !== -1) {
                            const elements = chartData.datasets.map((_, idx) => ({
                                datasetIndex: idx,
                                index: dataIndex
                            }));
    
                            if (chart.tooltip._active[0]?.index !== dataIndex) {
                                chart.tooltip.setActiveElements(elements, {
                                    x: chart.scales.x.getPixelForValue(dataIndex),
                                    y: chart.scales.y.getPixelForValue(data[dataIndex].Heading),
                                });
                                chart.update('none'); // Avoid animation
                            }
                        }
                    }
                },
            },
        }
    };

    return (
        <div
            style={{ width: '900px', height: '200px' }}
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
            <Line data={chartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
        </div>
    );
};


export default Altitude;
