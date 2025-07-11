import { useState, useEffect } from "react";
import Image from "../components/Image";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import TopPicksCarousel from "../components/TopPicksCarousel";

const BookDetail = ({ book, books }) => {
    const isAvailable = book.stock > 0;

    return (
        <div className="px-6 py-10 bg-gray-100 font-sans min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-md p-6 rounded-md">
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
                        <Image
                            src={book.image}
                            alt={book.title}
                            w={300}
                            h={400}
                            className="object-cover rounded-md"
                        />
                    </div>

                    {/* Book Info */}
                    <div className="w-full md:w-2/3 flex flex-col">
                        {/* Judul + Button */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {book.title}
                                </h1>
                                <p className="text-sm text-gray-700 mt-1">
                                    By{" "}
                                    <span className="text-blue-600 font-medium">
                                        {book.author}
                                    </span>{" "}
                                    | ⭐ 4,5 ★
                                </p>
                            </div>

                            {/* Button & Status */}
                            <div className="text-right">
                                <Link
                                    href={`/peminjaman/${book.id}`}
                                    disabled={!isAvailable}
                                    className={`px-6 py-2 text-white text-sm font-semibold rounded-md ${
                                        isAvailable
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Pinjam Buku
                                </Link>
                                <p className="text-sm mt-2">
                                    <strong>Ketersediaan:</strong>{" "}
                                    <span
                                        className={`${
                                            isAvailable
                                                ? "text-green-600"
                                                : "text-red-600"
                                        } inline-flex items-center gap-1`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full ${
                                                isAvailable
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        ></span>{" "}
                                        {isAvailable
                                            ? "Tersedia"
                                            : "Sedang dipinjam"}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Detail Table */}
                        <div className="mt-4 text-sm text-gray-800">
                            <div className="space-y-2">
                                <div className="flex">
                                    <div className="w-40 font-semibold">
                                        Original
                                    </div>
                                    <div>: {book.title}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 font-semibold">
                                        Format
                                    </div>
                                    <div>: 15x23cm</div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 font-semibold">
                                        ISBN
                                    </div>
                                    <div>: {book.isbn}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-40 font-semibold">
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

                <div className="gap-4 mb-10">
                    {/* Safe check: Ensure books is an array */}
                    <TopPicksCarousel
                        books={Array.isArray(books) ? books.slice(0, 5) : []}
                    />
                </div>

                {/* Back Link */}
                <div className="mt-6">
                    <Link
                        href="/katalog"
                        className="inline-block text-blue-600 underline"
                    >
                        ← Kembali ke Katalog
                    </Link>
                </div>
            </div>
        </div>
    );
};

BookDetail.layout = (page) => <MainLayout>{page}</MainLayout>;
export default BookDetail;
