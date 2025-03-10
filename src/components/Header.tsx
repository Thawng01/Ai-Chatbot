import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContextProvider";

const Header = () => {
    const auth = useAuth();

    const navigate = useNavigate();
    return (
        <header className="w-full bg-hero-gradient fixed left-0 top-0 z-20 text-white p-4 flex justify-between items-center">
            <nav className="flex items-center justify-between w-full px-10">
                <ul className="flex gap-6 font-medium items-center">
                    <li>
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/chat" className="hover:underline">
                            Chat
                        </Link>
                    </li>
                    {auth.user?.isAdmin && (
                        <li>
                            <Link to="/upload" className="hover:underline">
                                Upload
                            </Link>
                        </li>
                    )}
                    {auth.user?.isAdmin && (
                        <li>
                            <Link to="/delete" className="hover:underline">
                                Data
                            </Link>
                        </li>
                    )}
                </ul>
                {auth?.user ? (
                    <button
                        onClick={() => {
                            auth.setUser(null);
                            localStorage.removeItem("user");
                            navigate("/login");
                        }}
                        className="flex items-center gap-2 hover:underline"
                    >
                        <FiLogOut size={20} /> Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="flex gap-6 font-medium items-center"
                    >
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
