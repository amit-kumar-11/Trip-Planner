import React from 'react';
import { Plane, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Header({ currentView, onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              TravelPlan
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['home', 'planner', 'trips'].map((view) => (
              <button
                key={view}
                onClick={() => onNavigate(view)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${currentView === view
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex gap-2">
            {['home', 'planner', 'trips'].map((view) => (
              <button
                key={view}
                onClick={() => onNavigate(view)}
                className={`
                  flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${currentView === view
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}