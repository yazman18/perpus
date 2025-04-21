import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { usePage, router } from "@inertiajs/react";

const TransactionAdmin = () => {
    const { peminjamans = [], pengembalians = [] } = usePage().props;
    const [activeTab, setActiveTab] = useState("peminjaman");

    const handleAcc = (id) => {
        router.post(`/transaksi/${id}/peminjaman/acc`);
    };

    const handleReject = (id) => {
        router.post(`/transaksi/${id}/peminjaman/tolak`);
    };

    const handleKembaliAcc = (id) => {
        router.post(`/transaksi/${id}/pengembalian/acc`);
    };

    const handleKembaliReject = (id) => {
        router.post(`/transaksi/${id}/pengembalian/tolak`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manajemen Transaksi</h1>

            {/* Tab Switch */}
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setActiveTab("peminjaman")}
                    className={`px-4 py-2 rounded ${
                        activeTab === "peminjaman"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-black"
                    }`}
                >
                    Peminjaman
                </button>
                <button
                    onClick={() => setActiveTab("pengembalian")}
                    className={`px-4 py-2 rounded ${
                        activeTab === "pengembalian"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-black"
                    }`}
                >
                    Pengembalian
                </button>
            </div>

            {/* Peminjaman */}
            {activeTab === "peminjaman" && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border shadow">
                        <thead className="bg-gray-100 text-center">
                            <tr>
                                <th className="p-2 border">Nama</th>
                                <th className="p-2 border">Buku</th>
                                <th className="p-2 border">Tanggal Pinjam</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peminjamans.map((item) => (
                                <tr key={item.id} className="text-center">
                                    <td className="border p-2">{item.nama}</td>
                                    <td className="border p-2">
                                        {item.book?.title}
                                    </td>
                                    <td className="border p-2">
                                        {item.tanggal_pinjam}
                                    </td>
                                    <td className="border p-2 capitalize">
                                        {item.status_peminjaman}
                                    </td>
                                    <td className="border p-2 space-x-2">
                                        {item.status_peminjaman ===
                                            "pending" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleAcc(item.id)
                                                    }
                                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    Setujui
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleReject(item.id)
                                                    }
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Tolak
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pengembalian */}
            {activeTab === "pengembalian" && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border shadow">
                        <thead className="bg-gray-100 text-center">
                            <tr>
                                <th className="p-2 border">Nama</th>
                                <th className="p-2 border">Buku</th>
                                <th className="p-2 border">Tanggal Pinjam</th>
                                <th className="p-2 border">Tanggal Kembali</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pengembalians.map((item) => (
                                <tr key={item.id} className="text-center">
                                    <td className="border p-2">{item.nama}</td>
                                    <td className="border p-2">
                                        {item.book?.title}
                                    </td>
                                    <td className="border p-2">
                                        {item.tanggal_pinjam}
                                    </td>
                                    <td className="border p-2">
                                        {item.tanggal_kembali}
                                    </td>
                                    <td className="border p-2 capitalize">
                                        {item.status_pengembalian}
                                    </td>
                                    <td className="border p-2 space-x-2">
                                        {item.status_pengembalian ===
                                            "pending" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleKembaliAcc(
                                                            item.id
                                                        )
                                                    }
                                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    Setujui
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleKembaliReject(
                                                            item.id
                                                        )
                                                    }
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Tolak
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

TransactionAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default TransactionAdmin;
