import { useEffect, useState } from "react";

const TypingIndicator = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500); // Adjust speed here

        return () => clearInterval(interval);
    }, []);

    return <span className="text-gray-500">Typing{dots}</span>;
};

export default TypingIndicator;
