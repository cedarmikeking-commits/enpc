import { Layout, message, Modal } from 'antd';
import { Outlet, redirect, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';
const { Header: LayoutHeader, Content } = Layout;
import NProgress from 'nprogress';
import AuthGuard from '@/router/gurd';
import eventEmitter from '@/utils/event-emitter';
import Header from '@/components/Header';
import { useDispatch } from 'react-redux';
// import { logOut } from '@/store/modules/user';
import { toLogin } from '@/utils/auth';
import { logout } from '@/api/user';
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
const DefaultLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigationType = useNavigationType();
  const handleLogout = async () => {
    try {
      await logout();
      handleLogin();
    } catch (error) {
      console.error('Error during logout:', error);
      message.error('退出登录失败');
    }
  };
  const handleLogin = async () => {
    Modal.destroyAll();
    console.log('触发未授权异常事件，跳转登录');
    console.log();
    try {
      // await logOut();
      dispatch({ type: 'user/logOut' });
      // window.location.href = LOGIN_URL;
      const redirect = encodeURIComponent(window.location.href);
      toLogin({ redirect });
    } catch (error) {
      console.error('Error during logout:', error);
      message.error('退出登录失败');
    }
  };
  useEffect(() => {
    NProgress.start();
    // 模拟加载延迟，确保进度条可见（生产可去掉）
    const timer = setTimeout(() => NProgress.done(), 200);
    Modal.destroyAll();
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location, navigationType]);
  useEffect(() => {
    eventEmitter.on('API:UN_AUTH', handleLogin);
    return () => {
      eventEmitter.off('API:UN_AUTH', handleLogin);
    };
  }, []);

  return (
    <AuthGuard>
      <Layout className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <Outlet />
      </Layout>
    </AuthGuard>
  );
};
export default DefaultLayout;
