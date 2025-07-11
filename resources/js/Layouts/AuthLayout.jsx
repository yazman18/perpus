import React from "react";

const AuthLayout = ({ children, aboutData }) => {
    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 rounded-lg shadow-lg">
            <div className="p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
