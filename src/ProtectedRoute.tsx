import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./context/AuthContextProvider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-black">Loading...</div>; // Show a loading spinner or placeholder
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
