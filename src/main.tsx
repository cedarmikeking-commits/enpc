import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import OverrideTheme from './theme/theme.ts';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getTokenOnUrl } from './utils/auth.ts';
getTokenOnUrl(); // 从 URL 获取 token 并存储
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 请求失败重试次数
      refetchOnWindowFocus: false, // 切回窗口时不自动刷新
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={OverrideTheme} locale={zhCN}>
      <AntdApp>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <App />
              {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} position="right" />}
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);
