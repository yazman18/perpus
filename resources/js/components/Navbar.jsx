import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Image from "./Image";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const { auth } = usePage().props;
    const isLoggedIn = !!auth?.user;

    const toggleDesktopDropdown = () => {
        setDesktopDropdownOpen((prev) => !prev);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setOpen(false);
        setMobileDropdownOpen(false);
        setProfileDropdownOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setOpen(false);
                setMobileDropdownOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="bg-[#A8ACC2] w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 relative z-50">
            {/* LOGO */}
            <Link
                href="/"
                className="flex items-center gap-3 text-lg md:text-2xl font-bold"
            >
                <Image
                    src="/images/logo.png"
                    alt="SMAN 2 BANDUNG"
                    w={32}
                    h={32}
                />
                <span>SMAN 2 Bandung</span>
            </Link>

            {/* Hamburger Icon */}
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden focus:outline-none z-50"
            >
                <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {open ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-16 left-0 w-full bg-[#A8ACC2] transition-all duration-300 ${
                    open ? "max-h-screen py-8" : "max-h-0 overflow-hidden"
                }`}
            >
                <div className="flex flex-col items-center gap-4 font-medium text-lg">
                    <Link href="/" onClick={closeMobileMenu}>
                        Home
                    </Link>
                    <Link href="/about" onClick={closeMobileMenu}>
                        About
                    </Link>

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
                            <div className="mt-2 flex flex-col items-start gap-2 text-sm">
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

                    {isLoggedIn ? (
                        <div className="text-center">
                            <button
                                onClick={toggleProfileDropdown}
                                className="focus:outline-none"
                            >
                                Profile ▾
                            </button>
                            {profileDropdownOpen && (
                                <div className="mt-2 flex flex-col items-start gap-2 text-sm">
                                    <Link
                                        href="/profile"
                                        onClick={closeMobileMenu}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/manage-account"
                                        onClick={closeMobileMenu}
                                    >
                                        Manage Account
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-4 py-2 text-sm"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" onClick={closeMobileMenu}>
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 font-medium relative">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>

                <div className="relative hidden md:block">
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
                            >
                                Katalog
                            </Link>
                            <Link
                                href="/peminjaman"
                                className="block px-4 py-2 hover:bg-blue-100"
                            >
                                Peminjaman
                            </Link>
                            {/* <Link
                                href="/pengembalian"
                                className="block px-4 py-2 hover:bg-blue-100"
                            >
                                Pengembalian
                            </Link> */}
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
                                    href="/profile"
                                    className="block px-4 py-2 hover:bg-blue-100"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/manage-account"
                                    className="block px-4 py-2 hover:bg-blue-100"
                                >
                                    Manage Account
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="block w-full px-4 py-2 hover:bg-blue-100"
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/login" className="text-sm">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
