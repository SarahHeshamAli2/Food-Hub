import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Darkmode() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-xl p-2 transition duration-300"
    >
      {darkMode ? (
        <Sun className="text-yellow-400 transition duration-300" />
      ) : (
        <Moon className="text-gray-800 transition duration-300" />
      )}
    </button>
  );
}
