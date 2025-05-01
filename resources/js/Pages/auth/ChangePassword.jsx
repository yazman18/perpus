import { Link, useForm, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout"; // Assuming you have an AuthLayout component
import { ArrowLeft } from "lucide-react";

const ChangePassword = () => {
    const { errors, flash } = usePage().props;

    const { data, setData, post, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/change-password");
    };

    return (
        <AuthLayout>
            <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Change Password</h2>

                {flash.success && (
                    <div className="p-3 rounded bg-green-100 text-green-800 border border-green-300 text-sm">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="current_password"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.current_password && (
                            <p className="text-red-500 text-sm">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {processing ? "Updating..." : "Update Password"}
                    </button>
                    <div>
                        <Link
                            href="/profile"
                            as="button"
                            className="w-full inline-flex items-center justify-center gap-2 bg-gray-300 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Kembali
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ChangePassword;
