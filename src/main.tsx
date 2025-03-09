import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthContextProvider from "./context/AuthContextProvider.tsx";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContextProvider>
            <RouterProvider router={App} />
        </AuthContextProvider>
    </StrictMode>
);
