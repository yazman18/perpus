import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";

const ReportAdmin = () => {
    const [statusFilter, setStatusFilter] = useState("");
    const [dateRange, setDateRange] = useState({
        start: "",
        end: "",
    });

    const transactions = [
        {
            id: 1,
            nama: "Aldo",
            buku: "Fisika Dasar",
            jenis: "Peminjaman",
            tanggal: "2025-04-06",
            status: "Dipinjam",
        },
        {
            id: 2,
            nama: "Nina",
            buku: "Kimia SMA",
            jenis: "Pengembalian",
            tanggal: "2025-04-05",
            status: "Dikembalikan",
        },
        {
            id: 3,
            nama: "Lina",
            buku: "Matematika Wajib",
            jenis: "Peminjaman",
            tanggal: "2025-04-03",
            status: "Dipinjam",
        },
    ];

    const filtered = transactions.filter((item) => {
        const date = new Date(item.tanggal);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        return (
            (!statusFilter || item.jenis === statusFilter) &&
            (!startDate || date >= startDate) &&
            (!endDate || date <= endDate)
        );
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Laporan Transaksi</h2>

            {/* Filter */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div>
                    <label className="block text-sm">Dari Tanggal</label>
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) =>
                            setDateRange({
                                ...dateRange,
                                start: e.target.value,
                            })
                        }
                        className="p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm">Sampai Tanggal</label>
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) =>
                            setDateRange({ ...dateRange, end: e.target.value })
                        }
                        className="p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm">Jenis Transaksi</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Semua</option>
                        <option value="Peminjaman">Peminjaman</option>
                        <option value="Pengembalian">Pengembalian</option>
                    </select>
                </div>
            </div>

            {/* Tabel Laporan */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">#</th>
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Judul Buku</th>
                            <th className="border p-2">Jenis</th>
                            <th className="border p-2">Tanggal</th>
                            <th className="border p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((item, index) => (
                                <tr key={item.id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{item.nama}</td>
                                    <td className="border p-2">{item.buku}</td>
                                    <td className="border p-2">{item.jenis}</td>
                                    <td className="border p-2">
                                        {item.tanggal}
                                    </td>
                                    <td className="border p-2">
                                        {item.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-4 text-center" colSpan={6}>
                                    Tidak ada data transaksi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ReportAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default ReportAdmin;
