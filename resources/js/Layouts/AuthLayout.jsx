import React from "react";

const AuthLayout = ({ children, aboutData }) => {
    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 rounded-lg shadow-lg bg-[#F9F9F9] relative h-screen overflow-hidden flex justify-center">
            <div className="absolute w-[700px] h-[700px] bg-blue-100 rounded-full top-[-500px] right-[180px] opacity-50 z-0 hidden md:flex" />
            <div className="absolute w-[780px] h-[780px] bg-blue-100 rounded-full bottom-[-100px] left-[-120px] opacity-50 z-0 hidden md:flex" />
            <div className="absolute w-[700px] h-[700px] bg-blue-100 rounded-full bottom-[-430px] right-[-200px] opacity-50 z-0 hidden md:flex" />
            <div className="p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-1 justify-start text-center flex ">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
