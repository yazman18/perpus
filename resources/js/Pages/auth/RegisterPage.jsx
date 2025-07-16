import { useState } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";

const RegisterPage = () => {
    const { flash, aboutData } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        alamat: "",
        tanggal_lahir: "",
        email: "",
        password: "",
        id_number: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };

    const handleRoleSelection = (selectedRole) => {
        setData("role", selectedRole);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full">
            {/* KIRI */}
            <div className="w-full lg:w-1/2 flex justify-start items-center p-8 relative z-10">
                <div className="flex items-center gap-4">
                    <img
                        src={`/storage/${
                            aboutData?.logo_sekolah ?? "images/logo.png"
                        }`}
                        alt="Logo SMAN 1 Baleendah"
                        style={{ maxWidth: "100px", height: "100px" }}
                    />
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1E1B4B] text-left leading-tight">
                        {aboutData?.nama_sekolah ?? "Nama sekolah belum ada"}{" "}
                        <br /> E-Library
                    </h1>
                </div>
            </div>

            {/* KANAN */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 z-10">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Register Akun
                    </h1>

                    {flash.success && (
                        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300 text-sm">
                            {flash.success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="text-left">
                            <label className="block text-gray-700 text-sm mb-1">
                                Nama
                            </label>
                            <input
                                placeholder="Masukkan nama lengkap"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>

                        {/* <div  className="text-left">
                                <label className="block text-gray-700 text-sm mb-1">Alamat</label>
                                <input
                                    type="text"
                                    name="alamat"
                                    value={data.alamat}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 px-4 py-2 rounded"
                                />
                            </div> */}

                        <div className="text-left">
                            <label className="block text-gray-700 text-sm mb-1">
                                Tanggal Lahir
                            </label>
                            <input
                                type="date"
                                name="tanggal_lahir"
                                value={data.tanggal_lahir}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>

                        <div className="text-left">
                            <label className="block text-gray-700 text-sm mb-1">
                                Email
                            </label>
                            <input
                                placeholder="Masukkan email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>

                        <div className="text-left">
                            <label className="block text-gray-700 text-sm mb-1">
                                Password
                            </label>
                            <input
                                placeholder="Masukkan password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                className={`w-[48%] border ${
                                    data.role === "siswa"
                                        ? "bg-[#312E81] text-white"
                                        : "text-gray-700"
                                } py-2 rounded`}
                                onClick={() => handleRoleSelection("siswa")}
                            >
                                Siswa
                            </button>
                            <button
                                type="button"
                                className={`w-[48%] border ${
                                    data.role === "guru"
                                        ? "bg-[#312E81] text-white"
                                        : "text-gray-700"
                                } py-2 rounded`}
                                onClick={() => handleRoleSelection("guru")}
                            >
                                Guru
                            </button>
                        </div>

                        <div className="text-left">
                            <label className="block text-gray-700 text-sm mb-1">
                                {data.role === "guru" ? "NIP" : "NISN"}
                            </label>
                            <input
                                placeholder="Masukkan NIP/NISN"
                                type="text"
                                name="id_number"
                                value={data.id_number}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                                disabled={!data.role}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1E1B4B] text-white py-2 rounded hover:bg-[#312E81] transition"
                            disabled={processing || !data.role}
                        >
                            {processing ? "Loading..." : "Daftar"}
                        </button>

                        <div className="pt-4 text-sm">
                            <span className="text-gray-700">
                                Sudah punya akun?{" "}
                            </span>
                            <Link
                                href="/login"
                                className="text-blue-700 font-semibold hover:underline"
                            >
                                Login di sini
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

RegisterPage.layout = (page) => (
    <AuthLayout aboutData={page.props.aboutData}>{page}</AuthLayout>
);

export default RegisterPage;
