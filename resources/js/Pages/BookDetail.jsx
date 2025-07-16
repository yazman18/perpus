    import { useState, useEffect } from "react";
    import Image from "../components/Image";
    import MainLayout from "../Layouts/MainLayout";
    import { Link, useForm } from "@inertiajs/react";
    import TopPicksCarousel from "../components/TopPicksCarousel";

    const BookDetail = ({ book, user, books }) => {
        const { data, setData, post, reset, errors } = useForm({
                nama: user.name, // Nama pengguna sudah terisi dari backend
                kelas: "", // Kelas bisa diisi oleh pengguna
                book_id: book.id, // ID buku yang dipilih
                user_id: user.id, // ID pengguna yang sedang login
                tanggal_pinjam: "", // Tanggal peminjaman
                tanggal_pengembalian: "", // Tanggal pengembalian otomatis
            });
            const today = new Date().toISOString().split("T")[0];
        
            // Fungsi untuk menghitung tanggal pengembalian setelah durasi (7 hari)
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
        
            const handleSubmit = (e) => {
                e.preventDefault();
                if (data.tanggal_pinjam < today) {
                    alert("Tanggal peminjaman tidak boleh sebelum hari ini.");
                    return;
                }
                post("/peminjaman", {
                    onSuccess: () => {
                        reset(); // Reset form setelah berhasil submit
                    },
                });
            };
            const [showModalPeminjaman, setshowModalPeminjaman] = useState(false);
        const handleAddClick = () => {
            setshowModalPeminjaman(true);
        };
    const isAvailable = book.stock > 0;

    return (
    <div className="px-6 py-10 bg-gray-100 font-sans min-h-screen">
        <div className="max-w-5xl mx-auto bg-white shadow-md shadow-[#1B3C53] p-6 rounded-md">
            {/* Breadcrumb */}
            <p className="text-sm text-gray-600 mb-4">
                <Link href="/" className="hover:underline">
                Home
                </Link>{" "}
                /{" "}
                <Link href="/katalog" className="hover:underline">
                Katalog
                </Link>{" "}
                / Detail
            </p>

            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Cover */}
                <div className="w-full md:w-1/3">
                    <Image src={book.image} alt={book.title} w={300} h={400} className="object-cover rounded-md" />
                </div>

                {/* Book Info */}
                <div className="w-full md:w-2/3 flex flex-col">
                    {/* Judul + Button */}
                    <div className="flex flex-col md:flex-col items-start md:items-center gap-4  justify-start ">
                        <div className=" flex justify-between w-full">
                            <h1 className="text-3xl text-left font-bold flex justify-start text-[#1B3C53]">Detail Book</h1>
                            <div className="text-right ">
                                <button onClick={handleAddClick} disabled={!isAvailable} className={`px-6 py-2
                                    text-white text-sm font-semibold rounded-md ${ isAvailable
                                    ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed" }`}>
                                Pinjam Buku
                                </button>
                                <p className="text-sm mt-2">
                                    <strong>Ketersediaan:</strong>{" "}
                                    <span className={`${ isAvailable ? "text-green-600" : "text-red-600" } inline-flex
                                        items-center gap-1`}>
                                        <span className={`w-2 h-2 rounded-full ${ isAvailable ? "bg-green-500"
                                            : "bg-red-500" }`}></span>{" "}
                                        {isAvailable
                                        ? "Tersedia"
                                        : "Sedang dipinjam"}
                                    </span>
                                </p>
                            </div>
                        </div>
                        
                        {/* Button & Status */}
                    </div>

                    {/* Detail Table */}
                    <div className="mt-4 text-sm text-gray-800 ">
                        <div className="space-y-2">
                            <div className="flex">
                                <div className="w-40  font-semibold">
                                    Original
                                </div>
                                <div>: {book.title}</div>
                            </div>
                            {/* <div className="flex">
                                <div className="w-40  font-semibold">
                                    Format
                                </div>
                                <div>: 15x23cm</div>
                            </div> */}
                            <div className="flex">
                                <div className="w-40  font-semibold">
                                    ISBN
                                </div>
                                <div>: {book.isbn}</div>
                            </div>
                            <div className="flex">
                                <div className="w-40  font-semibold">
                                    Number of Page
                                </div>
                                <div>: {book.pages}</div>
                            </div>
                            <div className="flex">
                                <div className="w-40 font-semibold">
                                    Year of issue
                                </div>
                                <div>: {book.year}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Abstract */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Abstrak</h2>
                <p className="text-sm text-gray-800 leading-relaxed text-justify">
                    {book.description}
                </p>
            </div>

            <div className="gap-4 mb-10 mt-10">
                {/* Safe check: Ensure books is an array */}
                <TopPicksCarousel books={Array.isArray(books) ? books.slice(0, 5) : []} />
            </div>

            {/* Back Link */}
            <div className="mt-6">
                <Link href="/katalog" className="inline-block text-blue-600 underline">
                ← Kembali ke Katalog
                </Link>
            </div>
        </div>
        {showModalPeminjaman && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
                        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
                    <h1 className="text-2xl font-bold mb-4">
                        Form Peminjaman Buku
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="nama"
                                className="block text-sm font-semibold"
                            >
                                Nama
                            </label>
                            <input
                                type="text"
                                name="nama"
                                value={data.nama}
                                onChange={(e) => setData("nama", e.target.value)}
                                className="w-full p-2 border rounded"
                                disabled // Nama sudah terisi dan tidak bisa diubah
                            />
                            {errors.nama && (
                                <p className="text-red-500 text-sm">
                                    {errors.nama}
                                </p>
                            )}
                        </div>

                        {/* Kolom Kelas hanya tampil untuk Siswa */}
                        {user.role !== "guru" && (
                            <div>
                                <label
                                    htmlFor="kelas"
                                    className="block text-sm font-semibold"
                                >
                                    Kelas
                                </label>
                                <input
                                    placeholder="Masukkan kelas Anda"
                                    type="text"
                                    name="kelas"
                                    value={data.kelas}
                                    onChange={(e) =>
                                        setData("kelas", e.target.value)
                                    }
                                    className="w-full p-2 border rounded"
                                />
                                {errors.kelas && (
                                    <p className="text-red-500 text-sm">
                                        {errors.kelas}
                                    </p>
                                )}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="book_id"
                                className="block text-sm font-semibold"
                            >
                                Pilih Buku
                            </label>
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
                            {errors.book_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.book_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="tanggal_pinjam"
                                className="block text-sm font-semibold"
                            >
                                Tanggal Pinjam
                            </label>
                            <input
                                type="date"
                                name="tanggal_pinjam"
                                value={data.tanggal_pinjam}
                                min={today}
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

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Pinjam Buku
                        </button>
                    </form>
                </div>
                    </div>
                )}
    </div>
    );
    };

    BookDetail.layout = (page) => (
    <MainLayout aboutData={page.props.aboutData}>
        {page}
    </MainLayout>
    );

    export default BookDetail;
