import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";

const tabs = [
    "Histori Transaksi",
    "Perpanjangan",
    "Konfirmasi",
    "Rekapitulasi",
    "Reservasi",
    "Keterlambatan & Denda",
    "Manajemen Denda",
];

const TransactionAdmin = () => {
    const [activeTab, setActiveTab] = useState("Histori Transaksi");

    const renderContent = () => {
        switch (activeTab) {
            case "Histori Transaksi":
                return <DummyTable title="Histori Transaksi" />;
            case "Perpanjangan":
                return <DummyTable title="Perpanjangan Peminjaman Buku" />;
            case "Konfirmasi":
                return <DummyTable title="Konfirmasi Transaksi Peminjaman" />;
            case "Rekapitulasi":
                return <DummyTable title="Rekapitulasi Transaksi" />;
            case "Reservasi":
                return (
                    <DummyTable title="Daftar Reservasi Buku oleh Anggota" />
                );
            case "Keterlambatan & Denda":
                return <DummyTable title="Transaksi Terlambat & Denda" />;
            case "Manajemen Denda":
                return (
                    <DummyTable title="Manajemen Denda (Aturan, Pengecualian, Pembayaran)" />
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Halaman Transaksi</h2>
            <div className="flex gap-2 flex-wrap mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded ${
                            activeTab === tab
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded shadow p-4">{renderContent()}</div>
        </div>
    );
};

const DummyTable = ({ title }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <table className="w-full text-sm border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">#</th>
                        <th className="border p-2">Nama</th>
                        <th className="border p-2">Judul Buku</th>
                        <th className="border p-2">Tanggal</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3].map((i) => (
                        <tr key={i} className="text-center">
                            <td className="border p-2">{i}</td>
                            <td className="border p-2">Nama {i}</td>
                            <td className="border p-2">Buku {i}</td>
                            <td className="border p-2">2025-04-0{i}</td>
                            <td className="border p-2">Selesai</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TransactionAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default TransactionAdmin;
