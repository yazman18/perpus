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

    const handleAcc = (id) => router.post(`/transaksi/${id}/peminjaman/acc`);
    const handleReject = (id) =>
        router.post(`/transaksi/${id}/peminjaman/tolak`);
    const handleKembaliAcc = (id) =>
        router.post(`/transaksi/${id}/pengembalian/acc`);
    const handleKembaliReject = (id) =>
        router.post(`/transaksi/${id}/pengembalian/tolak`);

    const renderTableRow = (item, isPeminjaman = true) => (
        <tr key={item.id} className="text-center even:bg-gray-50">
            <td className="border px-4 py-2">{item.nama}</td>
            <td className="border px-4 py-2">{item.book?.title}</td>
            <td className="border px-4 py-2">{item.tanggal_pinjam}</td>
            {!isPeminjaman && (
                <td className="border px-4 py-2">{item.tanggal_kembali}</td>
            )}
            <td className="border px-4 py-2 capitalize">
                {isPeminjaman
                    ? item.status_peminjaman
                    : item.status_pengembalian}
            </td>
            <td className="border px-4 py-2 space-x-2">
                {(isPeminjaman
                    ? item.status_peminjaman
                    : item.status_pengembalian) === "pending" && (
                    <>
                        <button
                            onClick={() =>
                                isPeminjaman
                                    ? handleAcc(item.id)
                                    : handleKembaliAcc(item.id)
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                        >
                            Setujui
                        </button>
                        <button
                            onClick={() =>
                                isPeminjaman
                                    ? handleReject(item.id)
                                    : handleKembaliReject(item.id)
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                            Tolak
                        </button>
                    </>
                )}
            </td>
        </tr>
    );

    const renderPagination = (links) => (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url}
                    onClick={() => link.url && router.visit(link.url)}
                    className={`px-4 py-2 rounded shadow-sm border text-sm ${
                        link.active
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                📚 Manajemen Transaksi
            </h1>

            {/* Search */}
            <form
                onSubmit={handleSearch}
                className="mb-6 flex flex-col sm:flex-row gap-2"
            >
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari transaksi..."
                    className="flex-1 px-4 py-2 border rounded-md shadow-sm"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                >
                    🔍 Cari
                </button>
            </form>

            {/* Tabs */}
            <div className="mb-4 flex gap-2">
                {["peminjaman", "pengembalian"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-md font-medium ${
                            activeTab === tab
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Add Button */}
            <div className="mb-6">
                <button
                    onClick={() =>
                        router.get(
                            activeTab === "peminjaman"
                                ? "/admin/peminjaman/create"
                                : "/admin/pengembalian/create"
                        )
                    }
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    ➕ Tambah{" "}
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </button>
            </div>

            {/* Tables */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 shadow-sm">
                    <thead className="bg-gray-100 text-center text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border">Nama</th>
                            <th className="px-4 py-2 border">Buku</th>
                            <th className="px-4 py-2 border">Tanggal Pinjam</th>
                            {activeTab === "pengembalian" && (
                                <th className="px-4 py-2 border">
                                    Tanggal Kembali
                                </th>
                            )}
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(activeTab === "peminjaman"
                            ? peminjamans.data
                            : pengembalians.data
                        ).map((item) =>
                            renderTableRow(item, activeTab === "peminjaman")
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {renderPagination(
                    activeTab === "peminjaman"
                        ? peminjamans.links
                        : pengembalians.links
                )}
            </div>
        </div>
    );
};

TransactionAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default TransactionAdmin;
