import { useState } from "react";
import { router } from "@inertiajs/react";
import Image from "../../components/Image";
import AuthLayout from "../../Layouts/AuthLayout";

const RegisterPage = () => {
    const [form, setForm] = useState({
        name: "",
        alamat: "",
        tanggal_lahir: "",
        email: "",
        password: "",
        id_number: "",
        role: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        router.post("/register", form, {
            onError: (err) => setErrors(err),
            onSuccess: () => router.visit("/login"),
        });
    };

    return (
        <div className="flex h-screen bg-[#F9F9F9] relative overflow-hidden">
            <div className="absolute w-[700px] h-[700px] bg-blue-100 rounded-full top-[-450px] right-[180px] opacity-50 z-0" />
            <div className="absolute w-[780px] h-[780px] bg-blue-100 rounded-full bottom-[-100px] left-[-320px] opacity-50 z-0" />
            <div className="absolute w-[700px] h-[700px] bg-blue-100 rounded-full bottom-[-430px] right-[-200px] opacity-50 z-0" />

            <div className="w-1/2 flex justify-center items-center relative z-10">
                <div className="flex items-center gap-4">
                    <Image
                        src="logo.png"
                        alt="SMAN 2 BANDUNG"
                        w={120}
                        h={120}
                    />
                    <h1 className="text-3xl font-bold text-[#1E1B4B] text-left">
                        SMAN 2 Bandung <br /> E-Library
                    </h1>
                </div>
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center px-16 z-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Register Akun
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm space-y-4"
                >
                    <div>
                        <label className="block text-gray-700 text-sm mb-1">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">
                            Alamat
                        </label>
                        <input
                            type="text"
                            name="alamat"
                            value={form.alamat}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">
                            Tanggal Lahir
                        </label>
                        <input
                            type="date"
                            name="tanggal_lahir"
                            value={form.tanggal_lahir}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">
                            Role
                        </label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        >
                            <option value="">-- Pilih Role --</option>
                            <option value="siswa">Siswa</option>
                            <option value="guru">Guru</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm mb-1">
                            {form.role === "guru" ? "NIP" : "NISN"}
                        </label>
                        <input
                            type="text"
                            name="id_number"
                            value={form.id_number}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1E1B4B] text-white py-2 rounded hover:bg-[#312E81]"
                    >
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    );
};

RegisterPage.layout = (page) => <AuthLayout>{page}</AuthLayout>;

export default RegisterPage;
