import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useAppContext } from '../../../contexts/AppContext';

const Notification = ({ type = 'cook' }) => { // Add type prop
    const { cookNotifications, serverNotifications } = useAppContext();
    const notifications = type === 'cook' ? cookNotifications : serverNotifications;
    const audioRef = useRef(null);

    useEffect(() => {
        if (notifications?.length > 0 && audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => console.log('Audio play failed:', err));
            }
        }
    }, [notifications?.length]);

    return (
        <>
            <audio ref={audioRef} src="/notification.mp3" preload="auto" />
            <div className="fixed top-4 right-4 space-y-2 z-50">
                {notifications?.map(n => (
                    <div key={n.id} className={`${type === 'cook' ? 'bg-blue-500' : 'bg-green-500'} text-white p-3 rounded shadow-lg`}>
                        {type === 'cook' ? '🍳' : '🔔'} {n.message}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Notification;

Notification.propTypes = {
    type: PropTypes.oneOf(["cook", "server"]),
};