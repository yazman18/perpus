import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-gradient-to-r">
            <Navbar />
            <main className="flex-grow w-full">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
