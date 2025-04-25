import { Link } from "@inertiajs/react";
import Image from "../components/Image";
import MainLayout from "../Layouts/MainLayout";

const SinglePostPage = ({ news }) => {
    return (
        <div className="flex flex-col gap-10 mt-6 px-4 md:px-12 lg:px-24 xl:px-32 pb-16">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:gap-12">
                {/* Left Column for Title and Description */}
                <div className="lg:w-3/5 flex flex-col gap-6">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        {news.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Category:</span>
                            <span className="text-blue-700 font-medium">
                                {news.category}
                            </span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span>
                            {new Date(news.created_at).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Short Description */}
                    {news.short_description && (
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {news.short_description}
                        </p>
                    )}
                </div>
            </div>

            {/* News Cover Image */}
            {news.cover && (
                <div className="w-full rounded-xl overflow-hidden shadow-md">
                    <div className="relative w-full h-[300px] md:h-[400px] flex justify-center items-center bg-gray-50">
                        <Image
                            src={news.cover}
                            alt={news.title}
                            className="object-contain max-w-full max-h-full"
                        />
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="prose max-w-none prose-lg text-gray-800 leading-relaxed text-justify">
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>

            {/* Back Link */}
            <div className="text-center mt-12">
                <Link
                    href="/news"
                    className="inline-block text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                >
                    ← Back to News List
                </Link>
            </div>
        </div>
    );
};

SinglePostPage.layout = (page) => <MainLayout>{page}</MainLayout>;

export default SinglePostPage;
