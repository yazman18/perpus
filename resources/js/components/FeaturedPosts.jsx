import { Link } from "@inertiajs/react";
import Image from "./Image";

const FeaturedPosts = () => {
    return (
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/* First */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* image */}
                <Image
                    src="about-us.png"
                    className="rounded-3xl object-cover"
                />
                {/* detail */}
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold lg:text-lg">01.</h1>
                    <Link className="text-blue-800 lg:text-lg">Web design</Link>
                    <span className="text-gray-500">2 Days Ago</span>
                </div>
                {/* titles */}
                <Link
                    to="/posts"
                    className="text-xl lg:text-3xl font-semibold lg:font-bold"
                >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </Link>
            </div>
            {/* Others */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* second */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image
                        src="about-us.png"
                        className="rounded-3xl object-cover w-1/3 aspect-video"
                    />
                    {/* Details and title */}
                    <div className="w-2/3">
                        {/* detail */}
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">02.</h1>
                            <Link className="text-blue-800 ">Web design</Link>
                            <span className="text-gray-500 text-sm">
                                2 Days Ago
                            </span>
                        </div>
                        {/* titles */}
                        <Link
                            to="/test"
                            className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </Link>
                    </div>
                </div>
                {/* third */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image
                        src="about-us.png"
                        className="rounded-3xl object-cover w-1/3 aspect-video"
                    />
                    {/* Details and title */}
                    <div className="w-2/3">
                        {/* detail */}
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">03.</h1>
                            <Link className="text-blue-800 ">Web design</Link>
                            <span className="text-gray-500 text-sm">
                                2 Days Ago
                            </span>
                        </div>
                        {/* titles */}
                        <Link
                            to="/test"
                            className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </Link>
                    </div>
                </div>
                {/* fourth */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image
                        src="about-us.png"
                        className="rounded-3xl object-cover w-1/3 aspect-video"
                    />
                    {/* Details and title */}
                    <div className="w-2/3">
                        {/* detail */}
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">04.</h1>
                            <Link className="text-blue-800 ">Web design</Link>
                            <span className="text-gray-500 text-sm">
                                2 Days Ago
                            </span>
                        </div>
                        {/* titles */}
                        <Link
                            to="/test"
                            className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
                        >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPosts;
