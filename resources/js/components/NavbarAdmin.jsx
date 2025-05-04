import React, { useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { usePage, router } from "@inertiajs/react";

const NavbarAdmin = ({ toggleSidebar }) => {
    const { notifications } = usePage().props;
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotificationDropdown = () => {
        setShowNotifications(!showNotifications);
    };

    // Fungsi untuk menandai notifikasi sebagai dibaca
    const markAsRead = (id) => {
        router.post(
            `/admin/notifications/${id}/read`,
            {},
            {
                onSuccess: (response) => {
                    // Menampilkan alert setelah notifikasi dibaca
                    if (response.props.status === "success") {
                        alert(response.props.message); // alert if success
                    } else {
                        alert(response.props.message); // alert if error
                    }
                },
                onError: (error) => {
                    console.error(
                        "Terjadi kesalahan saat memperbarui status notifikasi:",
                        error
                    );
                },
            }
        );
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

                {/* Dropdown Notifikasi */}
                {showNotifications && notifications.length > 0 && (
                    <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg z-50 max-h-72 overflow-y-auto">
                        <ul className="py-2">
                            {notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className={`px-4 py-2 text-sm cursor-pointer ${
                                        notification.read
                                            ? "text-gray-600 bg-gray-200" // Sudah dibaca
                                            : "font-bold text-black" // Belum dibaca
                                    }`}
                                    onClick={() => markAsRead(notification.id)} // Menambahkan onClick untuk menandai notifikasi dibaca
                                    style={{
                                        transition:
                                            "background-color 0.3s, color 0.3s", // Efek transisi untuk klik
                                    }}
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
