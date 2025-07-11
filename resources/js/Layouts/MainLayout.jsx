import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children, aboutData }) => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-gradient-to-r">
            <Navbar aboutData={aboutData} /> {/* ← Kirim ke Footer */}
            <main className="flex-grow w-full">{children}</main>
            <Footer aboutData={aboutData} /> {/* ← Kirim ke Footer */}
        </div>
    );
};

export default MainLayout;
