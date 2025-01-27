import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../../store/authSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/pictures/k.jpg';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {user?.role === 1 ? 'Admin Dashboard' : 'User Dashboard'}
            </h1>
          </div>
          <div className="flex items-center">
            {/* Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>

            <span className="px-4 text-gray-700 dark:text-gray-300">
              Welcome, {user?.nickname} ({user?.role === 1 ? 'Admin' : 'User'})
            </span>

            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 