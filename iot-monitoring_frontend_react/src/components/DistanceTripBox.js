import React from 'react';

const DistanceTripBox = ({ data }) => {
    // ตรวจสอบว่า data มีข้อมูลหรือไม่
    const calculateDistance = () => {
        if (data.length < 2) return null; // ถ้ามีข้อมูลไม่ถึง 2 ตัว จะไม่สามารถคำนวณได้

        // หาค่าระยะทางระหว่าง timestamp แรกและสุดท้าย (ใช้ DistanceTrip จากแต่ละรายการ)
        const firstDistance = parseFloat(data[0].DistanceTrip || 0);
        const lastDistance = parseFloat(data[data.length - 1].DistanceTrip || 0);

        // คำนวณระยะทางรวมจาก timestamp แรกและสุดท้าย
        const distanceDifference = Math.abs(lastDistance - firstDistance);

        // เลือกแสดงผลในหน่วยที่เหมาะสม
        if (distanceDifference <= 500) {
            return `${distanceDifference.toFixed(0)} m`; // ถ้าระยะทางไม่เกิน 500 เมตร แสดงผลเป็นเมตร
        } else {
            return `${(distanceDifference / 1000).toFixed(1)} Km`; // ถ้าระยะทางเกิน 500 เมตร แสดงผลเป็นกิโลเมตร
        }
    };

    const distanceTrip = calculateDistance();

    return (
        <div className="w-full md:w-48 bg-blue-500 text-white rounded-md flex flex-col justify-start items-center h-36 text-center">
            <div className="border-b border-white/20 w-full text-center py-2 bg-black text-white">
                <div className="text-sm font-medium">
                    Distance trip (Avg)
                </div>
            </div>
            <div className="py-8">
                <div className="text-lg font-bold">
                    {distanceTrip !== null ? distanceTrip : '-'}
                </div>
            </div>
        </div>
    );
};

export default DistanceTripBox;
