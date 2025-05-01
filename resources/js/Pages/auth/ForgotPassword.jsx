import { useForm } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";

const ForgotPassword = () => {
    const { data, setData, post, errors } = useForm({
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/forgot-password"); // POST the email to send reset link
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Forgot Password
                </h2>

                {errors.email && (
                    <div className="text-sm text-red-500">{errors.email}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-700 mb-1"
                        >
                            Enter your registered email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

ForgotPassword.layout = (page) => <AuthLayout>{page}</AuthLayout>;

export default ForgotPassword;
