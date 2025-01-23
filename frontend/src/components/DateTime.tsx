import React, { useState, useEffect } from 'react';

const DateTimeDisplay: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            // Only update the state if the seconds have changed
            if (now.getSeconds() !== currentTime.getSeconds()) {
                setCurrentTime(now);
            }
        }, 1000); // Check every second

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [currentTime]);

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString(); // Format date as per locale
    };

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString(); // Format time as per locale
    };

    const formatDay = (date: Date): string => {
        return date.toLocaleDateString('en-US', { weekday: 'long' }); // Format day as full name
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 text-center font-bold">
                <p>{formatDate(currentTime)} | {formatTime(currentTime)}</p>
                <p>{formatDay(currentTime)}</p>
            </div>
        </div>
    );
};

export default DateTimeDisplay;