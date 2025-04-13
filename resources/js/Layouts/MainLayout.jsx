import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
            <Navbar />
            <main className="min-h-screen py-8">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
