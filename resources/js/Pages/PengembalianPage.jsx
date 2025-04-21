import React from "react";
import { usePage, router } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

const PengembalianPage = () => {
    const { pengembalians = [], flash } = usePage().props;
    const dendaPerHari = 1000;

    const calculateSisaDurasi = (tanggalPinjam, durasi) => {
        const pinjamDate = new Date(tanggalPinjam);
        const returnDate = new Date(pinjamDate);
        returnDate.setDate(pinjamDate.getDate() + durasi);
        const now = new Date();
        const diff = Math.ceil((returnDate - now) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const handleKembalikan = (id) => {
        router.post(`/pengembalian/${id}/kembalikan`);
    };

    const handlePerpanjang = (id) => {
        router.post(`/pengembalian/${id}/perpanjang`);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Pengembalian</h1>

                {flash.success && (
                    <div className="p-2 mb-4 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                {pengembalians.length === 0 ? (
                    <p className="text-gray-600">
                        Tidak ada buku yang sedang dipinjam.
                    </p>
                ) : (
                    <div className="bg-gray-200 p-6 rounded">
                        {pengembalians.map((book) => {
                            const sisaDurasi = calculateSisaDurasi(
                                book.tanggal_pinjam,
                                book.durasi
                            );
                            const terlambat = sisaDurasi < 0;
                            const denda = terlambat
                                ? Math.abs(sisaDurasi) * dendaPerHari
                                : 0;
                            const sudahDikembalikan =
                                book.tanggal_kembali !== null;

                            return (
                                <div
                                    key={book.id}
                                    className="bg-white p-4 rounded shadow mb-4 flex gap-4"
                                >
                                    <img
                                        src={
                                            book.book?.image ||
                                            "/placeholder.jpg"
                                        }
                                        alt={book.book?.title}
                                        className="w-24 h-32 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-lg font-bold">
                                            {book.book?.title}
                                        </h2>
                                        <p>
                                            Durasi Peminjaman: {book.durasi}{" "}
                                            hari
                                        </p>
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
                                        <p>
                                            Denda: Rp{" "}
                                            {denda.toLocaleString("id-ID")}
                                        </p>

                                        {!sudahDikembalikan ? (
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() =>
                                                        handleKembalikan(
                                                            book.id
                                                        )
                                                    }
                                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                                >
                                                    Kembalikan
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handlePerpanjang(
                                                            book.id
                                                        )
                                                    }
                                                    className="bg-red-700 text-white px-4 py-2 rounded"
                                                >
                                                    Perpanjang
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="mt-2 text-sm font-semibold text-blue-700">
                                                Sudah Dikembalikan
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

PengembalianPage.layout = (page) => <MainLayout>{page}</MainLayout>;
export default PengembalianPage;
