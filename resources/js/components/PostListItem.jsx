// PostListItem.jsx
import { Link } from "@inertiajs/react";
import Image from "./Image";

const PostListItem = ({ news }) => {
    return (
        <div className="flex flex-col xl:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Image */}
            <div className="md:hidden xl:block xl:w-1/3">
                <Image
                    src={news.cover}
                    alt={news.title}
                    className="rounded-2xl object-cover w-full h-full" // Use object-cover for better image cropping
                />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4 xl:w-2/3">
                <Link
                    href={`/news/${news.id}`}
                    className="text-3xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                >
                    {news.title}
                </Link>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <span>Written by</span>
                    <Link className="text-blue-800 hover:text-blue-600 transition-colors duration-200">
                        Admin
                    </Link>
                    <span>on</span>
                    <Link className="text-blue-800 hover:text-blue-600 transition-colors duration-200">
                        {news.category}
                    </Link>
                    <span>
                        {new Date(news.created_at).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mt-2">
                    {news.short_description}
                </p>
                <Link
                    href={`/news/${news.id}`}
                    className="underline text-blue-800 hover:text-blue-600 text-sm mt-4 transition-colors duration-200"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default PostListItem;
