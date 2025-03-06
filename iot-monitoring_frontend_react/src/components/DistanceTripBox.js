import React from 'react';

const DistanceTripBox = ({ data }) => {
    if (data.length < 2) return null; // ต้องมีข้อมูลอย่างน้อย 2 จุดเพื่อคำนวณระยะทาง

    // ดึงค่า DistanceTrip ที่ timestamp แรกและสุดท้าย
    const firstDistance = parseFloat(data[0].DistanceTrip || 0);  // Distance ที่ timestamp แรก
    const lastDistance = parseFloat(data[data.length - 1].DistanceTrip || 0);  // Distance ที่ timestamp สุดท้าย

    // คำนวณระยะทางรวม
    const totalDistance = lastDistance - firstDistance;  // หน่วยเป็นเมตร

    // คำนวณค่าเฉลี่ย
    const averageDistanceTrip = (totalDistance / 1000).toFixed(1); // แปลงจากเมตรเป็นกิโลเมตร

    return (
        <div className="w-full md:w-48 bg-blue-500 text-white rounded-md flex flex-col justify-start items-center h-36 text-center">
            <div className="border-b border-white/20 w-full text-center py-2 bg-black text-white">
                <div className="text-sm font-medium">
                    Distance trip (Avg)
                </div>
            </div>
            <div className="py-8">
                <div className="text-lg font-bold">
                    {averageDistanceTrip} Km
                </div>
            </div>
        </div>
    );
};

export default DistanceTripBox;
