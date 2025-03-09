/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#4bab70", // Your preferred color
            },
            backgroundImage: {
                "hero-gradient": "linear-gradient(to right, #1e3a8a, #9333ea)",
            },
        },
    },
    plugins: [],
};
