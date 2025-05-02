import React, { useState, useEffect } from "react";
import { FaBars, FaBell } from "react-icons/fa";

const NavbarAdmin = ({ toggleSidebar }) => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const newNotification = {
                id: Date.now(),
                message: `Notifikasi baru pada ${new Date().toLocaleTimeString()}`,
                read: false,
            };

            setNotifications((prev) => [newNotification, ...prev]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const toggleNotificationDropdown = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="bg-blue-200 h-14 flex items-center justify-between px-4 md:px-6 shadow-md w-full">
            {/* Sidebar toggle */}
            <button onClick={toggleSidebar} className="text-gray-800">
                <FaBars size={20} />
            </button>

            {/* Notification */}
            <div className="relative">
                <button
                    onClick={toggleNotificationDropdown}
                    className="relative"
                >
                    <FaBell size={20} className="text-gray-700" />
                    {notifications.filter((n) => !n.read).length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {notifications.filter((n) => !n.read).length}
                        </span>
                    )}
                </button>

                {/* Dropdown */}
                {showNotifications && (
                    <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg z-50 max-h-72 overflow-y-auto">
                        <ul className="py-2">
                            {notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className={`px-4 py-2 text-sm ${
                                        notification.read
                                            ? "text-gray-600"
                                            : "font-bold text-black"
                                    }`}
                                >
                                    {notification.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarAdmin;
