import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import GeneralError from './pages/errors/GeneralError';
import MaintenanceError from './pages/errors/MaintenanceError';
import NotFoundError from './pages/errors/NotFoundError';
import UnauthorisedError from './pages/errors/UnauthorisedError';
import { decodeJWT, getTokenCookie } from './utils/helpers';

const MentorLayout = lazy(() => import('./layouts/DashboardLayout'));

const router = createBrowserRouter([
  {
    path: '/',
    Component: lazy(() => import('./pages/Landing')),
    loader: () => {
      const token = getTokenCookie();
      const decode = decodeJWT(token);
      if (decode && decode?.role === 'mentor') {
        return redirect('/mentor/dashboard');
      }
      return null;
    },
    errorElement: <GeneralError />,
  },
  {
    path: '/profile',
    Component: lazy(() => import('./pages/Profile')),
    errorElement: <GeneralError />,
  },
  {
    path: '/review',
    Component: lazy(() => import('./pages/ReviewMentor')),
    errorElement: <GeneralError />,
  },
  {
    path: '/search',
    Component: lazy(() => import('./pages/Search')),
    errorElement: <GeneralError />,
  },
  {
    path: '/about',
    Component: lazy(() => import('./pages/About')),
    errorElement: <GeneralError />,
  },
  {
    path: '/pricing',
    Component: lazy(() => import('./pages/Premium')),
    loader: () => {
      const token = getTokenCookie();
      if (!token) {
        return redirect('/login');
      }
      const decode = decodeJWT(token);
      if (decode && decode.exp < Date.now() / 1000) {
        return redirect('/login');
      }
      return null;
    },
    errorElement: <GeneralError />,
  },
  {
    Component: lazy(() => import('./layouts/AuthLayout')),
    errorElement: <GeneralError />,
    children: [
      {
        path: '/login',
        loader: () => {
          const token = getTokenCookie();
          if (token) {
            const decode = decodeJWT(token);
            if (decode && decode.exp > Date.now() / 1000) {
              return redirect('/dashboard');
            }
          }
          return null;
        },
        Component: lazy(() => import('./pages/auth/Login')),
      },
      {
        path: '/register',
        Component: lazy(() => import('./pages/auth/Register')),
      },
      {
        path: '/become-mentor',
        Component: lazy(() => import('./pages/auth/mentor/BecomeMentor')),
      },
      {
        path: '/become-mentor/success',
        Component: lazy(() => import('./pages/auth/mentor/Success')),
      },
      {
        path: '/become-mentor/failure',
        Component: lazy(() => import('./pages/auth/mentor/Failure')),
      },
    ],
  },
  {
    path: '/dashboard',
    errorElement: <GeneralError />,
    Component: lazy(() => import('./layouts/DashboardLayout')),
    loader: () => {
      const token = getTokenCookie();
      if (!token) {
        return redirect('/login');
      }
      const decode = decodeJWT(token);
      if (decode && decode.exp < Date.now() / 1000) {
        return redirect('/login');
      }
      if (decode && decode.role !== 'user') {
        return redirect('/mentor/dashboard');
      }
      return null;
    },
    children: [
      {
        path: '',
        Component: lazy(() => import('./pages/dashboard/Search')),
      },
      {
        path: 'transactions',
        Component: lazy(() =>
          import('./pages/dashboard/transactions/Transactions'),
        ),
      },
      {
        path: 'settings',
        Component: lazy(() => import('./pages/dashboard/Settings')),
      },
      {
        path: 'chats',
        Component: lazy(() => import('./pages/dashboard/chat/Chat')),
      },
      {
        path: 'assistant',
        Component: lazy(() => import('./pages/Assistant')),
      },
    ],
  },
  {
    path: '/mentor/dashboard',
    errorElement: <GeneralError />,
    element: <MentorLayout forMentor />,
    loader: () => {
      const token = getTokenCookie();
      if (!token) {
        return redirect('/login');
      }
      const decode = decodeJWT(token);
      if (decode && decode.exp < Date.now() / 1000) {
        return redirect('/login');
      }
      if (decode && decode.role !== 'mentor') {
        return redirect('/dashboard');
      }
      return null;
    },
    children: [
      {
        path: '',
        Component: lazy(() => import('./pages/mentor-dashboard/Dashboard')),
      },
      {
        path: 'orders',
        Component: lazy(() => import('./pages/mentor-dashboard/orders/Orders')),
      },
      {
        path: 'settings',
        Component: lazy(() => import('./pages/mentor-dashboard/Settings')),
      },
      {
        path: 'chats',
        Component: lazy(() => import('./pages/mentor-dashboard/chat/Chat')),
      },
      {
        path: 'assistant',
        Component: lazy(() => import('./pages/Assistant')),
      },
    ],
  },

  // Error routes
  { path: '/500', element: <GeneralError /> },
  { path: '/404', element: <NotFoundError /> },
  { path: '/503', element: <MaintenanceError /> },
  { path: '/401', element: <UnauthorisedError /> },

  // Fallback 404 route
  { path: '*', element: <NotFoundError /> },
]);

export default router;
