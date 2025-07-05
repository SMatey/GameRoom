import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./Icons";

export const ThemeButton = () => {
    const [theme, setTheme] = useState('light');

    // Cambiar tema
    useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        setTheme(savedTheme);
    }else if (systemPrefersDark) {
        setTheme('dark');
    }
    }, []);


    useEffect(() => {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    };


    return (
        <div>
            <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="rounded-xl p-2 bg-surface-light dark:bg-surface border border-bprimary-light  hover:bg-bprimary-light/10 dark:hover:bg-bprimary/10 transition-colors"
            >
            {
                theme === 'dark' 
                ? <SunIcon className="w-6 h-6 text-bprimary stroke-current" />
                : <MoonIcon className="text-bprimary-light stroke-current w-6 h-6" /> 
            }
            </button>
        </div>
    )
}

