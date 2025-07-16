import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { usePage, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const TransactionAdmin = () => {
    const {
        peminjamans = [],
        pengembalians = [],
        pengembalianOptions = [],
        search = "",
        notifications = [],
        books = [],
        users = [],
        errors = {},
        successMessage = "",
    } = usePage().props;

    const [showModalPeminjaman, setshowModalPeminjaman] = useState(false);
    const [showModalPengembalian, setshowModalPengembalian] = useState(false);
    const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);

    const [activeTab, setActiveTab] = useState("peminjaman");
    const [searchTerm, setSearchTerm] = useState(search);
    const { data, setData, post, reset } = useForm({
        nama: "",
        kelas: "",
        book_id: "",
        user_id: "",
        tanggal_pinjam: "",
    });

    const today = new Date().toISOString().split("T")[0];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/admin/transaksi",
            { search: searchTerm },
            { preserveState: true }
        );
    };

    const handleAddClick = () => {
        if (activeTab === "peminjaman") {
            setshowModalPeminjaman(true);
        } else if (activeTab === "pengembalian") {
            setshowModalPengembalian(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the form via Inertia's post method
        post("/admin/peminjaman", {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Peminjaman berhasil ditambah!",
                    showConfirmButton: false,
                    timer: 1500,
                }); // Set success message
                reset(); // Reset form after submission
                setshowModalPeminjaman(false);
            },
        });
    };
    const handleSubmitKembali = (e) => {
        if (selectedPeminjaman) {
            // Kirim pengembalian ke server
            router.post(
                `/transaksi/${selectedPeminjaman.id}/pengembalian/acc`,
                {
                    onSuccess: () => {
                        // Setelah berhasil, arahkan kembali ke halaman transaksi admin
                        Swal.fire({
                            icon: "success",
                            title: "Pengembalian Berhasil Dilakukan",
                            showConfirmButton: false,
                            timer: 1500,
                        }); // Set success message
                        router.get("/transaction");
                    },
                }
            );
        }
    };
    const handleBack = () => {
        setshowModalPeminjaman(false);
    };

    const handleAcc = (id) => {
        router.post(`/transaksi/${id}/peminjaman/acc`, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Peminjaman disetujui!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: (errors) => console.error(errors),
        });
    };

    const handleReject = (id) => {
        router.post(`/transaksi/${id}/peminjaman/tolak`, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Peminjaman ditolak!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    const handleKembaliAcc = (id) =>
        router.post(`/transaksi/${id}/pengembalian/acc`);
    const handleKembaliReject = (id) =>
        router.post(`/transaksi/${id}/pengembalian/tolak`);

    const renderTableRow = (item, isPeminjaman = true, index) => (
        <tr key={item.id} className="text-center even:bg-gray-50">
            <td>{index}</td>
            <td className="px-4 py-2">{item.nama}</td>
            <td className="px-4 py-2">{item.book?.uniqueId}</td>
            <td className="px-4 py-2 truncate max-w-40">{item.book?.title}</td>
            <td className="px-4 py-2">{item.tanggal_pinjam}</td>
            {!isPeminjaman && (
                <td className="px-4 py-2">{item.tanggal_kembali}</td>
            )}
            <td className="px-4 py-2 capitalize">
                {isPeminjaman
                    ? item.status_peminjaman
                    : item.status_pengembalian}
            </td>
            <td className="px-4 py-2 space-x-2">
                {(isPeminjaman
                    ? item.status_peminjaman
                    : item.status_pengembalian) === "pending" && (
                    <>
                        <button
                            onClick={() =>
                                isPeminjaman
                                    ? handleAcc(item.id)
                                    : handleKembaliAcc(item.id)
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                        >
                            Setujui
                        </button>
                        <button
                            onClick={() =>
                                isPeminjaman
                                    ? handleReject(item.id)
                                    : handleKembaliReject(item.id)
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                            Tolak
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
    

    const renderPagination = (links) => (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url}
                    onClick={() => link.url && router.visit(link.url)}
                    className={`px-4 py-2 rounded shadow-sm border text-sm ${
                        link.active
                            ? "bg-[#1B3C53] text-white font-bold"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );

    return (
        <div className="p-6 relative">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                📚 Manajemen Transaksi
            </h1>

            <form
                onSubmit={handleSearch}
                className="mb-6 flex flex-col sm:flex-row gap-2"
            >
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari transaksi..."
                    className="flex-1 px-4 py-2 border rounded-md shadow-sm"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                >
                    Cari
                </button>
            </form>

            <div className="mb-4 flex gap-2">
                {["peminjaman", "pengembalian"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-md font-medium ${
                            activeTab === tab
                                ? "bg-blue-500 hover:bg-blue-700 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="mb-6">
                <button
                    onClick={handleAddClick}
                    className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Tambah{" "}
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm shadow-sm">
                    <thead className="text-center text-gray-700 ">
                        <tr className="bg-[#1B3C53] text-white ">
                            <th className="py-2">No.</th>
                            <th>Nama</th>
                            <th>Unique Id</th>
                            <th>Buku</th>
                            <th>Tanggal Pinjam</th>
                            {activeTab === "pengembalian" && (
                                <th>Tenggat Kembali</th>
                            )}
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                  <tbody>
    {(activeTab === "peminjaman"
        ? peminjamans.data
        : pengembalians.data
    ).length > 0 ? (
        (activeTab === "peminjaman"
            ? peminjamans.data
            : pengembalians.data
        ).map((item, index) =>
            renderTableRow(
                item,
                activeTab === "peminjaman",
                index + 1
            )
        )
    ) : (
        <tr>
            <td className="p-4 text-center" colSpan={9}>
                Tidak ada data transaksi yang tersedia.
            </td>
        </tr>
    )}
</tbody>
                </table>
            </div>

            {showModalPeminjaman && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
                    <div className="max-w-4xl bg-white mx-auto p-6 rounded shadow-md">
                        <h1 className="text-2xl font-bold mb-4">
                            Form Peminjaman Buku oleh Admin
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>Nama</label>
                                <input
                                    placeholder="Masukkan nama lengkap"
                                    type="text"
                                    value={data.nama}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                                />
                                {errors.nama && (
                                    <p className="text-red-500 text-sm">
                                        {errors.nama}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label>Kelas</label>
                                <input
                                    placeholder="Masukkan kelas"
                                    type="text"
                                    value={data.kelas}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            kelas: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                />
                                {errors.kelas && (
                                    <p className="text-red-500 text-sm">
                                        {errors.kelas}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label>Pilih Buku</label>
                                <select
                                    value={data.book_id}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            book_id: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Pilih Buku</option>
                                    {books.map((book) => (
                                        <option key={book.id} value={book.id}>
                                            {book.title} — Stok: {book.stock}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Pilih User</label>
                                <select
                                    value={data.user_id}
                                    onChange={(e) => {
                                        const selectedUserId = e.target.value;
                                        setData({
                                            ...data,
                                            user_id: selectedUserId,
                                            nama:
                                                users.find(
                                                    (u) =>
                                                        u.id == selectedUserId
                                                )?.name || "",
                                        });
                                    }}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Pilih User</option>
                                    {users
                                        .filter((user) => user.role !== "admin")
                                        .map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
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

                            <div>
                                <label>Tanggal Pinjam</label>
                                <input
                                    type="date"
                                    value={data.tanggal_pinjam}
                                    min={today}
                                    onChange={(e) => {
                                        const tanggalPinjam = e.target.value;
                                        const tanggalKembali = new Date(
                                            tanggalPinjam
                                        );
                                        tanggalKembali.setDate(
                                            tanggalKembali.getDate() + 7
                                        );
                                        setData({
                                            ...data,
                                            tanggal_pinjam: tanggalPinjam,
                                            tanggal_pengembalian: tanggalKembali
                                                .toISOString()
                                                .split("T")[0],
                                        });
                                    }}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label>Tenggat Pengembalian</label>
                                <input
                                    type="date"
                                    value={data.tanggal_pengembalian}
                                    disabled
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Pinjam Buku
                            </button>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="ml-4 bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Kembali
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {showModalPengembalian && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
                    <div className="p-6 bg-white">
                        <h1 className="text-2xl font-bold mb-4">
                            Form Pengembalian Buku
                        </h1>

                        <form
                            onSubmit={handleSubmitKembali}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pilih Peminjaman untuk Pengembalian:
                                </label>
                                <select
                                    onChange={(e) => {
                                        const peminjamanId = e.target.value;
                                        if (peminjamanId === "") {
                                            setSelectedPeminjaman(null);
                                        } else {
                                            const peminjaman =
                                                pengembalianOptions.find(
                                                    (item) =>
                                                        item.id ===
                                                        parseInt(peminjamanId)
                                                );
                                            setSelectedPeminjaman(
                                                peminjaman || null
                                            );
                                        }
                                    }}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">
                                        -- Pilih Peminjaman --
                                    </option>
                                    {pengembalianOptions.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama} - {item.book.title}
                                        </option>
                                    ))}
                                    {/* {peminjamans.data.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nama} - {item.book.title}
                            </option>
                        ))} */}
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
                                            <strong>
                                                Tanggal Pengembalian:{" "}
                                            </strong>{" "}
                                            {new Date(
                                                selectedPeminjaman.tanggal_kembali
                                            ).toLocaleDateString()}
                                        </p>

                                        <p>
                                            <strong>Status Peminjaman: </strong>{" "}
                                            {
                                                selectedPeminjaman.status_peminjaman
                                            }
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
                                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Kembali ke Transaksi Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {renderPagination(
                activeTab === "peminjaman"
                    ? peminjamans.links
                    : pengembalians.links
            )}
        </div>
    );
};

TransactionAdmin.layout = (page) => (
    <AdminLayout aboutData={page.props.aboutData}>{page}</AdminLayout>
);

export default TransactionAdmin;
