import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";
import Image from "../components/Image";

const BookDetail = ({ book }) => {
    return (
        <div className="px-6 py-10 bg-gray-100 font-sans min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-md">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                        <Image
                            src={book.image}
                            alt={book.title}
                            w={300}
                            h={400}
                            className="object-cover rounded-md"
                        />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">{book.title}</h1>
                        <p className="text-gray-700 text-sm">
                            <strong>Penulis:</strong> {book.author}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Penerbit:</strong> {book.publisher}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Tahun:</strong> {book.year}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>ISBN:</strong> {book.isbn}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Bahasa:</strong> {book.language}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Jumlah Halaman:</strong> {book.pages}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Kategori:</strong> {book.category}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Stok:</strong> {book.stock}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Deskripsi:</strong>
                            <br />
                            {book.description}
                        </p>
                        <Link
                            href="/katalog"
                            className="mt-4 inline-block text-blue-600 underline"
                        >
                            Kembali ke Katalog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

BookDetail.layout = (page) => <MainLayout>{page}</MainLayout>;
export default BookDetail;
