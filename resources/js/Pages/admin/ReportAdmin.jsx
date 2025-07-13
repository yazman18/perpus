import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";
import { FaBook, FaUndo } from "react-icons/fa";

const ReportAdmin = () => {
    const {
        transactions = [],
        totalBorrowed = 0,
        totalReturned = 0,
        links = [],
        search: currentSearch = "",
    } = usePage().props;

    const [search, setSearch] = useState(currentSearch || "");

    function hitungDenda(tanggalPinjam, tanggalKembali = Date.now()) {
        const pinjamDate = new Date(tanggalPinjam);
        const kembaliDate = new Date(tanggalKembali);

        const diffTime = kembaliDate - pinjamDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const batasHari = 7;
        const dendaPerHari = 1000;

        if (diffDays > batasHari) {
            const telat = diffDays - batasHari;
            return telat * dendaPerHari;
        }

        return 0;
    }


    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/reports", { search }, { preserveState: true });
    };

    return (
        <div className="p-6 md:p-10 bg-white rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Laporan Transaksi
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-100 shadow rounded p-6 text-center">
                    <FaBook className="text-blue-600 text-3xl mx-auto mb-2" />
                    <p className="text-gray-500">Total Buku Dipinjam</p>
                    <p className="text-2xl font-bold text-blue-800">
                        {totalBorrowed}
                    </p>
                </div>
                <div className="bg-green-100 shadow rounded p-6 text-center">
                    <FaBook className="text-green-600 text-3xl mx-auto mb-2" />
                    <p className="text-gray-500">Total Buku Dikembalikan</p>
                    <p className="text-2xl font-bold text-green-800">
                        {totalReturned}
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="flex items-center justify-end mb-4"
            >
                <input
                    type="text"
                    placeholder="Cari transaksi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-300 rounded-l-md w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition"
                >
                    Cari
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto rounded shadow">
                <table className="w-full text-sm border">
                    <thead className="bg-gray-100 text-center">
                        <tr>
                            <th className="border p-2">No</th>
                            <th className="border p-2">Judul</th>
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Transaksi</th>
                            <th className="border p-2">Durasi</th>
                            <th className="border p-2">Tanggal Pinjam</th>
                            <th className="border p-2">Tenggat Kembali</th>
                            <th className="border p-2">Tanggal Kembali</th>
                            <th className="border p-2">Denda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            
                            transactions.map((item, index) => (
                                <tr
                                    key={item.id}
                                    
                                    className={`text-center ${
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    } hover:bg-gray-100 transition`}
                                >
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{item.buku}</td>
                                    <td className="border p-2">{item.nama}</td>
                                    <td className="border p-2">{item.jenis}</td>
                                    <td className="border p-2">
                                        {(() => {
                                            const pinjamDate = new Date(item.tanggal_pinjam);
                                            const kembaliDate = item.tanggal_pengembalian ? new Date(item.tanggal_pengembalian) : new Date();
                                            const diffTime = Math.abs(kembaliDate - pinjamDate);
                                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                            if (diffDays > 7) {
                                                return <span className="text-red-500 font-semibold">{diffDays} hari</span>;
                                            } else {
                                                return <span className="text-green-500 font-semibold">{diffDays}  hari</span>; // atau bisa return "Tidak telat" jika perlu
                                            }
                                        })()    }
                                    </td>
                                    <td className="border p-2">
                                        {item.tanggal_pinjam}
                                    </td>
                                    <td className="border p-2">
                                        {item.tanggal_kembali ?? "-"}
                                    </td>
                                    <td className="border p-2">
                                        {item.tanggal_pengembalian}
                                    </td>
                                    <td className="border p-2">
                                        {(() => {
                                                const denda = hitungDenda(item.tanggal_pinjam, item.tanggal_pengembalian);
                                                return denda > 0
                                                    ? denda.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                                                    : "Rp0,00";
                                            })()}
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
                        className={`px-3 py-1 mx-1 rounded border text-sm ${
                            link.active
                                ? "bg-black text-white font-semibold"
                                : "bg-white text-gray-700 hover:bg-gray-100"
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

ReportAdmin.layout = (page) => (
    <AdminLayout aboutData={page.props.aboutData}>
        {page}
    </AdminLayout>
);

export default ReportAdmin;
