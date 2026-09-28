import React, { useEffect, useState } from 'react';
import { Form, Input, Tabs, Checkbox, Button, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { loginByEmail, loginByPassword } from '@/api/user';
import { md5 } from 'js-md5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toPersonal } from '@/utils/auth';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

interface LoginValues {
  account: string;
  password: string;
  rememberMe: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm<LoginValues>();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loginType, setLoginType] = useState<'email' | 'username'>('email');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: LoginValues) => {
    setGeneralError(null);
    const { account, password } = values;

    if (!account || !password) {
      setGeneralError('请填写完整的登录信息');
      return;
    }
    handleLogin(values);
  };
  const handleLogin = (values: LoginValues) => {
    // 登录逻辑
    setIsLoading(true);
    console.log('登录信息:', values);
    if (values.rememberMe) {
      localStorage.setItem(
        'rememberedAccount',
        JSON.stringify({ account: values.account, loginType, password: values.password })
      );
    }
    if (loginType === 'email') {
      loginByEmail({ email: values.account, password: md5(values.password) })
        .then(res => {
          console.log('Login successful, response:', res);
          dispatch({
            type: 'user/logIn',
            payload: {
              token: res.access_token,
              refreshToken: res.refresh_token,
              name: res.real_name,
            },
          });
          handleSuccess({ token: res.access_token, refreshToken: res.refresh_token });
        })
        .catch(err => {
          console.error('Login failed', err);
          setGeneralError(err?.message || '登录失败，请重试');
          message.error(err?.message || '登录失败');
        })
        .finally(() => {
          setIsLoading(false);
        });
      return;
    } else {
      loginByPassword({ username: values.account, password: md5(values.password) })
        .then(res => {
          console.log('Login successful, response:', res);
          dispatch({
            type: 'user/logIn',
            payload: {
              token: res.access_token,
              refreshToken: res.refresh_token,
              name: res.real_name,
            },
          });
          // 跳转到首页或受保护路由
          handleSuccess({ token: res.access_token, refreshToken: res.refresh_token });
        })
        .catch(err => {
          console.error('Login failed', err);
          setGeneralError(err?.message || '登录失败，请重试');
          message.error(err?.message || '登录失败');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const handleSuccess = (data: { token: string; refreshToken: string }) => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      window.location.href = `${redirect}?token=${data.token}&refreshToken=${data.refreshToken}`;
    } else {
      toPersonal({ token: data.token, refreshToken: data.refreshToken });
    }
  };
  useEffect(() => {
    const remembered = localStorage.getItem('rememberedAccount');
    if (remembered) {
      const parsed = JSON.parse(remembered);
      form.setFieldsValue({
        account: parsed.account,
        password: parsed.password,
        rememberMe: true,
      });
      setLoginType(parsed.loginType || 'email');
      setRememberMe(true);
    }
  }, []);
  return (
    <div className="min-h-screen flex">
      {/* 左侧内容区域 */}
      <div className="hidden lg:flex lg:flex-1 xl:flex-[3] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-8">
        <div className="w-full flex flex-col justify-center items-center min-h-full">
          {/* 主要内容 */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="max-w-2xl w-full">
              {/* 主要内容卡片 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="flex items-start space-x-6">
                  {/* 盾牌图标容器 */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* 文字内容 */}
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                      "深圳协议"统一身份认证
                    </h1>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      多角色统一登录平台，支持个人用户、管理机构、机构用户、专家组织等多种角色身份认证
                    </p>

                    {/* 特性标签 */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-white font-medium">安全可靠</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-white font-medium">权限分明</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-white font-medium">便捷高效</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 底部版权信息 */}
          <div className="mt-8 text-center w-full">
            <div className="text-white/80 text-sm space-y-2">
              <div>© 2025 深圳职业技术大学</div>
              <div>
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  粤ICP备15008843号-36
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录表单区 */}
      <div className="flex-1 xl:flex-[2] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">登录入口</h2>
              <p className="text-gray-600">欢迎回来，请输入您的登录信息</p>
            </div>

            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{ rememberMe: false }}
              className="space-y-6"
            >
              <Tabs
                activeKey={loginType}
                destroyOnHidden
                onChange={key => {
                  setLoginType(key as 'email' | 'username');
                  // 清除账号/密码提示
                  form.setFields([
                    { name: 'account', errors: [] },
                    { name: 'password', errors: [] },
                  ]);
                }}
                className="login-tabs"
                items={[
                  {
                    key: 'email',
                    label: '邮箱登录',
                    children: (
                      <div className="space-y-4 pt-4">
                        <Form.Item
                          name="account"
                          rules={[{ required: true, message: '请输入邮箱地址' }]}
                        >
                          <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            type="email"
                            placeholder="请输入邮箱地址"
                            className=" h-12"
                          />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          rules={[{ required: true, message: '请输入密码' }]}
                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="请输入密码"
                            className="h-12"
                          />
                        </Form.Item>

                        <div className="text-right">
                          <button
                            type="button"
                            className="text-blue-600 text-sm hover:text-blue-700"
                          >
                            忘记密码?
                          </button>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'username',
                    label: '账号登录',
                    children: (
                      <div className="space-y-4 pt-4">
                        <Form.Item
                          name="account"
                          rules={[{ required: true, message: '请输入账号' }]}
                        >
                          <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="请输入账号"
                            className=" h-12"
                          />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          rules={[{ required: true, message: '请输入密码' }]}
                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="请输入密码"
                            className="h-12"
                          />
                        </Form.Item>

                        <div className="text-right">
                          <button
                            type="button"
                            className="text-blue-600 text-sm hover:text-blue-700"
                          >
                            忘记密码?
                          </button>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />

              <Form.Item name="rememberMe" valuePropName="checked">
                <div className="flex items-center">
                  <Checkbox
                    checked={rememberMe}
                    onChange={e => {
                      setRememberMe(e.target.checked);
                      form.setFieldValue('rememberMe', e.target.checked);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">记住密码</label>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={isLoading}
                  className="w-full h-12 text-base font-medium"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            登录即表示您同意我们的
            <a href="#" className="text-blue-600 hover:text-blue-700">
              服务条款
            </a>
            和
            <a href="#" className="text-blue-600 hover:text-blue-700">
              隐私政策
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
