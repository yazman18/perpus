import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

const PeminjamanPage = ({ peminjamans }) => {
    const { flash } = usePage().props;
    const [selectedReturnId, setSelectedReturnId] = useState(null);

    const dendaPerHari = 1000;

    const calculateSisaDurasi = (tanggalPinjam, durasi) => {
        const pinjamDate = new Date(tanggalPinjam);
        const returnDate = new Date(pinjamDate);
        returnDate.setDate(pinjamDate.getDate() + durasi);
        const now = new Date();
        const diff = Math.ceil((returnDate - now) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const handleReturnSubmit = (e, id) => {
        e.preventDefault(); // Menghentikan aksi default form submission
        router.post(`/pengembalian/${id}/kembalikan`, {
            onSuccess: () => {
                setSelectedReturnId(null); // Reset selected return ID setelah pengembalian berhasil
            },
        });
    };

    const handlePerpanjang = (id) => {
        router.post(`/peminjaman/${id}/perpanjang`);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Peminjaman</h1>

                {flash.success && (
                    <div className="p-2 mb-4 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                {!peminjamans.length && (
                    <div className="text-center py-10">
                        <p className="mb-4 text-gray-600">
                            Tidak ada buku yang dipinjam
                        </p>
                        <Link
                            href="/katalog"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Pinjam Buku
                        </Link>
                    </div>
                )}

                {!!peminjamans.length && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Daftar Buku yang Dipinjam
                        </h2>
                        {peminjamans.map((item) => {
                            const sisaDurasi = calculateSisaDurasi(
                                item.tanggal_pinjam,
                                item.durasi
                            );
                            const terlambat = sisaDurasi < 0;
                            const denda = terlambat
                                ? Math.abs(sisaDurasi) * dendaPerHari
                                : 0;

                            const isReturnPending =
                                item.status_pengembalian === "pending";
                            const isReturned =
                                item.status_pengembalian === "disetujui";
                            const notYetReturned =
                                item.status_pengembalian ===
                                "belum melakukan pengembalian";

                            const isRejected =
                                item.status_peminjaman === "ditolak"; // Check for rejected borrowing

                            return (
                                <div
                                    key={item.id}
                                    className="border p-4 my-2 bg-white rounded shadow"
                                >
                                    <h2 className="text-lg font-bold">
                                        {item.book?.title}
                                    </h2>
                                    <p>Penulis: {item.book?.author}</p>
                                    <p>Durasi: {item.durasi} hari</p>

                                    {/* Tanggal Peminjaman */}
                                    <p>
                                        Tanggal Peminjaman:{" "}
                                        {new Date(
                                            item.tanggal_pinjam
                                        ).toLocaleDateString()}
                                    </p>

                                    {/* Tanggal Pengembalian */}
                                    {item.tanggal_kembali && (
                                        <p>
                                            Tanggal Pengembalian:{" "}
                                            {new Date(
                                                item.tanggal_kembali
                                            ).toLocaleDateString()}
                                        </p>
                                    )}

                                    {/* Display rejection message if the borrowing is rejected */}
                                    {isRejected && (
                                        <p className="text-red-600 font-semibold">
                                            Peminjaman Ditolak
                                        </p>
                                    )}

                                    {/* Menyembunyikan sisa durasi dan denda jika buku sudah dikembalikan atau ditolak */}
                                    {!isRejected && !isReturned && (
                                        <p>
                                            Sisa Durasi:{" "}
                                            <span
                                                className={
                                                    terlambat
                                                        ? "text-red-600"
                                                        : "text-green-600"
                                                }
                                            >
                                                {terlambat
                                                    ? `Terlambat ${Math.abs(
                                                          sisaDurasi
                                                      )} hari`
                                                    : `${sisaDurasi} hari`}
                                            </span>
                                        </p>
                                    )}

                                    {/* Hide denda if the borrowing is rejected */}
                                    {!isRejected && (
                                        <p>
                                            Denda: Rp{" "}
                                            {denda.toLocaleString("id-ID")}
                                        </p>
                                    )}

                                    {/* STATUS */}
                                    {item.status_peminjaman !== "disetujui" ? (
                                        !isRejected && (
                                            <p className="font-semibold text-yellow-600 mt-2">
                                                Menunggu Konfirmasi Admin
                                            </p>
                                        )
                                    ) : isReturned ? (
                                        <p className="font-semibold text-green-600 mt-2">
                                            Buku telah dikembalikan
                                        </p>
                                    ) : (
                                        <>
                                            {/* Tombol jika belum return form */}
                                            {notYetReturned &&
                                                selectedReturnId !==
                                                    item.id && (
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={(e) => {
                                                                setSelectedReturnId(
                                                                    item.id
                                                                );
                                                                handleReturnSubmit(
                                                                    e,
                                                                    item.id
                                                                );
                                                            }}
                                                            className="bg-green-600 text-white px-4 py-2 rounded"
                                                        >
                                                            Kembalikan Buku
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handlePerpanjang(
                                                                    item.id
                                                                )
                                                            }
                                                            className="bg-blue-600 text-white px-4 py-2 rounded"
                                                        >
                                                            Perpanjang
                                                        </button>
                                                    </div>
                                                )}

                                            {/* STATUS PENGEMBALIAN PENDING */}
                                            {item.status_pengembalian ===
                                                "pending" &&
                                                !selectedReturnId && (
                                                    <p className="font-semibold mt-2 text-yellow-600">
                                                        Menunggu Konfirmasi
                                                        Pengembalian Admin
                                                    </p>
                                                )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link
                        href="/katalog"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Pinjam Buku
                    </Link>
                </div>
            </div>
        </div>
    );
};

PeminjamanPage.layout = (page) => (
    <MainLayout aboutData={page.props.aboutData}>
        {page}
    </MainLayout>
);
export default PeminjamanPage;
