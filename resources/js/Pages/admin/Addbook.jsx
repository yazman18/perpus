import { useEffect, useState } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

const Addbook = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman aktif
    const [totalPages, setTotalPages] = useState(1); // Menyimpan total halaman
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [search, setSearch] = useState(""); // State untuk pencarian

    const { flash } = usePage().props;

    const { data, setData, post, reset, errors } = useForm({
        title: "",
        author: "",
        publisher: "",
        year: "",
        isbn: "",
        pages: "",
        language: "",
        stock: "",
        category: "",
        description: "",
        image: null,
    });

    // Fungsi untuk mengambil data buku dengan pagination dan pencarian
    const fetchBooks = async (page = 1, search = "") => {
        const res = await fetch(`/books?page=${page}&search=${search}`);
        const data = await res.json();

        // Memeriksa apakah data.books adalah array dan menyimpannya
        if (data?.data && Array.isArray(data.data)) {
            setBooks(data.data); // Menyimpan data buku
            setTotalPages(data.last_page); // Mengupdate total halaman
        } else {
            console.error("Data books bukan array", data);
            setBooks([]); // Menangani jika data bukan array
        }
    };

    useEffect(() => {
        fetchBooks(currentPage, search); // Ambil data buku ketika halaman pertama dimuat atau pencarian berubah
    }, [currentPage, search]);

    useEffect(() => {
        if (flash?.book) {
            const updatedBook = flash.book;
            setBooks((prevBooks) =>
                prevBooks.map((b) =>
                    b.id === updatedBook.id ? updatedBook : b
                )
            );
            setShowModal(false);
            setIsEditing(false);
            setEditId(null);
            reset();
            setImagePreview(null);
            alert("Data buku berhasil diperbarui.");
        }
    }, [flash]);

    const handleEdit = (book) => {
        setData({
            title: book.title || "",
            author: book.author || "",
            publisher: book.publisher || "",
            year: book.year || "",
            isbn: book.isbn || "",
            pages: book.pages || "",
            language: book.language || "",
            stock: book.stock || "",
            category: book.category || "",
            description: book.description || "",
            image: null,
        });
        setImagePreview(`/storage/${book.image}`);
        setEditId(book.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        router.delete(`/books/${id}`, {
            onSuccess: () => {
                setBooks((prev) => prev.filter((b) => b.id !== id));
                alert("Buku berhasil dihapus.");
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            forceFormData: true,
            onSuccess: () => {
                fetchBooks(currentPage, search); // Ambil data buku setelah submit
                setShowModal(false);
                setIsEditing(false);
                setEditId(null);
                reset();
                setImagePreview(null);
                if (!isEditing) alert("Buku berhasil ditambahkan.");
            },
        };
        if (isEditing) {
            router.post(`/books/${editId}`, data, options);
        } else {
            post("/books", options);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Manajemen Buku</h1>
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Update pencarian
                    className="p-2 border rounded"
                    placeholder="Cari Buku..."
                />
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => fetchBooks(currentPage, search)} // Fetch buku berdasarkan pencarian
                >
                    Cari
                </button>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => {
                        reset();
                        setImagePreview(null);
                        setShowModal(true);
                        setIsEditing(false);
                        setEditId(null);
                    }}
                >
                    + Tambah Buku
                </button>
            </div>

            <div className="overflow-x-auto border rounded">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2">Judul</th>
                            <th className="p-2">Penulis</th>
                            <th className="p-2">Tahun</th>
                            <th className="p-2">Stok</th>
                            <th className="p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(books) && books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book.id} className="border-t">
                                    <td className="p-2">{book.title}</td>
                                    <td className="p-2">{book.author}</td>
                                    <td className="p-2">{book.year}</td>
                                    <td className="p-2">{book.stock}</td>
                                    <td className="p-2 space-x-2">
                                        <button
                                            className="px-2 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                                            onClick={() => handleEdit(book)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                                            onClick={() =>
                                                handleDelete(book.id)
                                            }
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-4 text-center" colSpan="5">
                                    Tidak ada data buku.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal untuk tambah/edit buku */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => {
                                setShowModal(false);
                                setIsEditing(false);
                                reset();
                                setImagePreview(null);
                            }}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                            {isEditing ? "Edit Buku" : "Tambah Buku"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* INPUT LABEL SECTIONS */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Judul Buku
                                    </label>
                                    <input
                                        name="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Penulis
                                    </label>
                                    <input
                                        name="author"
                                        value={data.author}
                                        onChange={(e) =>
                                            setData("author", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Penerbit
                                    </label>
                                    <input
                                        name="publisher"
                                        value={data.publisher}
                                        onChange={(e) =>
                                            setData("publisher", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Tahun
                                    </label>
                                    <input
                                        type="number"
                                        name="year"
                                        value={data.year}
                                        onChange={(e) =>
                                            setData("year", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Jumlah Halaman
                                    </label>
                                    <input
                                        type="number"
                                        name="pages"
                                        value={data.pages}
                                        onChange={(e) =>
                                            setData("pages", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Stok
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={data.stock}
                                        onChange={(e) =>
                                            setData("stock", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        ISBN
                                    </label>
                                    <input
                                        name="isbn"
                                        value={data.isbn}
                                        onChange={(e) =>
                                            setData("isbn", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Bahasa
                                    </label>
                                    <input
                                        name="language"
                                        value={data.language}
                                        onChange={(e) =>
                                            setData("language", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Kategori
                                    </label>
                                    <select
                                        name="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="p-2 border rounded w-full"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="Fiksi">Fiksi</option>
                                        <option value="Nonfiksi">
                                            Nonfiksi
                                        </option>
                                        <option value="Sains">Sains</option>
                                        <option value="Novel">Novel</option>
                                        <option value="Biografi">
                                            Biografi
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Deskripsi
                                </label>
                                <textarea
                                    name="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows="3"
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Cover Buku
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full p-2 border rounded bg-white"
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-4 w-32 h-40 object-cover rounded shadow"
                                    />
                                )}
                            </div>

                            <div className="space-x-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    {isEditing ? "Update" : "Simpan"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setIsEditing(false);
                                        reset();
                                        setImagePreview(null);
                                    }}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

Addbook.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Addbook;
