import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";

const LecturersPage = ({ lecturers }) => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lecturers</h1>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {lecturers.map((lecturer) => (
                        <tr key={lecturer.id}>
                            <td className="border px-4 py-2">{lecturer.id}</td>
                            <td className="border px-4 py-2">
                                {lecturer.name}
                            </td>
                            <td className="border px-4 py-2">
                                {lecturer.email}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

LecturersPage.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default LecturersPage;
