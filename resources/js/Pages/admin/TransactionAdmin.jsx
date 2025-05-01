import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { usePage, router } from "@inertiajs/react";

const TransactionAdmin = () => {
    const {
        peminjamans = [],
        pengembalians = [],
        search = "",
    } = usePage().props;
    const [activeTab, setActiveTab] = useState("peminjaman");
    const [searchTerm, setSearchTerm] = useState(search);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/admin/transaksi",
            { search: searchTerm },
            { preserveState: true }
        );
    };

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

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for transactions"
                    className="px-4 py-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </form>

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

            {/* Add Button */}
            <div className="mb-4 flex gap-2">
                {activeTab === "peminjaman" && (
                    <button
                        onClick={() => router.get("/admin/peminjaman/create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Tambah Peminjaman
                    </button>
                )}
                {activeTab === "pengembalian" && (
                    <button
                        onClick={() => router.get("/admin/pengembalian/create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Tambah Pengembalian
                    </button>
                )}
            </div>

            {/* Peminjaman Tab */}
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
                            {peminjamans.data.map((item) => (
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
                    {/* Pagination */}
                    <div className="mt-4 flex justify-center">
                        {peminjamans.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                className={`px-3 py-1 mx-1 rounded ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-700"
                                }`}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Pengembalian Tab */}
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
                            {pengembalians.data.map((item) => (
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
                    {/* Pagination */}
                    <div className="mt-4 flex justify-center">
                        {pengembalians.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                className={`px-3 py-1 mx-1 rounded ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-700"
                                }`}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

TransactionAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default TransactionAdmin;
