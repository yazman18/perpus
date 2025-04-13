import React from "react";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Konten Utama */}
            <div className="flex-1 p-4 overflow-auto bg-gray-50">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
