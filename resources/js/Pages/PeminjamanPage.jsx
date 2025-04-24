import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";
import { useForm, usePage, router } from "@inertiajs/react"; // Menggunakan useForm dan router dari inertiajs

const PeminjamanPage = ({ peminjamans }) => {
    const [selectedReturnId, setSelectedReturnId] = useState(null);
    const [isReturning, setIsReturning] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, post, reset, errors } = useForm({
        tanggal_kembali: "",
    });

    const dendaPerHari = 1000;

    const calculateSisaDurasi = (tanggalPinjam, durasi) => {
        const pinjamDate = new Date(tanggalPinjam);
        const returnDate = new Date(pinjamDate);
        returnDate.setDate(pinjamDate.getDate() + durasi);
        const now = new Date();
        const diff = Math.ceil((returnDate - now) / (1000 * 60 * 60 * 24));
        return diff;
    };

    // Fungsi untuk menghandle pengembalian
    const handleReturnSubmit = (e, id) => {
        e.preventDefault(); // Menghindari form default submit
        router.post(`/pengembalian/${id}/kembalikan`, {
            tanggal_kembali: data.tanggal_kembali,  // Mengirimkan tanggal pengembalian ke backend
            onSuccess: () => {
                reset("tanggal_kembali");  // Reset data setelah sukses
                setSelectedReturnId(null); // Reset selected return ID
            },
        });
    };
    

    // Fungsi untuk memperpanjang peminjaman
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
                        <p className="mb-4 text-gray-600">Tidak ada buku yang dipinjam</p>
                        <Link
                            href="/peminjaman/create"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Pinjam Buku
                        </Link>
                    </div>
                )}

                {!!peminjamans.length && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Daftar Buku yang Dipinjam</h2>
                        {peminjamans.map((item) => {
                            const sisaDurasi = calculateSisaDurasi(item.tanggal_pinjam, item.durasi);
                            const terlambat = sisaDurasi < 0;
                            const denda = terlambat
                                ? Math.abs(sisaDurasi) * dendaPerHari
                                : 0;

                            const isReturnPending =
                                item.status_pengembalian === "pending";

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
                                                ? `Terlambat ${Math.abs(sisaDurasi)} hari`
                                                : `${sisaDurasi} hari`}
                                        </span>
                                    </p>
                                    <p>Denda: Rp {denda.toLocaleString("id-ID")}</p>

                                    {/* STATUS */}
                                    {item.status_peminjaman !== "disetujui" ? (
                                        <p className="font-semibold">
                                            Status Peminjaman:{" "}
                                            {item.status_peminjaman ===
                                            "ditolak"
                                                ? "Ditolak"
                                                : "Menunggu Konfirmasi"}
                                        </p>
                                    ) : item.status_pengembalian === "disetujui" ? (
                                        <p className="font-semibold text-green-600">
                                            Buku telah dikembalikan
                                        </p>
                                    ) : (
                                        <>
                                            {/* Tombol jika belum return form */}
                                            {!selectedReturnId &&
                                                item.status_pengembalian ===
                                                    "pending" && (
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={() =>
                                                                setSelectedReturnId(
                                                                    item.id
                                                                )
                                                            }
                                                            className="bg-green-600 text-white px-4 py-2 rounded"
                                                        >
                                                            Kembalikan
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

                                            {/* FORM PENGEMBALIAN */}
                                            {selectedReturnId === item.id && (
                                                <form
                                                    onSubmit={(e) =>
                                                        handleReturnSubmit(
                                                            e,
                                                            item.id
                                                        )
                                                    }
                                                    className="mt-4"
                                                >
                                                    <label className="block mb-1 font-semibold">
                                                        Tanggal Pengembalian:
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="tanggal_kembali"
                                                        value={
                                                            data.tanggal_kembali ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "tanggal_kembali",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded mb-2"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-green-700 text-white px-4 py-2 rounded"
                                                    >
                                                        Simpan Pengembalian
                                                    </button>
                                                </form>
                                            )}

                                            {/* Status jika sudah mengajukan return */}
                                            {item.status_pengembalian !==
                                                "pending" &&
                                                !selectedReturnId && (
                                                    <p className="font-semibold mt-2">
                                                        Status Pengembalian:{" Buku telah dikembalikan"}
                                                        {item.status_pengembalian ===
                                                        "ditolak"
                                                            ? "Ditolak"
                                                            : "Menunggu Konfirmasi"}
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

PeminjamanPage.layout = (page) => <MainLayout>{page}</MainLayout>;
export default PeminjamanPage;
