import React from 'react';

const DistanceTripBox = ({ data }) => {
    const averageDistanceTrip = data.length > 0 
        ? (data.reduce((sum, item) => sum + parseFloat(item.DistanceTrip || 0), 0) / data.length / 1000).toFixed(1)
        : null;

    return (
        <div style={{
            width: '192px',            // เปลี่ยนให้เหมือน FixTypeAvgBox
            backgroundColor: '#0B9EFA',
            color: 'white',
            borderRadius: '0.375rem',
            display: 'flex',
            flexDirection: 'column',   // จัดเรียงแนวตั้ง
            justifyContent: 'flex-start', // ตั้งให้ชิ้นส่วนเริ่มจากด้านบน
            alignItems: 'center',
            height: '150px',
            textAlign: 'center'
        }}>
            <div style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                width: '100%',
                textAlign: 'center',
                padding: '8px 0',
                backgroundColor: 'black', // ปรับพื้นหลังเป็นสีดำ
                color: 'white'             // ตัวอักษรเป็นสีขาว
            }}>
                <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '500'
                }}>
                    Distance trip (Avg)
                </div>
            </div>
            <div style={{
                padding: '30px 0'
            }}>
                <div style={{
                    fontSize: '1.575rem',
                    fontWeight: 'bold'
                }}>
                    {averageDistanceTrip !== null ? averageDistanceTrip : '-'} Km
                </div>
            </div>
        </div>
    );
};

export default DistanceTripBox;
