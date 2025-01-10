// ChartContext.js
import React, { createContext, useContext, useState } from 'react';

const ChartContext = createContext();

export function ChartProvider({ children }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredTimestamp, setHoveredTimestamp] = useState(null);

    return (
        <ChartContext.Provider 
            value={{
                hoveredIndex,
                setHoveredIndex,
                hoveredTimestamp,
                setHoveredTimestamp
            }}
        >
            {children}
        </ChartContext.Provider>
    );
}

export function useChartContext() {
    const context = useContext(ChartContext);
    if (context === undefined) {
        throw new Error('useChartContext must be used within a ChartProvider');
    }
    return context;
}