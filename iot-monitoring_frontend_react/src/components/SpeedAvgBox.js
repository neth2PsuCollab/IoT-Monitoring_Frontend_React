import React from 'react';

const SpeedAvgBox = ({ data }) => {
    const averageSpeed = data.length > 0 
        ? (data.reduce((sum, item) => sum + parseFloat(item.Speed || 0), 0) / data.length).toFixed(2)
        : null;

        return (
            <div style={{
                width: '192px',            // เปลี่ยนให้เหมือน FixTypeAvgBox
                backgroundColor: '#FF7D7D',
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
                        Speed (Avg)
                    </div>
                </div>
                <div style={{
                    padding: '30px 0'
                }}>
                    <div style={{
                        fontSize: '1.575rem',
                        fontWeight: 'bold'
                    }}>
                        {averageSpeed !== null ? averageSpeed : '-'} Km/h
                    </div>
                </div>
            </div>
        );
    };

export default SpeedAvgBox;
