import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chart.js/auto';

const Altitude = ({ data, onDataHover }) => {
    const formatTimestamp = (timestamp) => {
        return timestamp.split('.')[1] || timestamp;
    };

    const chartData = {
        labels: data.map(item => formatTimestamp(item.timestamp)),
        datasets: [
            {
                label: 'Heading',
                data: data.map(item => parseFloat(item.Heading) || 0),
                borderColor: '#ff7300',
                backgroundColor: 'rgba(255, 115, 0, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'Roll',
                data: data.map(item => parseFloat(item.Roll) || 0),
                borderColor: '#3875ff',
                backgroundColor: 'rgba(56, 117, 255, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'Pitch',
                data: data.map(item => parseFloat(item.Pitch) || 0),
                borderColor: '#82ca9d',
                backgroundColor: 'rgba(130, 202, 157, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: function(context) {
                        const idx = context[0].dataIndex;
                        return data[idx].timestamp;
                    },
                    label: function(context) {
                        const value = context.raw.toFixed(3);
                        return `${context.dataset.label}: ${value}°`;
                    },
                },
                padding: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    size: 12
                },
                bodyFont: {
                    size: 12
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
                ticks: {
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Altitude (°)',
                },
            },
        },
        hover: {
            mode: 'index',
            intersect: false,
        },
    };

    return (
        <div 
            style={{ width: '1900px', height: '300px', marginTop: '1px' }} 
            onMouseMove={(e) => {
                const chart = e.target.closest('canvas');
                if (!chart) return;

                const chartInstance = ChartJS.getChart(chart);
                if (!chartInstance) return;

                const elements = chartInstance.getElementsAtEventForMode(
                    e,
                    'index',
                    { intersect: false },
                    false
                );

                if (elements.length > 0) {
                    const dataIndex = elements[0].index;
                    onDataHover(data[dataIndex].timestamp);
                } else {
                    onDataHover(null);
                }
            }}
            onMouseLeave={() => onDataHover(null)}
        >
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default Altitude;
