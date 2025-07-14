import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import ReactPaginate from "react-paginate";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const HomeAdmin = ({
    stats = {},
    chartData = { labels: [], data: [] },
    students,
    lecturers,
    totalStudents,
    totalLecturers,
}) => {
    const [showStudents, setShowStudents] = useState(false);
    const [showLecturers, setShowLecturers] = useState(false);
    const [studentsPage, setStudentsPage] = useState(0);
    const [lecturersPage, setLecturersPage] = useState(0);

    const barData = {
        labels: chartData.labels,
        datasets: [
            {
                label: "Average Book Loan",
                data: chartData.data,
                borderColor: "#7f1d1d",
                backgroundColor: "rgba(127, 29, 29, 0.2)", // transparan untuk area bawah garis
                fill: true, // jika ingin ada area terisi di bawah garis
            },
        ],
    };

    const toggleStudents = () => {
        setShowStudents((prev) => !prev);
        setShowLecturers(false);
    };

    const toggleLecturers = () => {
        setShowLecturers((prev) => !prev);
        setShowStudents(false);
    };

    const handleStudentPageChange = (selectedPage) => {
        setStudentsPage(selectedPage.selected);
    };

    const handleLecturerPageChange = (selectedPage) => {
        setLecturersPage(selectedPage.selected);
    };

    return (
        <div className="p-6 space-y-10">
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
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Average Book Loan Graph
                </h3>
                <div className="h-72">
                    <Line
                        data={barData}
                        options={{
                            maintainAspectRatio: false,
                            tension: 0.4, // optional, buat garis melengkung
                            pointRadius: 4,
                            borderWidth: 2,
                            responsive: true,
                        }}
                    />
                </div>
            </div>

            {/* Students Table */}
            {showStudents && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Students
                    </h3>
                    <div className="overflow-x-auto rounded-lg border shadow">
                        <table className="min-w-full text-sm ">
                            <thead className=" text-left text-gray-700">
                                <tr className="border-b bg-[#1B3C53] text-white">
                                    <th className="px-4 py-2 ">NISN</th>
                                    <th className="px-4 py-2 ">Name</th>
                                    <th className="px-4 py-2 ">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.data.map((student, i) => (
                                    <tr
                                        key={student.id}
                                        className={i % 2 ? "bg-gray-50 " : ""}
                                    >
                                        <td className="px-4 py-2 ">
                                            {student.id_number}
                                        </td>
                                        <td className="px-4 py-2 ">
                                            {student.name}
                                        </td>
                                        <td className="px-4 py-2 ">
                                            {student.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        pageCount={students.last_page}
                        onPageChange={handleStudentPageChange}
                    />
                </div>
            )}

            {/* Lecturers Table */}
            {showLecturers && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Lecturers
                    </h3>
                    <div className="overflow-x-auto border rounded-lg shadow">
                        <table className="min-w-full text-sm ">
                            <thead className=" text-left text-gray-700">
                                <tr className="border-b bg-[#1B3C53] text-white">
                                    <th className="px-4 py-2 ">NIP</th>
                                    <th className="px-4 py-2 ">Name</th>
                                    <th className="px-4 py-2 ">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lecturers.data.map((lecturer, i) => (
                                    <tr
                                        key={lecturer.id}
                                        className={i % 2 ? "bg-gray-50 border" : ""}
                                    >
                                        <td className="px-4 py-2   ">
                                            {lecturer.id_number}
                                        </td>
                                        <td className="px-4 py-2 ">
                                            {lecturer.name}
                                        </td>
                                        <td className="px-4 py-2 ">
                                            {lecturer.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        pageCount={lecturers.last_page}
                        onPageChange={handleLecturerPageChange}
                    />
                </div>
            )}
        </div>
    );
};

// Komponen kartu statistik
const StatCard = ({ label, value, onClick }) => (
    <div
        className="bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out rounded-xl py-6 px-4 text-center cursor-pointer"
        onClick={onClick}
    >
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
);

// Komponen pagination
const Pagination = ({ pageCount, onPageChange }) => (
    <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName="flex justify-center mt-4 space-x-2"
        pageClassName="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-[#4E799D] cursor-pointer"
        activeClassName="bg-[#1B3C53] text-white"
        previousClassName="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 cursor-pointer"
        nextClassName="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 cursor-pointer"
    />
);

HomeAdmin.layout = (page) => (
    <AdminLayout aboutData={page.props.aboutData}>
        {page}
    </AdminLayout>
);

export default HomeAdmin;
