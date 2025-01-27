import { useAppSelector } from '../../hooks/useAppSelector';
import { selectUser } from '../../store/authSlice';
import Header from '../../components/layout/Header';

export default function UserDashboard() {
  const user = useAppSelector(selectUser);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Welcome, {user?.nickname}!
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
                <p className="mt-1 text-gray-900 dark:text-gray-200">{user?.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p className="mt-1 text-gray-900 dark:text-gray-200">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nickname</p>
                <p className="mt-1 text-gray-900 dark:text-gray-200">{user?.nickname}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
                <p className="mt-1 text-gray-900 dark:text-gray-200">
                  {user?.role === 1 ? 'Admin' : 'User'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 