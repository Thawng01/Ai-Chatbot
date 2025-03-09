import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { clientApi } from "../../api/clientApi";
import { useAuth } from "../../context/AuthContextProvider";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const auth = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await clientApi.post("/auth/login", formData);
            auth?.setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/chat", { replace: true });
        } catch (error: any) {
            setError(error?.response?.data.error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error) setTimeout(() => setError(""), 4000);
    }, [error]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-hero-gradient">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg text-white">
                <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
                <p className="text-center text-white mt-2">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-4 text-gray-300" />
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            className="w-full placeholder-slate-300  pl-12 pr-4 py-3 bg-white/10 rounded-lg outline-none focus:border-white focus:ring-1 focus:border"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-gray-300" />
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className="w-full placeholder-slate-300  pl-12 pr-4 py-3 bg-white/10 rounded-lg outline-none focus:border-white focus:ring-1 focus:border"
                        />
                        {showPassword ? (
                            <FaEyeSlash
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-gray-300 cursor-pointer"
                            />
                        ) : (
                            <FaEye
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-gray-300 cursor-pointer"
                            />
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-semibold shadow-md transition-all disabled:opacity-60"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-300 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
