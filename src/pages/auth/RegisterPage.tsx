import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContextProvider";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { clientApi } from "../../api/clientApi";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isAdmin: true,
    });
    const auth = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await clientApi.post("/auth/register", formData);
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
                <h2 className="text-3xl font-bold text-center">Join Us</h2>
                <p className="text-center text-gray-200">Create an account</p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    {/* Name */}
                    <div className="relative">
                        <FaUser className="absolute left-4 top-4 text-gray-300" />
                        <input
                            value={formData.name}
                            name="name"
                            onChange={handleChange}
                            type="text"
                            placeholder="Full Name"
                            className="w-full placeholder-slate-300  pl-12 pr-4 py-3 bg-white/10 rounded-lg outline-none focus:border-white focus:ring-1 focus:border"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-4 text-gray-300" />
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="Email"
                            className="w-full placeholder-slate-300  pl-12 pr-4 py-3 bg-white/10 rounded-lg outline-none focus:border-white focus:ring-1 focus:border"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-gray-300" />
                        <input
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-semibold transition-all disabled:opacity-60"
                    >
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-gray-300 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
