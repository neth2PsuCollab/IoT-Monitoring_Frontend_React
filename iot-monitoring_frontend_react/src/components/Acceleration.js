import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chart.js/auto';

const Acceleration = ({ data, onDataHover }) => {
    const formatTimestamp = (timestamp) => {
        return timestamp.split('.')[1] || timestamp;
    };

    const chartData = {
        labels: data.map(item => formatTimestamp(item.timestamp)),
        datasets: [
            {
                label: 'AccelerationX',
                data: data.map(item => parseFloat(item.AccelerationX) || 0),
                borderColor: '#8884d8',
                backgroundColor: 'rgba(136, 132, 216, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'AccelerationY',
                data: data.map(item => parseFloat(item.AccelerationY) || 0),
                borderColor: '#82ca9d',
                backgroundColor: 'rgba(130, 202, 157, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: 'AccelerationZ',
                data: data.map(item => parseFloat(item.AccelerationZ) || 0),
                borderColor: '#ffc658',
                backgroundColor: 'rgba(255, 198, 88, 0.2)',
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
                        return `${context.dataset.label}: ${value} m/s²`;
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
                    text: 'Acceleration (m/s²)',
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

export default Acceleration;
