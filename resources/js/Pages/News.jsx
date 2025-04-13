// News.jsx
import MainCategories from "../components/MainCategories";
import PostList from "../components/PostList";
import FeaturedPosts from "../components/FeaturedPosts";
import { Link } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

const News = ({ newsList }) => {
    return (
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-1">
                <Link to="/" className="">
                    Home
                </Link>
                <span className="">/</span>
                <span className="text-blue-800">News</span>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting
                    </h1>
                    <p className="mt-8 text-md md:text-xl">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </p>
                </div>
            </div>

            <MainCategories />
            <FeaturedPosts />

            <div className="">
                <h1 className="my-8 text-2xl text-grey-600">Recent Posts</h1>
                <PostList newsList={newsList} />
            </div>
        </div>
    );
};

News.layout = (page) => <MainLayout>{page}</MainLayout>;
export default News;
