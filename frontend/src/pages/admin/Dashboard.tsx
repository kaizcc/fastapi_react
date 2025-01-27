import { useAppSelector } from '../../hooks/useAppSelector';
import { selectUser } from '../../store/authSlice';

export default function AdminDashboard() {
  const user = useAppSelector(selectUser);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Users Overview</h3>
            <p className="text-gray-600 dark:text-gray-300">Manage and monitor user activities</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">System Status</h3>
            <p className="text-gray-600 dark:text-gray-300">Monitor system performance and health</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">View system analytics and metrics</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 text-left rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            <span className="block font-semibold">Manage Users</span>
            <span className="text-sm text-blue-600 dark:text-blue-400">View and manage user accounts</span>
          </button>
          <button className="p-4 text-left rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
            <span className="block font-semibold">System Settings</span>
            <span className="text-sm text-purple-600 dark:text-purple-400">Configure system preferences</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Admin Information
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
            <p className="mt-1 text-gray-900 dark:text-gray-200">{user?.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
            <p className="mt-1 text-gray-900 dark:text-gray-200">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
            <p className="mt-1 text-gray-900 dark:text-gray-200">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
} 