/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#003366",
            },
            fontFamily: {
                nunito: ["Nunito-Black", "sans-serif"],
                "nunito-bold": ["Nunito-Bold", "sans-serif"],
                "nunito-extrabold": ["Nunito-ExtraBold", "sans-serif"],
                "nunito-medium": ["Nunito-Medium", "sans-serif"],
                "nunito-regular": ["Nunito-Regular", "sans-serif"],
                "nunito-semibold": ["Nunito-SemiBold", "sans-serif"],
                "nunito-light": ["Nunito-Light", "sans-serif"],
            },
        },
    },
    plugins: [],
};
