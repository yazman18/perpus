import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HomeAdmin = () => {
    const { stats = {}, chartData = { labels: [], data: [] } } =
        usePage().props;

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

    return (
        <div className="p-6 space-y-8">
            {/* Statistik */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard label="Staff" value={stats.staff} />
                <StatCard label="Students" value={stats.students} />
                <StatCard label="Lecturers" value={stats.lecturers} />
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
                    {" "}
                    {/* kecilkan tinggi grafik */}
                    <Bar
                        data={barData}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>
        </div>
    );
};

// 💡 Perbesar stat card
const StatCard = ({ label, value }) => (
    <div className="bg-white shadow rounded-xl py-6 px-4 text-center space-y-2">
        <p className="text-md text-gray-500 font-medium">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

HomeAdmin.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default HomeAdmin;
