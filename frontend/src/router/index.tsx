import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectIsAuthenticated, selectUser, selectIsAdmin } from '../store/authSlice';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../pages/admin/Dashboard';
import UserDashboard from '../pages/user/Dashboard';
import AdminLayout from '../components/layout/AdminLayout';
import UserManagement from '../pages/admin/UserManagement';

const RootLayout = () => {
  return <Outlet />;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  
  console.log('Protected Route - Auth Status:', isAuthenticated);
  console.log('Protected Route - User:', user);

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = useAppSelector(selectIsAdmin);
  const user = useAppSelector(selectUser);
  
  console.log('Admin Route - User:', user);
  console.log('Admin Route - Is Admin:', isAdmin);

  if (!isAdmin) {
    console.log('Not admin, redirecting to user dashboard');
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  
  console.log('Public Route - Auth Status:', isAuthenticated);
  console.log('Public Route - Is Admin:', isAdmin);

  if (isAuthenticated) {
    if (isAdmin) {
      console.log('Authenticated admin, redirecting to admin dashboard');
      return <Navigate to="/admin" />;
    }
    console.log('Authenticated user, redirecting to user dashboard');
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <AdminDashboard />,
          },
          {
            path: 'users',
            element: <UserManagement />,
          },
        ],
      },
      {
        path: '',
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

export { router };
export default router; 