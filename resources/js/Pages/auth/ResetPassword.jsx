import { useForm, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";
import Image from "../../components/Image";

const ResetPassword = () => {
    const { token, email } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/reset-password");
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#F9F9F9] relative overflow-hidden">
            {/* Dekorasi */}
            <div className="absolute w-[700px] h-[700px] bg-blue-100 rounded-full top-[-450px] right-[180px] opacity-50 z-0" />
            <div className="absolute w-[780px] h-[780px] bg-blue-100 rounded-full bottom-[-100px] left-[-320px] opacity-50 z-0" />
            <div className="absolute w-[700px] h-[700px] bg-blue-100 rounded-full bottom-[-430px] right-[-200px] opacity-50 z-0" />

            {/* KIRI */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8 relative z-10">
                <div className="flex items-center gap-4">
                    <Image
                        src="logo.png"
                        alt="SMAN 2 BANDUNG"
                        w={100}
                        h={100}
                    />
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1E1B4B] leading-tight">
                        SMAN 2 Bandung <br /> E-Library
                    </h1>
                </div>
            </div>

            {/* KANAN */}
            <div className="w-full lg:w-1/2 flex justify-center items-center px-6 sm:px-12 lg:px-16 py-12 z-10">
                <div className="w-full max-w-sm space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Reset Password
                    </h2>

                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                    {errors.password && (
                        <p className="text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">
                                Password Baru
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#1E1B4B] text-white py-2 rounded hover:bg-[#312E81] transition"
                        >
                            {processing
                                ? "Mengubah..."
                                : "Simpan Password Baru"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

ResetPassword.layout = (page) => <AuthLayout>{page}</AuthLayout>;

export default ResetPassword;
