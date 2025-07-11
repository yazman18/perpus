// News.jsx
import MainCategories from "../components/MainCategories";
import PostList from "../components/PostList";
import FeaturedPosts from "../components/FeaturedPosts";
import { Link } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

const News = ({ newsList }) => {

    return (
        <div className="mt-6 px-4 md:px-12 lg:px-24 flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600 flex gap-2 items-center">
                <Link href="/" className="hover:underline text-blue-600">
                    Home
                </Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">News</span>
            </div>

            {/* Header */}
            <div className="text-center md:text-left">
                <h1 className="text-gray-900 text-3xl md:text-2xl lg:text-4xl font-bold leading-tight italic">
                    Tetap Terinformasi dengan Berita Terbaru Kami!
                </h1>
                <p className="mt-6 text-gray-700 text-base md:text-lg max-w-3xl">
                    Dapatkan update terkini seputar kegiatan sekolah, pengumuman
                    penting, dan informasi menarik lainnya hanya di halaman
                    berita ini.
                </p>
            </div>

            {/* Optional future components */}
            {/* <MainCategories /> */}
            {/* <FeaturedPosts /> */}

            {/* Recent Posts */}
            <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                    Postingan Terbaru
                </h2>
                <PostList newsList={newsList} />
            </div>
        </div>
    );
};

News.layout = (page) => (
    <MainLayout aboutData={page.props.aboutData}>
        {page}
    </MainLayout>
);

export default News;
