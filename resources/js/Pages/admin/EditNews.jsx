import React from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

const EditNews = ({ news }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: news.title,
        category: news.category,
        short_description: news.short_description, // Bind the short_description
        content: news.content,
        cover: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/news/${news.id}`, {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="p-6 md:p-10 bg-white rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Edit Berita
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                encType="multipart/form-data"
            >
                {/* COVER */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gambar Cover
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setData("cover", e.target.files[0])}
                        className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-700"
                    />
                    {errors.cover && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.cover}
                        </p>
                    )}
                </div>

                {/* TITLE */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Judul Berita
                    </label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* CATEGORY */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori
                    </label>
                    <select
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="general">Umum</option>
                        <option value="web-design">Desain Web</option>
                        <option value="development">Pengembangan</option>
                    </select>
                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.category}
                        </p>
                    )}
                </div>

                {/* SHORT DESCRIPTION */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi Singkat
                    </label>
                    <textarea
                        value={data.short_description}
                        onChange={(e) =>
                            setData("short_description", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                    {errors.short_description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.short_description}
                        </p>
                    )}
                </div>

                {/* CONTENT */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Konten Lengkap
                    </label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={6}
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.content}
                        </p>
                    )}
                </div>

                {/* SUBMIT */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200"
                    >
                        {processing ? "Menyimpan..." : "Edit Berita"}
                    </button>
                </div>
            </form>
        </div>
    );
};

EditNews.layout = (page) => (
    <AdminLayout aboutData={page.props.aboutData}>
        {page}
    </AdminLayout>
);

export default EditNews;
