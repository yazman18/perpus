import { useState } from "react";
import { Link } from "@inertiajs/react";
import Image from "./Image";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // Track profile dropdown state

    const toggleDesktopDropdown = () => {
        setDesktopDropdownOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setOpen(false);
        setMobileDropdownOpen(false);
    };

    const handleLoginClick = () => {
        // Simulate login logic (you can replace this with actual login logic)
        setIsLoggedIn(true);
    };

    const handleLogoutClick = () => {
        // Simulate logout logic (you can replace this with actual logout logic)
        setIsLoggedIn(false);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen((prev) => !prev);
    };

    return (
        <nav className="bg-[#A8ACC2] w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 relative z-50">
            {/* LOGO */}
            <Link
                href="/"
                className="flex items-center gap-3 text-lg md:text-2xl font-bold"
            >
                <Image src="logo.png" alt="SMAN 2 BANDUNG" w={32} h={32} />
                <span>SMAN 2 Bandung</span>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden z-50">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-3xl focus:outline-none"
                >
                    {open ? "✖" : "≡"}
                </button>
            </div>

            {/* MOBILE MENU CONTENT */}
            {open && (
                <div className="fixed inset-0 top-16 bg-[#A8ACC2] flex flex-col items-center justify-start pt-10 gap-6 font-medium text-lg z-40">
                    <Link href="/" onClick={closeMobileMenu}>
                        Home
                    </Link>
                    <Link href="/about" onClick={closeMobileMenu}>
                        About
                    </Link>

                    {/* Mobile Dropdown */}
                    <div className="text-center">
                        <button
                            onClick={() =>
                                setMobileDropdownOpen(!mobileDropdownOpen)
                            }
                            className="focus:outline-none"
                        >
                            Service ▾
                        </button>
                        {mobileDropdownOpen && (
                            <div className="mt-2 space-y-2 text-sm">
                                <Link href="/katalog" onClick={closeMobileMenu}>
                                    Katalog
                                </Link>
                                <Link
                                    href="/peminjaman"
                                    onClick={closeMobileMenu}
                                >
                                    Peminjaman
                                </Link>
                                <Link
                                    href="/pengembalian"
                                    onClick={closeMobileMenu}
                                >
                                    Pengembalian
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/news" onClick={closeMobileMenu}>
                        News
                    </Link>

                    {/* Login/Profile toggle */}
                    {isLoggedIn ? (
                        <div className="text-center">
                            <button
                                onClick={toggleProfileDropdown}
                                className="focus:outline-none"
                            >
                                Profile ▾
                            </button>
                            {profileDropdownOpen && (
                                <div className="mt-2 space-y-2 text-sm">
                                    <Link
                                        href="/manage-account"
                                        onClick={closeMobileMenu}
                                    >
                                        Manage Account
                                    </Link>
                                    <Link
                                        href="/security"
                                        onClick={closeMobileMenu}
                                    >
                                        Security
                                    </Link>
                                    <button
                                        onClick={handleLogoutClick}
                                        className="w-full text-left px-4 py-2 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="w-full text-center"
                        >
                            Login
                        </button>
                    )}
                </div>
            )}

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8 font-medium relative">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>

                {/* Desktop Dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleDesktopDropdown}
                        className="focus:outline-none"
                    >
                        Service ▾
                    </button>
                    {desktopDropdownOpen && (
                        <div className="absolute bg-white text-black rounded shadow-md mt-2 right-0 min-w-[150px] z-50">
                            <Link
                                href="/katalog"
                                className="block px-4 py-2 hover:bg-blue-100"
                                onClick={() => setDesktopDropdownOpen(false)}
                            >
                                Katalog
                            </Link>
                            <Link
                                href="/peminjaman"
                                className="block px-4 py-2 hover:bg-blue-100"
                                onClick={() => setDesktopDropdownOpen(false)}
                            >
                                Peminjaman
                            </Link>
                            <Link
                                href="/pengembalian"
                                className="block px-4 py-2 hover:bg-blue-100"
                                onClick={() => setDesktopDropdownOpen(false)}
                            >
                                Pengembalian
                            </Link>
                        </div>
                    )}
                </div>

                <Link href="/news">News</Link>

                {/* Login/Profile toggle */}
                {isLoggedIn ? (
                    <div className="relative">
                        <button
                            onClick={toggleProfileDropdown}
                            className="focus:outline-none"
                        >
                            Profile ▾
                        </button>
                        {profileDropdownOpen && (
                            <div className="absolute bg-white text-black rounded shadow-md mt-2 right-0 min-w-[150px] z-50">
                                <Link
                                    href="/manage-account"
                                    className="block px-4 py-2 hover:bg-blue-100"
                                >
                                    Manage Account
                                </Link>
                                <Link
                                    href="/security"
                                    className="block px-4 py-2 hover:bg-blue-100"
                                >
                                    Security
                                </Link>
                                <button
                                    onClick={handleLogoutClick}
                                    className="block w-full px-4 py-2 hover:bg-blue-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={handleLoginClick} className="text-sm">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
