import FileUpload from "./pages/FileUpload";
import { createBrowserRouter } from "react-router";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/auth/LoginPage";
import LandingPage from "./pages/LandingPage";
import Layout from "./Layout";
import Register from "./pages/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import DataDelete from "./pages/DataDelete";

const App = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },

            {
                path: "/chat",
                element: (
                    <ProtectedRoute>
                        <Chatbot />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/upload",
                element: (
                    <ProtectedRoute>
                        <FileUpload />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/delete",
                element: (
                    <ProtectedRoute>
                        <DataDelete />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default App;
