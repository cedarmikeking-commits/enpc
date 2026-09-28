import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { localRoutes } from './localRoutes';
import { Spin } from 'antd';
const router = createBrowserRouter(localRoutes);

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default AppRouter;
