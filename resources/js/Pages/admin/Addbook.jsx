import { useEffect, useState } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

const Addbook = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const fetchBooks = async () => {
    const res = await fetch("/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (flash?.book) {
      const updatedBook = flash.book;
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b))
      );
      setShowModal(false);
      setIsEditing(false);
      setEditId(null);
      reset();
      setImagePreview(null);
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
    if (confirm("Yakin ingin menghapus buku ini?")) {
      router.delete(`/books/${id}`, {
        onSuccess: () => setBooks((prev) => prev.filter((b) => b.id !== id)),
      });
    }
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
    };

    if (isEditing) {
      router.post(`/books/${editId}`, data, options);
    } else {
      post("/books", {
        ...options,
        onSuccess: () => {
          fetchBooks();
          reset();
          setShowModal(false);
          setImagePreview(null);
        },
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manajemen Buku</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
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
            {books.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">{book.year}</td>
                <td className="p-2">{book.stock}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="px-2 py-1 text-white bg-green-600 rounded"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-white bg-red-600 rounded"
                    onClick={() => handleDelete(book.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="title"
                  value={data.title}
                  onChange={(e) => setData("title", e.target.value)}
                  placeholder="Judul Buku"
                  className="p-2 border rounded"
                />
                <input
                  name="author"
                  value={data.author}
                  onChange={(e) => setData("author", e.target.value)}
                  placeholder="Penulis"
                  className="p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="publisher"
                  value={data.publisher}
                  onChange={(e) => setData("publisher", e.target.value)}
                  placeholder="Penerbit"
                  className="p-2 border rounded"
                />
                <input
                  name="year"
                  type="number"
                  value={data.year}
                  onChange={(e) => setData("year", e.target.value)}
                  placeholder="Tahun"
                  className="p-2 border rounded"
                />
              </div>
  
              <div className="grid grid-cols-3 gap-4">
                <input
                  name="pages"
                  type="number"
                  value={data.pages}
                  onChange={(e) => setData("pages", e.target.value)}
                  placeholder="Halaman"
                  className="p-2 border rounded"
                />
                <input
                  name="stock"
                  type="number"
                  value={data.stock}
                  onChange={(e) => setData("stock", e.target.value)}
                  placeholder="Stok"
                  className="p-2 border rounded"
                />
                <input
                  name="isbn"
                  value={data.isbn}
                  onChange={(e) => setData("isbn", e.target.value)}
                  placeholder="ISBN"
                  className="p-2 border rounded"
                />
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="language"
                  value={data.language}
                  onChange={(e) => setData("language", e.target.value)}
                  placeholder="Bahasa"
                  className="p-2 border rounded"
                />
                <select
                  name="category"
                  value={data.category}
                  onChange={(e) => setData("category", e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Kategori</option>
                  <option value="Fiksi">Fiksi</option>
                  <option value="Nonfiksi">Nonfiksi</option>
                  <option value="Sains">Sains</option>
                  <option value="Novel">Novel</option>
                  <option value="Biografi">Biografi</option>
                </select>
              </div>
  
              <textarea
                name="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                placeholder="Deskripsi"
                rows="3"
                className="w-full p-2 border rounded"
              />
  
              <div>
                <label className="block text-sm mb-2">Cover Buku</label>
                <input
                  type="file"
                  name="image"
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
                  className="bg-blue-600 text-white px-4 py-2 rounded"
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
                  className="px-4 py-2 border rounded"
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
}
  Addbook.layout = (page) => <AdminLayout>{page}</AdminLayout>;
  export default Addbook;
  
