import {
    FaHome,
    FaChartBar,
    FaBookOpen,
    FaUsers,
    FaSignOutAlt,
    FaBook,
    FaNewspaper,
    FaRegNewspaper,
    FaCapsules,
} from "react-icons/fa";
import Image from "../components/Image";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = () => {
    const { url } = usePage();
    const currentPath = url;

    const today = new Date();
    const day = today.toLocaleDateString("en-US", { weekday: "long" });
    const date = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const menuItems = [
        { to: "/admin", icon: <FaHome size={18} />, label: "Home" },
        { to: "/addbook", icon: <FaBook size={18} />, label: "Manajemen Buku" },
        { to: "/addnews", icon: <FaNewspaper size={18} />, label: "Add News" },
        {
            to: "/admin/news",
            icon: <FaRegNewspaper size={18} />,
            label: "Manajemen News",
        },
        { to: "/reports", icon: <FaChartBar size={18} />, label: "Reports" },
        {
            to: "/transaction",
            icon: <FaBookOpen size={18} />,
            label: "Transaction",
        },
        { to: "/users", icon: <FaUsers size={18} />, label: "Users" },
    ];

    return (
        <div className="h-screen w-64 bg-[#111827] text-white flex flex-col justify-between">
            {/* Top Section */}
            <div>
                <div className="bg-[#1F2937] p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Image
                            src="/images/logo.png"
                            alt="SMAN 2 BANDUNG"
                            w={32}
                            h={32}
                        />
                        <h1 className="text-sm font-semibold text-gray-300">
                            SMAN 2 Bandung
                        </h1>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        {day},<br />
                        {date}
                    </p>
                </div>

                {/* Menu */}
                <div className="mt-6 px-4">
                    <div className="text-xs uppercase text-gray-400 mb-2">
                        Menu
                    </div>
                    <ul className="space-y-3">
                        {menuItems.map((item) => (
                            <li key={item.to}>
                                <Link
                                    href={item.to}
                                    className={`flex items-center gap-3 p-2 rounded-md transition ${
                                        currentPath === item.to
                                            ? "bg-blue-600"
                                            : "hover:bg-gray-700"
                                    }`}
                                >
                                    {item.icon}
                                    <span className="text-sm">
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="px-4 pb-6">
                <Link
                    href="/logout-admin"
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-3 p-2 rounded-md bg-red-600 hover:bg-red-700 text-sm"
                >
                    <FaSignOutAlt size={18} />
                    Log out
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
