import React from "react";
import { MdDashboard } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";

const HeaderSection = () => (
    <header className="w-full h-full bg-blue-600 text-white py-4 shadow-md mx-0 md:mx-4 rounded-lg">
        <div className="container mx-auto flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center mx-4">
                <div className="bg-white text-blue-600 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <MdDashboard size={24} /> 
                </div>
                <h1 className="text-2xl font-semibold">Cloud-Based IoT Monitoring Framework</h1>
            </div>
            <ThemeToggle />
        </div>
    </header>
);

export default HeaderSection;
