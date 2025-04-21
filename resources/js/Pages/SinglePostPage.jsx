import { Link } from "@inertiajs/react";
import Image from "../components/Image";
import MainLayout from "../Layouts/MainLayout";

const SinglePostPage = ({ news }) => {
    return (
        <div className="flex flex-col gap-8 mt-4 px-4 md:px-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:gap-8">
                {/* Left Column for Title and Description */}
                <div className="lg:w-3/5 flex flex-col gap-6">
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-800">
                        {news.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-gray-500 text-sm flex-wrap">
                        <span className="font-semibold">Category:</span>
                        <span className="text-blue-700 font-medium">
                            {news.category}
                        </span>
                        <span>•</span>
                        <span>
                            {new Date(news.created_at).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Short Description */}
                    {news.short_description && (
                        <p className="text-gray-700 text-lg">
                            {news.short_description}
                        </p>
                    )}
                </div>
            </div>

            {/* News Cover Image in its own div */}
            {news.cover && (
                <div className="mt-8 w-full">
                    <div className="relative w-full h-[300px] flex justify-center items-center">
                        <Image
                            src={news.cover}
                            alt={news.title}
                            className="object-contain max-w-full max-h-full rounded-xl"
                        />
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="prose max-w-none mt-8 text-gray-700">
                <div
                    dangerouslySetInnerHTML={{ __html: news.content }}
                    className="text-justify leading-relaxed"
                />
            </div>

            {/* Optional: Add Related Posts or Navigation */}
            <div className="mt-12 text-center">
                <Link
                    href="/news" // Ganti 'to' dengan 'href'
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                    ← Back to News List
                </Link>
            </div>
        </div>
    );
};

SinglePostPage.layout = (page) => <MainLayout>{page}</MainLayout>;

export default SinglePostPage;
