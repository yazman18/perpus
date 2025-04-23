import { useState } from "react";
import { useForm } from "@inertiajs/react";

const PeminjamanForm = ({ book, user, books }) => {
    const { data, setData, post, reset, errors } = useForm({
        nama: user.name,  // Nama pengguna sudah terisi dari backend
        kelas: "",        // Kelas bisa diisi oleh pengguna
        book_id: book.id, // ID buku yang dipilih
        user_id: user.id, // ID pengguna yang sedang login
        tanggal_pinjam: "", // Tanggal peminjaman
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/peminjaman", {
            onSuccess: () => {
                reset();  // Reset form setelah berhasil submit
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Form Peminjaman Buku</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nama" className="block text-sm font-semibold">Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full p-2 border rounded"
                            disabled  // Nama sudah terisi dan tidak bisa diubah
                        />
                        {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
                    </div>

                    <div>
                        <label htmlFor="kelas" className="block text-sm font-semibold">Kelas</label>
                        <input
                            type="text"
                            name="kelas"
                            value={data.kelas}
                            onChange={(e) => setData("kelas", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.kelas && <p className="text-red-500 text-sm">{errors.kelas}</p>}
                    </div>

                    <div>
                        <label htmlFor="book_id" className="block text-sm font-semibold">Pilih Buku</label>
                        <select
                            name="book_id"
                            value={data.book_id}
                            onChange={(e) => setData("book_id", e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Pilih Buku</option>
                            {books.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.title} — stok: {b.stock}
                                </option>
                            ))}
                        </select>
                        {errors.book_id && <p className="text-red-500 text-sm">{errors.book_id}</p>}
                    </div>

                    <div>
                        <label htmlFor="tanggal_pinjam" className="block text-sm font-semibold">Tanggal Pinjam</label>
                        <input
                            type="date"
                            name="tanggal_pinjam"
                            value={data.tanggal_pinjam}
                            onChange={(e) => setData("tanggal_pinjam", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.tanggal_pinjam && <p className="text-red-500 text-sm">{errors.tanggal_pinjam}</p>}
                    </div>

                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Pinjam Buku</button>
                </form>
            </div>
        </div>
    );
};

export default PeminjamanForm;
