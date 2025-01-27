import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/users', label: 'User Management', icon: '👥' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-gray-800 dark:bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-800 ${
              location.pathname === item.path ? 'bg-gray-700 dark:bg-gray-800' : ''
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 