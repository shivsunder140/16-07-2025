import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import MinimalLayout from '../layouts/MinimalLayout';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const getLayout = (layoutType: string = 'default') => {
    switch (layoutType) {
      case 'auth':
        return AuthLayout;
      case 'admin':
        return AdminLayout;
      case 'minimal':
        return MinimalLayout;
      default:
        return DefaultLayout;
    }
  };

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routes.map((route) => {
            const Layout = getLayout(route.layout);
            const Component = route.component;

            if (route.requiresAuth) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      userRole={user?.role}
                      requiredRoles={route.roles}
                    >
                      <Layout>
                        <Component />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              );
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            );
          })}

          {/* Redirect authenticated users from auth pages */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : routes.find(r => r.path === '/login')?.component
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : routes.find(r => r.path === '/signup')?.component
            }
          />

          {/* Default redirects */}
          <Route
            path="/app"
            element={<Navigate to="/dashboard" replace />}
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;