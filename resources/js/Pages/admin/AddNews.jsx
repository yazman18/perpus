import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useForm } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

const AddNews = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        category: "general",
        desc: "",
        content: "",
        cover: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/news", {
            forceFormData: true, // ⬅️ penting untuk upload file
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                encType="multipart/form-data"
            >
                {/* COVER */}
                <div>
                    <label className="text-sm font-medium">Cover Image</label>
                    <input
                        type="file"
                        onChange={(e) => setData("cover", e.target.files[0])}
                        className="block mt-1"
                    />
                    {errors.cover && (
                        <p className="text-red-500">{errors.cover}</p>
                    )}
                </div>

                {/* TITLE */}
                <input
                    type="text"
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className="text-xl p-2 border-b"
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}

                {/* CATEGORY */}
                <select
                    value={data.category}
                    onChange={(e) => setData("category", e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="general">General</option>
                    <option value="web-design">Web Design</option>
                    <option value="development">Development</option>
                </select>
                {errors.category && (
                    <p className="text-red-500">{errors.category}</p>
                )}

                {/* DESC */}
                <textarea
                    placeholder="Short Description"
                    value={data.desc}
                    onChange={(e) => setData("desc", e.target.value)}
                    className="p-3 rounded bg-gray-100"
                />
                {errors.desc && <p className="text-red-500">{errors.desc}</p>}

                {/* CONTENT */}
                <ReactQuill
                    theme="snow"
                    value={data.content}
                    onChange={(value) => setData("content", value)}
                />
                {errors.content && (
                    <p className="text-red-500">{errors.content}</p>
                )}

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="bg-blue-700 text-white px-6 py-2 rounded mt-4"
                    disabled={processing}
                >
                    {processing ? "Publishing..." : "Publish"}
                </button>
            </form>
        </div>
    );
};

AddNews.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AddNews;
