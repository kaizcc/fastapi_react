import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectUser } from '../../store/authSlice';

interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
  role: number;
  avatar?: string;
}

interface EditUser {
  id: number;
  email: string;
  nickname: string;
  role: number;
  password?: string;
  avatar?: string;
}

const UserManagement: React.FC = () => {
  const currentUser = useAppSelector(selectUser);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<EditUser | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/users');
      setUsers(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.detail || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
      avatar: user.avatar,
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSave = async () => {
    if (!editingUser) return;

    try {
      await axiosInstance.put(`/users/${editingUser.id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
      setError('');
    } catch (err: any) {
      console.error('Error updating user:', err);
      setError(err.response?.data?.detail || 'Failed to update user');
    }
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axiosInstance.delete(`/users/${userId}`);
        fetchUsers();
        setError('');
      } catch (err: any) {
        console.error('Error deleting user:', err);
        setError(err.response?.data?.detail || 'Failed to delete user');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-900 dark:text-white">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">User Management</h1>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nickname</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser?.id === user.id ? (
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="border rounded px-2 py-1 bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white">{user.email}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.nickname}
                      onChange={(e) => setEditingUser({ ...editingUser, nickname: e.target.value })}
                      className="border rounded px-2 py-1 bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white">{user.nickname}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser?.id === user.id ? (
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: Number(e.target.value) })}
                      className="border rounded px-2 py-1 bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500"
                    >
                      <option value={0}>User</option>
                      <option value={1}>Admin</option>
                    </select>
                  ) : (
                    <span className="text-gray-900 dark:text-white">
                      {user.role === 1 ? 'Admin' : 'User'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser?.id === user.id ? (
                    <div className="space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      {currentUser?.id !== user.id && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 