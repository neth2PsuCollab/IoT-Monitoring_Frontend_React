import React from 'react';

const FixTypeAvgBox = ({ data }) => {
  const averageFixType = data.length > 0 
    ? (data.reduce((sum, item) => sum + parseFloat(item.FixType || 0), 0) / data.length).toFixed(1)
    : null;

  return (
    <div style={{
      width: '192px', // w-48
      backgroundColor: '#22c55e', // green-500
      color: 'white',
      borderRadius: '0.375rem',
      display: 'flex',          // จัดตรงกลาง
      flexDirection: 'column',   // จัดเรียงแนวตั้ง
      justifyContent: 'flex-start', // ตั้งให้ชิ้นส่วนเริ่มจากด้านบน
      alignItems: 'center',     // จัดตรงกลางแนวนอน
      height: '150px',          // กำหนดความสูงเพื่อจัดตรงกลางได้พอดี
      textAlign: 'center'       // จัดข้อความตรงกลาง
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
          Fix (Avg)
        </div>
      </div>
      <div style={{
        padding: '30px 0'
      }}>
        <div style={{
          fontSize: '1.875rem',
          fontWeight: 'bold'
        }}>
          {averageFixType !== null ? averageFixType : '-'}
        </div>
      </div>
    </div>
  );
};

export default FixTypeAvgBox;
