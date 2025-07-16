import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { LogOut, Lock, ArrowLeft } from "lucide-react";
import { UserCircle } from "lucide-react";

const Profile = () => {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="max-w-xl mx-auto mt-16 px-6 py-10 bg-white shadow-lg shadow-[#1B3C53] rounded-3xl border border-gray-200 animate-fade-in">
            <div className="flex flex-col items-center text-center">
                <UserCircle className="w-24 h-24 text-[#1B3C53] mb-4" />
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                    Halo, {user?.name} 👋
                </h1>
                <p className="text-gray-500 mt-1">Siswa Aktif di Perpustakaan Digital</p>
            </div>

            <div className="mt-8 space-y-4 bg-[#1B3C53] rounded-xl px-6 py-5 text-white shadow-inner">
                <div className="flex justify-between">
                    <span className="font-medium">📧 Email</span>
                    <span className="font-semibold">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">📅 Bergabung</span>
                    <span className="font-semibold">
                        {new Date(user?.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                    href="/change-password"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:brightness-110 transition"
                >
                    <Lock className="w-5 h-5" />
                    Ubah Password
                </Link>

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </Link>

                <Link
                    href="/"
                    as="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold shadow-lg hover:brightness-110 transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Kembali
                </Link>
            </div>
        </div>
    );
};

export default Profile;
