import { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

const PengembalianFormAdmin = () => {
    const { peminjamans } = usePage().props; // Dapatkan peminjaman yang status pengembaliannya "belum melakukan pengembalian"
    const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedPeminjaman) {
            // Kirim pengembalian ke server
            router.post(
                `/transaksi/${selectedPeminjaman.id}/pengembalian/acc`,
                {
                    onSuccess: () => {
                        // Setelah berhasil, arahkan kembali ke halaman transaksi admin
                        router.get("/transaction");
                    },
                }
            );
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Form Pengembalian Buku</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pilih Peminjaman untuk Pengembalian:
                    </label>
                    <select
                        onChange={(e) => {
                            const peminjamanId = e.target.value;
                            const peminjaman = peminjamans.find(
                                (item) => item.id === parseInt(peminjamanId)
                            );
                            setSelectedPeminjaman(peminjaman || null);
                        }}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">-- Pilih Peminjaman --</option>
                        {peminjamans.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nama} - {item.book.title}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedPeminjaman && (
                    <div className="border p-4 bg-white rounded shadow mt-4">
                        <h3 className="text-lg font-semibold">
                            Detail Peminjaman
                        </h3>
                        <div className="mt-4">
                            <p>
                                <strong>Nama: </strong>{" "}
                                {selectedPeminjaman.nama}
                            </p>
                            <p>
                                <strong>Buku: </strong>{" "}
                                {selectedPeminjaman.book.title}
                            </p>
                            <p>
                                <strong>Durasi: </strong>{" "}
                                {selectedPeminjaman.durasi} hari
                            </p>
                            <p>
                                <strong>Tanggal Pinjam: </strong>{" "}
                                {new Date(
                                    selectedPeminjaman.tanggal_pinjam
                                ).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Tanggal Pengembalian: </strong>{" "}
                                {new Date(
                                    selectedPeminjaman.tanggal_kembali
                                ).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>Status Peminjaman: </strong>{" "}
                                {selectedPeminjaman.status_peminjaman}
                            </p>
                        </div>

                        {/* Tombol Pengembalian */}
                        <div className="mt-4 flex gap-4">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Setujui Pengembalian
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedPeminjaman(null); // Reset peminjaman yang dipilih
                                }}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                )}
            </form>

            {/* Back Button */}
            <div className="mt-4">
                <button
                    onClick={() => router.visit("/transaction")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Kembali ke Transaksi Admin
                </button>
            </div>
        </div>
    );
};

PengembalianFormAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default PengembalianFormAdmin;
