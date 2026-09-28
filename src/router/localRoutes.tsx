import NotFound from '@/pages/NotFound';
import DefaultLayout from '@/layouts/DefaultLayout';
import FullPageLayout from '@/layouts/FullPageLayout';
import { Navigate } from 'react-router-dom';
import { AuthPage } from '@/layouts/login/AuthPage';
import { Dashboard } from '@/pages/Dashboard';
export const localRoutes = [
  {
    path: '/login',
    element: <FullPageLayout />,
    children: [{ index: true, element: <AuthPage /> }],
  },
  {
    path: '/',
    element: <DefaultLayout />,
    routeId: 'BasicLayout',
    key: 'BasicLayout',
    id: 'BasicLayout',
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ], // 动态菜单会插入这里
  },

  {
    path: '*',
    element: <NotFound />,
  },
];
