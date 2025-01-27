import React from "react";

const HeaderSection = () => (
    <header className="w-full h-full bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
                <div className="bg-white text-blue-600 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center">
                    
                </div>
                <h1 className="ml-4 text-2xl font-semibold">My Dashboard</h1>
            </div>
        </div>
    </header>
);

export default HeaderSection;
