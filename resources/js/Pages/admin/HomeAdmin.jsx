import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import ReactPaginate from "react-paginate"; // Import react-paginate

// Register ChartJS modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HomeAdmin = ({
    stats = {},
    chartData = { labels: [], data: [] },
    students,
    lecturers,
    totalStudents,
    totalLecturers,
}) => {
    // State to control visibility of student and lecturer tables
    const [showStudents, setShowStudents] = useState(false);
    const [showLecturers, setShowLecturers] = useState(false);
    const [studentsPage, setStudentsPage] = useState(0); // Page state for students
    const [lecturersPage, setLecturersPage] = useState(0); // Page state for lecturers

    // Bar chart data
    const barData = {
        labels: chartData.labels,
        datasets: [
            {
                label: "Average Book Loan",
                data: chartData.data,
                backgroundColor: "maroon",
            },
        ],
    };

    // Toggle visibility of students table
    const toggleStudents = () => {
        setShowStudents((prev) => !prev);
        setShowLecturers(false); // Hide lecturers when students are shown
    };

    // Toggle visibility of lecturers table
    const toggleLecturers = () => {
        setShowLecturers((prev) => !prev);
        setShowStudents(false); // Hide students when lecturers are shown
    };

    // Handle page change for students
    const handleStudentPageChange = (selectedPage) => {
        setStudentsPage(selectedPage.selected);
    };

    // Handle page change for lecturers
    const handleLecturerPageChange = (selectedPage) => {
        setLecturersPage(selectedPage.selected);
    };

    return (
        <div className="p-6 space-y-8">
            {/* Statistik */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard label="Staff" value={stats.staff} />
                <StatCard
                    label="Students"
                    value={stats.students}
                    onClick={toggleStudents}
                />
                <StatCard
                    label="Lecturers"
                    value={stats.lecturers}
                    onClick={toggleLecturers}
                />
                <StatCard
                    label="Late Returns"
                    value={`${stats.latePercentage ?? 0}%`}
                />
            </div>

            {/* Grafik */}
            <div className="bg-white rounded shadow p-4 w-full max-w-8xl mx-auto">
                <h3 className="text-sm font-semibold mb-2">
                    Average Book Loan Graph
                </h3>
                <div className="h-64">
                    <Bar
                        data={barData}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>

            {/* Students Table */}
            {showStudents && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Students</h3>
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">NISN</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.data.map((student) => (
                                <tr key={student.id}>
                                    <td className="border px-4 py-2">
                                        {student.id_number}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {student.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {student.email}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Students Pagination */}
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={students.last_page} // Use last_page from paginated data
                        onPageChange={handleStudentPageChange}
                        containerClassName={"flex justify-center mt-4"}
                        pageClassName={"px-4 py-2 cursor-pointer"}
                        activeClassName={"bg-blue-600 text-white"}
                        previousClassName={"px-4 py-2 cursor-pointer"}
                        nextClassName={"px-4 py-2 cursor-pointer"}
                    />
                </div>
            )}

            {/* Lecturers Table */}
            {showLecturers && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Lecturers</h3>
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">NIP</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lecturers.data.map((lecturer) => (
                                <tr key={lecturer.id}>
                                    <td className="border px-4 py-2">
                                        {lecturer.id_number}
                                    </td>
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

                    {/* Lecturers Pagination */}
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={lecturers.last_page} // Use last_page from paginated data
                        onPageChange={handleLecturerPageChange}
                        containerClassName={"flex justify-center mt-4"}
                        pageClassName={"px-4 py-2 cursor-pointer"}
                        activeClassName={"bg-blue-600 text-white"}
                        previousClassName={"px-4 py-2 cursor-pointer"}
                        nextClassName={"px-4 py-2 cursor-pointer"}
                    />
                </div>
            )}
        </div>
    );
};

// 💡 Stat Card component for displaying the stats
const StatCard = ({ label, value, onClick }) => (
    <div
        className="bg-white shadow rounded-xl py-6 px-4 text-center space-y-2 cursor-pointer"
        onClick={onClick}
    >
        <p className="text-md text-gray-500 font-medium">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

HomeAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default HomeAdmin;
