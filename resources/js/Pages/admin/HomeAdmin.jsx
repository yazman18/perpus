import React, { useState, useEffect } from "react";
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
    students,
    lecturers,
}) => {
    const [activeTab, setActiveTab] = useState(null); // "students", "lecturers", or null
    const [timeframe, setTimeframe] = useState('monthly');
    const [chartData, setChartData] = useState({ labels: [], data: [] });

    useEffect(() => {
        fetchChartData(timeframe);
    }, [timeframe]);

    const fetchChartData = async (period) => {
        try {
            const response = await fetch(`/admin/chart-data/${period}`);
            const data = await response.json();
            setChartData(data);
        } catch (error) {
            console.error('Failed to fetch chart data', error);
        }
    };

    const barData = {
        labels: chartData.labels,
        datasets: [
            {
                label: "Average Book Loan",
                data: chartData.data,
                borderColor: "#7f1d1d",
                backgroundColor: "rgba(127, 29, 29, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div className="p-6 space-y-10">
            {/* STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard label="Staff" value={stats.staff} />
                <StatCard label="Students" value={stats.students} onClick={() => setActiveTab("students")} />
                <StatCard label="Lecturers" value={stats.lecturers} onClick={() => setActiveTab("lecturers")} />
                <StatCard label="Late Returns" value={`${stats.latePercentage ?? 0}%`} />
            </div>

            {/* FILTER & TIMEFRAME BUTTONS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                {/* Left: Toggle Students & Lecturers */}
                <div className="flex gap-2">
                    {['students', 'lecturers'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveTab(prev => prev === type ? null : type)}
                            className={`px-4 py-2 rounded font-medium transition ${
                                activeTab === type
                                    ? 'bg-[#1B3C53] text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            {type === 'students' ? 'Students' : 'Lecturers'}
                        </button>
                    ))}
                </div>

                {/* Right: Timeframe Buttons */}
                <div className="flex gap-2">
                    {['weekly', 'monthly', 'yearly'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setTimeframe(period)}
                            className={`px-3 py-2 rounded font-medium transition ${
                                timeframe === period ? 'bg-[#1B3C53] text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* CHART */}
            {!activeTab && (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                        Average Book Loan Graph
                    </h3>
                    <div className="h-72">
                        <Line
                            data={barData}
                            options={{
                                maintainAspectRatio: false,
                                tension: 0.4,
                                pointRadius: 4,
                                borderWidth: 2,
                                responsive: true,
                            }}
                        />
                    </div>
                </div>
            )}

            {/* STUDENT TABLE */}
            {activeTab === "students" && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Students</h3>
                    <StudentLecturerTable data={students} />
                </div>
            )}

            {/* LECTURER TABLE */}
            {activeTab === "lecturers" && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Lecturers</h3>
                    <StudentLecturerTable data={lecturers} isLecturer />
                </div>
            )}
        </div>
    );
};

// TABLE COMPONENT
const StudentLecturerTable = ({ data, isLecturer = false }) => (
    <div className="overflow-x-auto rounded-lg border shadow">
        <table className="min-w-full text-sm">
            <thead className="text-left text-gray-700">
                <tr className="border-b bg-[#1B3C53] text-white">
                    <th className="px-4 py-2">{isLecturer ? 'NIP' : 'NISN'}</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                </tr>
            </thead>
            <tbody>
                {data.data.map((person, i) => (
                    <tr key={person.id} className={i % 2 ? "bg-gray-50" : ""}>
                        <td className="px-4 py-2">{person.id_number}</td>
                        <td className="px-4 py-2">{person.name}</td>
                        <td className="px-4 py-2">{person.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// STAT CARD COMPONENT
const StatCard = ({ label, value, onClick }) => (
    <div
        className="bg-white shadow-md shadow-[#1B3C53] transition duration-300 ease-in-out rounded-xl py-6 px-4 text-center cursor-pointer hover:scale-[1.02]"
        onClick={onClick}
    >
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
);

// WRAP LAYOUT
HomeAdmin.layout = (page) => (
    <AdminLayout aboutData={page.props.aboutData}>
        {page}
    </AdminLayout>
);

export default HomeAdmin;
