import React, { useState, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react"; // Inertia hooks to manage form data and routing
import Swal from 'sweetalert2';

const PeminjamanFormAdmin = ({ books, users }) => {
    const { data, setData, post, reset, errors } = useForm({
        nama: "",
        kelas: "",
        book_id: "",
        user_id: "",
        tanggal_pinjam: "",
    });

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the form via Inertia's post method
        post("/admin/peminjaman", {
            onSuccess: () => {
               Swal.fire({
                    icon: 'success',
                    title: 'Peminjaman berhasil ditambah!',
                    showConfirmButton: false,
                    timer: 1500
                }); // Set success message
                reset(); // Reset form after submission
                handleBack();
            },
        });
    };

    const handleBack = () => {
        // Inertia navigation to '/transaction' page
        router.get("/transaction");
    };
        const today = new Date().toISOString().split("T")[0];
        const calculateReturnDate = (startDate) => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + 7); // Menambahkan 7 hari
            return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
        };
    
        // Mengupdate tanggal_pengembalian ketika tanggal_pinjam berubah
        useEffect(() => {
            if (data.tanggal_pinjam) {
                const returnDate = calculateReturnDate(data.tanggal_pinjam);
                setData("tanggal_pengembalian", returnDate);
            }
        }, [data.tanggal_pinjam, setData]);
    return (
        <div className="min-h-screen  px-6 py-10">
            <div className="max-w-4xl mx-auto  p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">
                    Form Peminjaman Buku oleh Admin
                </h1>

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-500 text-white p-2 mb-4 rounded">
                        {successMessage}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nama Input */}
                    <div>
                        <label className="block text-sm font-semibold">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    {/* Kelas Input */}
                    <div>
                        <label className="block text-sm font-semibold">
                            Kelas
                        </label>
                        <input
                            type="text"
                            name="kelas"
                            value={data.kelas}
                            onChange={(e) => setData("kelas", e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.kelas && (
                            <p className="text-red-500 text-sm">
                                {errors.kelas}
                            </p>
                        )}
                    </div>

                    {/* Book Selection */}
                    <div>
                        <label className="block text-sm font-semibold">
                            Pilih Buku
                        </label>
                        <select
                            name="book_id"
                            value={data.book_id}
                            onChange={(e) => setData("book_id", e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Pilih Buku</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title} — Stok: {book.stock}
                                </option>
                            ))}
                        </select>
                        {errors.book_id && (
                            <p className="text-red-500 text-sm">
                                {errors.book_id}
                            </p>
                        )}
                    </div>

                    {/* User Selection */}
                    <div>
                        <label className="block text-sm font-semibold">
                            Pilih User
                        </label>
                        <select
                            name="user_id"
                            value={data.user_id}
                            onChange={(e) => setData("user_id", e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Pilih User</option>
                            {users
                                .filter((user) => user.role !== "admin")
                                .map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                        </select>
                        {errors.user_id && (
                            <p className="text-red-500 text-sm">
                                {errors.user_id}
                            </p>
                        )}
                    </div>

                    {/* Tanggal Pinjam */}
                    <div>
                        <label className="block text-sm font-semibold">
                            Tanggal Pinjam
                        </label>
                        <input
                            type="date"
                            name="tanggal_pinjam"
                            min={today}
                            value={data.tanggal_pinjam}
                            onChange={(e) =>
                                setData("tanggal_pinjam", e.target.value)
                            }
                            className="w-full p-2 border rounded"
                        />
                        {errors.tanggal_pinjam && (
                            <p className="text-red-500 text-sm">
                                {errors.tanggal_pinjam}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="tanggal_pengembalian"
                            className="block text-sm font-semibold"
                        >
                            Tenggat Pengembalian
                        </label>
                        <input
                            type="date"
                            name="tanggal_pengembalian"
                            value={data.tanggal_pengembalian}
                            disabled // Tidak bisa diubah karena otomatis terisi
                            className="w-full p-2 border rounded"
                        />
                        {errors.tanggal_pengembalian && (
                            <p className="text-red-500 text-sm">
                                {errors.tanggal_pengembalian}
                            </p>
                        )}
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded"
                    >
                        Pinjam Buku
                    </button>

                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={handleBack}
                        className="ml-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                    >
                        Kembali
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PeminjamanFormAdmin;
