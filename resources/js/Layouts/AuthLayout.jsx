import React from "react";

const AuthLayout = ({ children }) => {
    return (
        <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
            <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
