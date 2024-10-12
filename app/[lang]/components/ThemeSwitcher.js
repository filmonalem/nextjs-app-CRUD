'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi"; // Icons

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <div className="flex items-center space-x-4">
      {theme === "light" && (
        <button
          onClick={() => setTheme("dark")}
          aria-label="Switch to dark mode"
          className="px-2 text-gray-800 dark:text-gray-200 rounded focus:outline-none"
        >
          <FiMoon size={24} />
        </button>
      )}
      {theme === "dark" && (
        <button
          onClick={() => setTheme("light")}
          aria-label="Switch to light mode"
          className="px-2 text-yellow-500 dark:text-yellow-300 rounded focus:outline-none"
        >
          <FiSun size={24} />
        </button>
      )}
      {theme === "system" && (
        <button
          onClick={() => setTheme("light")}
          aria-label="Switch to light mode"
          className="px-2 text-gray-600 dark:text-gray-400 rounded focus:outline-none"
        >
          <FiMonitor size={24} />
        </button>
      )}
      {theme !== "system" && (
        <button
          onClick={() => setTheme("system")}
          aria-label="Switch to system default mode"
          className="px-2 text-gray-600 dark:text-gray-400 rounded focus:outline-none"
        >
          <FiMonitor size={24} />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitcher;