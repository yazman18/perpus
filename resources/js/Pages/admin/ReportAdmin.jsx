import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { usePage, router } from "@inertiajs/react";

const ReportAdmin = () => {
    const {
        transactions = [],
        totalBorrowed = 0,
        totalReturned = 0,
        links = [],
        search: currentSearch = "",
    } = usePage().props;

    const [search, setSearch] = useState(currentSearch);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/reports", { search }, { preserveState: true });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Laporan Transaksi</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-sm text-gray-500">Total Buku Dipinjam</p>
                    <p className="text-2xl font-bold">{totalBorrowed}</p>
                </div>
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-sm text-gray-500">
                        Total Buku Dikembalikan
                    </p>
                    <p className="text-2xl font-bold">{totalReturned}</p>
                </div>
            </div>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="flex items-center justify-end mb-4"
            >
                <input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded-l w-64"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-r"
                >
                    Search
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border shadow">
                    <thead className="bg-gray-100 text-center">
                        <tr>
                            <th className="border p-2">No</th>
                            <th className="border p-2">Judul</th>
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Transaction</th>
                            <th className="border p-2">Duration</th>
                            <th className="border p-2">Tanggal Pinjam</th>
                            <th className="border p-2">Tanggal Kembali</th>
                            <th className="border p-2">Denda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((item, index) => (
                                <tr key={item.id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{item.buku}</td>
                                    <td className="border p-2">{item.nama}</td>
                                    <td className="border p-2">{item.jenis}</td>
                                    <td className="border p-2">
                                        {item.durasi} hari
                                    </td>
                                    <td className="border p-2">
                                        {item.tanggal_pinjam}
                                    </td>
                                    <td className="border p-2">
                                        {item.tanggal_kembali ?? "-"}
                                    </td>
                                    <td className="border p-2">
                                        Rp {item.denda.toLocaleString("id-ID")}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-4 text-center" colSpan={8}>
                                    Tidak ada data transaksi yang disetujui.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                {links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() => router.visit(link.url)}
                        className={`px-3 py-1 mx-1 rounded border ${
                            link.active
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-700"
                        }`}
                    >
                        <span
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

ReportAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default ReportAdmin;
