import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { LogOut, Lock, ArrowLeft } from "lucide-react";

const Profile = () => {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-2xl border border-gray-100">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Profil Pengguna
            </h1>

            <div className="space-y-4 text-gray-700 text-lg">
                <div>
                    <span className="font-semibold">👤 Nama:</span> {user?.name}
                </div>
                <div>
                    <span className="font-semibold">📧 Email:</span>{" "}
                    {user?.email}
                </div>
                <div>
                    <span className="font-semibold">📅 Terdaftar Sejak:</span>{" "}
                    {new Date(user?.created_at).toLocaleDateString()}
                </div>
            </div>

            <div className="mt-8 flex flex-col space-y-4">
                <Link
                    href="/change-password"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    <Lock className="w-5 h-5" />
                    Ubah Password
                </Link>

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </Link>

                <Link
                    href="/"
                    as="button"
                    className="inline-flex items-center justify-center gap-2 bg-gray-300 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Kembali
                </Link>
            </div>
        </div>
    );
};

export default Profile;
