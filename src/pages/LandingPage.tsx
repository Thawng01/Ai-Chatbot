import { FaRobot, FaCommentDots, FaShieldAlt, FaRocket } from "react-icons/fa";
import { Link } from "react-router";

const LandingPage = () => {
    return (
        <div className="bg-hero-gradient text-white min-h-screen flex flex-col items-center">
            {/* Hero Section */}
            <header className="w-full text-center pt-24 px-6">
                <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">
                    Meet Your AI Chatbot
                </h1>
                <p className="text-lg mt-6 max-w-2xl mx-auto opacity-90">
                    Your intelligent assistant, ready to chat and help you with
                    anything.
                </p>
                <Link to="/chat">
                    <button className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all">
                        Start Chatting
                    </button>
                </Link>
            </header>

            {/* Features Section */}
            <section className="py-20 px-6 w-full">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose Our AI?
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={<FaRobot className="text-4xl text-blue-400" />}
                        title="Smart AI"
                        description="Understands human language like never before."
                    />
                    <FeatureCard
                        icon={
                            <FaCommentDots className="text-4xl text-green-400" />
                        }
                        title="Conversational"
                        description="Engages in natural, fluid conversations."
                    />
                    <FeatureCard
                        icon={
                            <FaShieldAlt className="text-4xl text-yellow-400" />
                        }
                        title="Secure & Private"
                        description="Your data stays private and encrypted."
                    />
                    <FeatureCard
                        icon={<FaRocket className="text-4xl text-red-400" />}
                        title="Fast & Reliable"
                        description="Super quick responses with high accuracy."
                    />
                </div>
            </section>

            {/* Call to Action with Gradient Background */}
            <section className="py-20 px-6 w-3/4 md:w-2/3 mx-auto text-center rounded-xl shadow-lg bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
                <h2 className="text-3xl font-bold">Ready to Start?</h2>
                <p className="mt-4 max-w-xl mx-auto opacity-90">
                    Experience AI-powered conversations that feel human. Sign up
                    now!
                </p>
                <Link to="/register">
                    <button className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all">
                        Get Started
                    </button>
                </Link>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 w-full mt-12">
                <p className="opacity-80">
                    © {new Date().getFullYear()} AI Chatbot. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
};

// Feature Card Component with Glassmorphism
const FeatureCard = ({ icon, title, description }: any) => {
    return (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg text-center hover:scale-105 transition transform">
            <div className="flex justify-center">{icon}</div>
            <h3 className="text-xl font-semibold mt-4">{title}</h3>
            <p className="mt-2 text-sm opacity-80">{description}</p>
        </div>
    );
};

export default LandingPage;
