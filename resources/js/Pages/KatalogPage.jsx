import { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import Image from "../components/Image";
import MainLayout from "../Layouts/MainLayout";
import TopPicksCarousel from "../components/TopPicksCarousel";

const KatalogPage = () => {

    const { books } = usePage().props;
    const [search, setSearch] = useState(""); // State untuk pencarian
    const [booksData, setBooksData] = useState([]); // Buku yang ditampilkan
    const [pagination, setPagination] = useState({}); // Pagination info

    // Mengambil data buku dari API dengan pencarian
    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`/books?search=${search}`);
        const data = await response.json();
        setBooksData(data.data);
        setPagination(data); // Update pagination data
    };

    // Menghandle pagination
    const handlePagination = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setBooksData(data.data);
        setPagination(data);
    };

    useEffect(() => {
        // Initial fetch on page load to get books and pagination data
        const fetchBooks = async () => {
            const response = await fetch(`/books`);
            const data = await response.json();
            setBooksData(data.data);
            setPagination(data); // Save pagination data
        };

        fetchBooks();
    }, []); // Empty dependency array to run on mount

    return (
        <div className="px-6 py-10 bg-gray-100 font-sans min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-sm text-gray-600 flex gap-2 items-center mb-8">
                    <Link href="/" className="hover:underline text-blue-600">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">Katalog</span>
                </div>

                <h1 className="text-3xl md:text-4xl mb-2 font-semibold font-inter">
                    Katalog Perpustakaan{" "}
                    <span className="font-bold font-inter">
                        SMAN 1 Baleendah
                    </span>
                </h1>
                <p className="italic font-semibold text-lg mb-2 font-kalam">
                    Temukan buku favoritmu dengan mudah.
                </p>
                <p className="italic font-semibold text-lg mb-6 font-kalam">
                    Gunakan fitur pencarian atau lihat rekomendasi buku pilihan
                    kami!
                </p>

                {/* ✅ Top Picks Carousel */}
                <div className="gap-4 mb-10">
                    <TopPicksCarousel books={books.slice(0, 5)} />
                </div>

                {/* 🔍 Search Bar */}
                <div className="bg-white flex gap-4 mb-10">
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-grow px-4 py-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-8 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Search
                    </button>
                </div>

                {/* 📚 Catalog List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 bg-gray-200 p-6 rounded-md">
                    {booksData?.map((book) => (
                        <Link
                            href={`/books/${book.id}`}
                            key={book.id}
                            className="flex flex-col px-4 py-4 bg-[#F5F7FA] hover:scale-[1.02] transition duration-300 ease-in-out transform rounded-lg  shadow-2xl"
                        >
                            <Image
                                src={book.image}
                                alt={book.title}
                                w={200}
                                h={240}
                                className="w-full h-[200px] items-center content-center justify-center object-fill mb-3 rounded-lg "
                            />
                            <h4 className="text-sm font-bold text-left text-[#165BAA]">
                                {book.title}
                                
                            </h4>
                            <div className=" w-full">
                                <p className="text-xs text-left text-[#1E81B0]">
                                  by  {book.author} 
                                </p>
                                {book.description && (
                                    <p className="text-xs mt-2 text-[#0B2545] text-justify">
                                        {book.description.length > 100
                                            ? book.description.substring(0, 40) +
                                            "..."
                                            : book.description}
                                    </p>
                                )}
                                <p className="text-xs  text-[#6B7280] mt-2">
                                    ISBN: {book.isbn} <br /> {book.pages} Pages
                                </p>
                            </div>
                            <Link
                                href={`/books/${book.id}`}
                                className="mt-3 inline-block text-center text-xs text-blue-600 font-semibold hover:underline"
                            >
                                Lihat Detail
                            </Link>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    {pagination.links?.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => handlePagination(link.url)}
                            disabled={!link.url}
                            className={`px-3 py-1 mx-1 rounded border ${
                                link.active
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-700"
                            }`}
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

KatalogPage.layout = (page) => (
    <MainLayout aboutData={page.props.aboutData}>
        {page}
    </MainLayout>
);

export default KatalogPage;
