import React from 'react';

const AltitudeAvgBox = ({ data }) => {
    const averageAltitude = data.length > 0 
        ? (data.reduce((sum, item) => sum + parseFloat(item.Altitude || 0), 0) / data.length).toFixed(1)
        : null;

        return (
            <div style={{
                width: '192px',            // เปลี่ยนให้เหมือน FixTypeAvgBox
                backgroundColor: '#F378F5',
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
                        Altitude trip (Avg)
                    </div>
                </div>
                <div style={{
                    padding: '30px 0'
                }}>
                    <div style={{
                        fontSize: '1.575rem',
                        fontWeight: 'bold'
                    }}>
                        {averageAltitude !== null ? averageAltitude : '-'} m
                    </div>
                </div>
            </div>
        );
    };

export default AltitudeAvgBox;
