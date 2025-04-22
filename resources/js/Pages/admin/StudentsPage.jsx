import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";

const StudentsPage = ({ students }) => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Students</h1>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td className="border px-4 py-2">{student.id}</td>
                            <td className="border px-4 py-2">{student.name}</td>
                            <td className="border px-4 py-2">
                                {student.email}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

StudentsPage.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default StudentsPage;
