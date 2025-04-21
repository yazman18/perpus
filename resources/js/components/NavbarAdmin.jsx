import { FaBars } from "react-icons/fa";

const NavbarAdmin = ({ toggleSidebar }) => {
    return (
        <div className="bg-blue-200 h-14 flex items-center justify-between px-4 shadow">
            {/* Minimize Button */}
            <button onClick={toggleSidebar} className="text-gray-800">
                <FaBars size={20} />
            </button>

            {/* Notifikasi / Aksi */}
            <div className="flex items-center gap-4">
                <button className="relative">
                    <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002
                                6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165
                                8 7.388 8 8.75v5.408c0 .538-.214 1.055-.595 1.437L6 17h5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavbarAdmin;
