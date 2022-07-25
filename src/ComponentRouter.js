import * as React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ProtectedRoute from './pages/Login/ProtectedRoute';
// layouts
import DashboardLayout from './shared/Layout';
import LogoOnlyLayout from './shared/Layout/LogoOnlyLayout';

/**Lazy Loading of components */
const DashboardPage = React.lazy(() => import('./pages/Dashboard/DashboardPage'));

const LoginPage = React.lazy(() => import('./pages/Login/LoginPage'));

const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

const PassengerList = React.lazy(() => import('./pages/PassengerList/PassengerList'));

const AncillaryService = React.lazy(() => import('./pages/AncillaryService/AncillaryServicePage'));

const PassengerCheckInPage = React.lazy(() =>
  import('./pages/PassengerCheckIn/PassengerCheckInPage')
);

const PassengerInFlightPage = React.lazy(() =>
  import('./pages/PassengerInFlight/PassengerInFlight')
);

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/dashboard',
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/passenger-list',
          element: (
            <ProtectedRoute>
              <PassengerList />
            </ProtectedRoute>
          )
        },
        {
          path: '/ancillary-services',
          element: (
            <ProtectedRoute>
              <AncillaryService />
            </ProtectedRoute>
          )
        },
        {
          path: '/check-in',
          element: (
            <ProtectedRoute>
              <PassengerCheckInPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/in-flight',
          element: (
            <ProtectedRoute>
              <PassengerInFlightPage />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: 'login', element: <LoginPage /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
