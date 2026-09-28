import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, toLogin } from '@/utils/auth';
import { Spin } from 'antd';

// 路由白名单
const whiteList = ['/login'];

export default function AuthGuard({ children }: { children: JSX.Element }): JSX.Element {
  const location = useLocation();
  const token = getToken();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // 模拟异步验证，可在此请求用户信息
    const timer = setTimeout(() => setLoading(false), 200);

    return () => clearTimeout(timer);
  }, [location]);

  // 白名单直接放行
  console.log('当前路径：', location.pathname);
  if (whiteList.includes(location.pathname)) return children;

  // 登录校验已关闭，直接进入应用
  // if (!token) {
  //   toLogin({ redirect: encodeURIComponent(window.location.href) });
  //   return null;
  // }

  // 加载中
  if (loading) {
    return (
      <div
        style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // 通过验证后渲染页面
  return children;
}
