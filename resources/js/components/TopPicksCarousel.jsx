import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Image from "./Image";
import MainLayout from "../Layouts/MainLayout";

const TopPicksCarousel = () => {
    const [topPicks, setTopPicks] = useState([]);
    const [offset, setOffset] = useState(0);
    const cardsToShow = 2; // Tampilkan 2 kartu per baris
    const cardWidth = 400; // Lebar per card
    const gap = 20; // Jarak antar card

    useEffect(() => {
        fetch("/books/top-picks")
            .then((res) => res.json())
            .then((data) => setTopPicks(data));
    }, []);

    const handlePrev = () => {
        if (offset > 0) {
            setOffset(offset - 1);
        }
    };

    const handleNext = () => {
        if (offset < topPicks.length - cardsToShow) {
            setOffset(offset + 1);
        }
    };

    return (
        <div className="relative w-full">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Top Picks
            </h2>
            <div className="relative overflow-hidden">
                <div className="flex items-center">
                    {/* Tombol Kiri */}
                    <button
                        onClick={handlePrev}
                        className="z-10 p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-blue-100 transition"
                    >
                        &#8592;
                    </button>

                    {/* Konten Slider */}
                    <div className="w-full overflow-hidden px-4">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                width: `${
                                    topPicks.length * (cardWidth + gap)
                                }px`,
                                transform: `translateX(-${
                                    offset * (cardWidth + gap)
                                }px)`,
                            }}
                        >
                            {topPicks.map((book, index) => (
                                <Link
                                    key={book.id}
                                    href={`/book/${book.id}`}
                                    style={{
                                        width: `${cardWidth}px`,
                                        marginRight: `${
                                            index < topPicks.length - 1
                                                ? gap
                                                : 0
                                        }px`,
                                    }}
                                    className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                                >
                                    {/* Flexbox Layout untuk Gambar dan Teks */}
                                    <div className="flex w-full items-center">
                                        {/* Gambar di Kiri */}
                                        <div className="w-1/3">
                                            <Image
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover rounded-t-lg"
                                            />
                                        </div>

                                        {/* Teks di Kanan */}
                                        <div className="p-4 w-2/3">
                                            {/* Judul Buku */}
                                            <h3 className="text-lg font-semibold mb-2 text-blue-800">
                                                {book.title}
                                            </h3>
                                            {/* Deskripsi Buku */}
                                            <p className="text-gray-600 text-sm mb-4 mr-3">
                                                {book.description?.substring(
                                                    0,
                                                    80
                                                )}
                                                ...
                                            </p>
                                            {/* Penulis dan Tahun */}
                                            <p className="text-gray-600 text-sm">
                                                {book.author} - {book.year}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tombol Kanan */}
                    <button
                        onClick={handleNext}
                        className="z-10 p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-blue-100 transition"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </div>
    );
};

TopPicksCarousel.layout = (page) => <MainLayout>{page}</MainLayout>;
export default TopPicksCarousel;
