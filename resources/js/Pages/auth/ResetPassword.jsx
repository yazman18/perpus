import { useForm } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";

const ResetPassword = ({ email }) => {
    const { data, setData, post, errors } = useForm({
        email: email,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/reset-password/${email}`); // POST new password to reset it
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Reset Password
                </h2>

                {errors.email && (
                    <div className="text-sm text-red-500">{errors.email}</div>
                )}
                {errors.password && (
                    <div className="text-sm text-red-500">
                        {errors.password}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-700 mb-1"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm text-gray-700 mb-1"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

ResetPassword.layout = (page) => <AuthLayout>{page}</AuthLayout>;

export default ResetPassword;
