'use client';
import * as React from 'react';

type Theme = 'light' | 'dark';
const ThemeContext = React.createContext<{ theme: Theme; toggle: () => void }>({ theme: 'light', toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('light');
  React.useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null;
    if (saved) setTheme(saved);
  }, []);
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggle = React.useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => React.useContext(ThemeContext);
