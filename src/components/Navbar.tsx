// src/components/Navbar.tsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold">Property Management</h1>
      <div className="flex items-center gap-4">
        <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Navbar;
