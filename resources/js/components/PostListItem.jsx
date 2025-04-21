// PostListItem.jsx
import { Link } from "@inertiajs/react";
import Image from "./Image";

const PostListItem = ({ news }) => {
    return (
        <div className="flex flex-col xl:flex-row gap-8">
            {/* Image */}
            <div className="md:hidden xl:block xl:w-1/3">
                <Image
                    src={news.cover}
                    alt={news.title}
                    className="rounded-2xl object-contain w-full h-auto" // Ensure image is fully contained and responsive
                    w="100%" // Set width to 100% to ensure it fills the container
                />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4 xl:w-2/3">
                <Link
                    href={`/news/${news.id}`}
                    className="text-4xl font-semibold"
                >
                    {news.title}
                </Link>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>Written by</span>
                    <Link className="text-blue-800">Admin</Link>
                    <span>on</span>
                    <Link className="text-blue-800">{news.category}</Link>
                    <span>
                        {new Date(news.created_at).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-gray-700">{news.short_description}</p>
                <Link
                    href={`/news/${news.id}`}
                    className="underline text-blue-800 text-sm"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default PostListItem;
