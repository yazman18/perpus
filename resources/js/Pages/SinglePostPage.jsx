import { Link } from "@inertiajs/react";
import Image from "../components/Image";
import MainLayout from "../Layouts/MainLayout";

const SinglePostPage = ({ news }) => {
    return (
        <div className="flex flex-col gap-8 mt-4 px-4 md:px-8">
            {/* Header Section */}
            <div className="flex gap-8 flex-col lg:flex-row">
                <div className="lg:w-3/5 flex flex-col gap-6">
                    <h1 className="text-xl md:text-3xl xl:text-4xl font-semibold">
                        {news.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500 text-sm flex-wrap">
                        <span>Category:</span>
                        <span className="text-blue-700 font-medium">
                            {news.category}
                        </span>
                        <span>•</span>
                        <span>
                            {new Date(news.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    {news.short_description && (
                        <p className="text-gray-600">
                            {news.short_description}
                        </p>
                    )}
                </div>

                {news.cover && (
                    <div className="hidden lg:block w-2/5">
                        <Image
                            src={`/storage/${news.cover}`}
                            alt={news.title}
                            w="600"
                            className="rounded-2xl object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="prose max-w-none">
                <div
                    dangerouslySetInnerHTML={{ __html: news.content }}
                    className="text-justify"
                />
            </div>
        </div>
    );
};

SinglePostPage.layout = (page) => <MainLayout>{page}</MainLayout>;

export default SinglePostPage;
