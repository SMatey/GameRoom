import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./Icons";

export const ThemeButton = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    };

    // Cambiar tema
    useEffect(() => {
        const storagedTheme = localStorage.getItem("theme") || "light";
        setTheme(storagedTheme);
        document.documentElement.classList.toggle('dark', storagedTheme === 'dark');
    }, []);


    return (
        <div>
            <button
            onClick={toggleTheme}
            className="rounded-xl p-2 bg-surface-light dark:bg-surface border border-bprimary-light  hover:bg-bprimary-light/10 dark:hover:bg-bprimary/10 transition-colors cursor-pointer"
            >
            {
                theme === 'light' ? <MoonIcon /> : <SunIcon />
            }
            </button>
        </div>
    )
}

