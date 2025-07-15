// News.jsx
import MainCategories from "../components/MainCategories";
import PostList from "../components/PostList";
import FeaturedPosts from "../components/FeaturedPosts";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

const About = () => {
    const { props } = usePage();
    const aboutData = props.aboutData;
    
    return (
        <div className="mt-8 px-6 md:px-12 lg:px-24 flex flex-col gap-10">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 flex gap-2 items-center">
                <Link href="/" className="hover:underline text-blue-600">
                    Home
                </Link>
                <span>/</span>
                <span className="text-gray-800 font-semibold">Struktur Organisasi</span>
            </nav>

            {/* Header */}
            <header className="text-center md:text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold  font-montserrat text-[#1B3C53] text">
                    Struktur Organisasi
                </h1>
                <p className="mt-10 text-gray-700">
                    Lihat susunan lengkap dari struktur organisasi sekolah kami, mulai dari kepala sekolah hingga staf pendukung.
                </p>
                <p className="text-gray-700">
                    Transparansi dan akuntabilitas adalah bagian dari nilai kami.
                </p>
            </header>

            <section className="text-center text-gray-500 italic py-10 rounded-lg mb-20">
                {aboutData?.gambar_struktur ? (
                    <img
                        src={`/storage/${aboutData.gambar_struktur}`}
                        alt="Struktur Organisasi"
                        className="mx-auto rounded-lg shadow-md max-w-full h-auto"
                    />
                ) : (
                    <p>Konten struktur organisasi akan ditampilkan di sini.</p>
                )}
            </section>
        </div>
    );
};

About.layout = (page) => (
    <MainLayout aboutData={page.props.aboutData}>
        {page}
    </MainLayout>
);

export default About;