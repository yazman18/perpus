import { usePage, Link } from "@inertiajs/react";
import Image from "../components/Image";
import TopPicksCarousel from "../components/TopPicksCarousel";
import MainLayout from "../Layouts/MainLayout";

const KatalogPage = () => {
    const { books } = usePage().props;

    return (
        <div className="px-6 py-10 bg-gray-100 font-sans min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl mb-2 font-inter">
                    Katalog Perpustakaan{" "}
                    <span className="font-bold font-inter">SMAN 2 Bandung</span>
                </h1>
                <p className="italic font-semibold text-lg mb-2 font-kalam">
                    Temukan buku favoritmu dengan mudah.
                </p>
                <p className="italic font-semibold text-lg mb-6 font-kalam">
                    Gunakan fitur pencarian atau lihat rekomendasi buku pilihan
                    kami!
                </p>

                {/* ✅ Top Picks Carousel */}
                <TopPicksCarousel books={books.slice(0, 5)} />

                {/* 🔍 Search Bar */}
                <div className="flex gap-4 mb-10">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="flex-grow px-4 border rounded-md shadow-sm"
                    />
                    <button className="px-8 py-4 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600">
                        Search
                    </button>
                </div>

                {/* 📚 Catalog List */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 bg-gray-200 p-6 rounded-md">
                    {books.map((book) => (
                        <Link
                            href={`/books/${book.id}`}
                            key={book.id}
                            className="bg-gray-200 p-4 flex flex-col items-start hover:scale-[1.02] transition duration-150"
                        >
                            <Image
                                src={`storage/${book.image}`}
                                alt={book.title}
                                w={200}
                                h={240}
                                className="max-w-full h-[240px] object-cover mb-3"
                            />
                            <h4 className="text-sm font-bold mb-1 text-left">
                                {book.title}
                            </h4>
                            <p className="text-xs text-left text-gray-600">
                                {book.author} <br /> {book.publisher} (
                                {book.year})
                            </p>
                            <p className="text-xs text-left text-gray-500 mt-1">
                                {book.isbn} <br /> {book.pages} halaman
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

KatalogPage.layout = (page) => <MainLayout>{page}</MainLayout>;

export default KatalogPage;
