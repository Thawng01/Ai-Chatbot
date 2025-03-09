import { Outlet } from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";

const Layout = () => {
    return (
        <main>
            <Header />

            <Outlet />
        </main>
    );
};

export default Layout;
