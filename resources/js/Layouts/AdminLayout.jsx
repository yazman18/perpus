import React, { useState } from "react"; // Pastikan useState diimpor di sini
import Sidebar from "../components/Sidebar";
import NavbarAdmin from "../components/NavbarAdmin";

// AdminLayout.jsx

const AdminLayout = ({ children, notifications, aboutData }) => {
    const [sidebarOpen, setSidebarOpen,] = useState(true);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            {sidebarOpen && (
                <div className="hidden md:flex md:w-64">
                <Sidebar aboutData={aboutData} /> {/* ← Kirim ke Footer */}
                </div>
            )}

            {/* Konten utama */}
            <div className="flex-1 flex flex-col bg-gray-100 overflow-auto">
                <NavbarAdmin
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                notifications={notifications}
                />
                <main className="p-4 overflow-auto">
                <div className="w-full overflow-x-auto">
                    {children}
                </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
