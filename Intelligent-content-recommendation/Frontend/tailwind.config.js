/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./context/**/*.{js,ts,jsx,tsx}",
      "./hooks/**/*.{js,ts,jsx,tsx}",
      "./utils/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#2563EB", // Custom Primary Color (Blue)
          secondary: "#1E293B", // Custom Secondary Color (Dark Gray)
          accent: "#FACC15", // Accent Color (Yellow)
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          heading: ["Poppins", "sans-serif"],
        },
        spacing: {
          18: "4.5rem",
        },
        animation: {
          fadeIn: "fadeIn 0.5s ease-in-out",
          slideUp: "slideUp 0.6s ease-in-out",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0, transform: "translateY(10px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          slideUp: {
            "0%": { opacity: 0, transform: "translateY(30px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        },
      },
    },
    plugins: [],
  };
  
  export default config;
  