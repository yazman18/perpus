import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

const PeminjamanPage = ({ peminjamans }) => {
    const { flash } = usePage().props;
    const [selectedReturnId, setSelectedReturnId] = useState(null);

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
            <div className="max-w-8xl mx-auto p-6 ">
                <h1 className="text-4xl text-center font-bold mb-4 text-[#1B3C53]">
                    History Peminjaman
                </h1>
                <div className="mt-6 text-end">
                    <Link
                        href="/katalog"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                    >
                        Pinjam Buku
                    </Link>
                </div>
                {flash.success && (
                    <div className="p-2 mb-4 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                {!!peminjamans.length ? (
                    <div>
                        {peminjamans.map((item) => {
                            const sisaDurasi = calculateSisaDurasi(
                                item.tanggal_pinjam,
                                item.durasi
                            );
                            const terlambat = sisaDurasi < 0;
                            const denda = item.denda || sisaDurasi * -10000;

                            const isReturnPending =
                                item.status_pengembalian === "pending";
                            const isReturned =
                                item.status_pengembalian === "disetujui";
                            const notYetReturned =
                                item.status_pengembalian === "belum melakukan pengembalian";
                            const isRejected =
                                item.status_peminjaman === "ditolak";

                            return (
                                <div
                                    key={item.id}
                                    className="p-4 my-8 bg-white rounded-lg shadow-md shadow-[#1B3C53]"
                                >
                                    <h2 className="text-lg font-bold">
                                        {item.book?.title}
                                    </h2>
                                    <p>Penulis: {item.book?.author}</p>
                                    <p>Durasi: {item.durasi} hari</p>

                                    <p>
                                        Tanggal Peminjaman:{" "}
                                        {new Date(item.tanggal_pinjam).toLocaleDateString()}
                                    </p>

                                    {item.tanggal_kembali && (
                                        <p>
                                            Tenggat Kembali:{" "}
                                            {new Date(item.tanggal_kembali).toLocaleDateString()}
                                        </p>
                                    )}

                                    {isRejected && (
                                        <p className="text-red-600 font-semibold">
                                            Peminjaman Ditolak
                                        </p>
                                    )}

                                    {isReturned && (
                                        <p>
                                            Tanggal Pengembalian:{" "}
                                            {new Date(item.tanggal_pengembalian).toLocaleDateString()}
                                        </p>
                                    )}

                                    {!isRejected && !isReturned && (
                                        <>
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
                                            <p
                                                className={
                                                    sisaDurasi > 0
                                                        ? "hidden"
                                                        : "text-black"
                                                }
                                            >
                                                Denda: Rp {denda.toLocaleString("id-ID")}
                                            </p>
                                        </>
                                    )}

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
                                            {notYetReturned &&
                                                selectedReturnId !== item.id && (
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={(e) => {
                                                                setSelectedReturnId(item.id);
                                                                handleReturnSubmit(e, item.id);
                                                            }}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                                        >
                                                            Kembalikan Buku
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handlePerpanjang(item.id)
                                                            }
                                                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                                        >
                                                            Perpanjang
                                                        </button>
                                                    </div>
                                                )}

                                            {item.status_pengembalian === "pending" &&
                                                !selectedReturnId && (
                                                    <p className="font-semibold mt-2 text-yellow-600">
                                                        Menunggu Konfirmasi Pengembalian Admin
                                                    </p>
                                                )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10 text-lg italic">
                        Tidak ada peminjaman.
                    </div>
                )}
            </div>
        </div>
    );
};

PeminjamanPage.layout = (page) => (
    <MainLayout aboutData={page.props.aboutData}>{page}</MainLayout>
);
export default PeminjamanPage;
