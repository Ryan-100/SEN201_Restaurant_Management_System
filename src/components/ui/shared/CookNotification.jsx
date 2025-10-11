import React, { useEffect, useRef } from "react";
import { useAppContext } from '../../../contexts/AppContext';

const CookNotification = () => {
    const { cookNotifications } = useAppContext();
    const audioRef = useRef(null);

    useEffect(() => {
        if (cookNotifications.length > 0 && audioRef.current) {
            audioRef.current.play().catch(err => {
                console.log('Audio play failed:', err);
            });
        }
    }, [cookNotifications.length]);

    return (
        <>
            <audio ref={audioRef} src="/notification.mp3" preload="auto" />
            <div className="fixed top-4 right-4 space-y-2 z-50">
                {cookNotifications.map(n => (
                    <div key={n.id} className="bg-blue-500 text-white p-4 rounded-lg shadow-xl text-lg font-semibold min-w-80">
                        🍳 {n.message}
                    </div>
                ))}
            </div>
        </>
    );
};

export default CookNotification;