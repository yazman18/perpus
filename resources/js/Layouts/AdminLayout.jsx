import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

import NavbarAdmin from "../components/NavbarAdmin";

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {sidebarOpen && <Sidebar />}

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-gray-100">
                <NavbarAdmin
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
                <main className="p-4 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
