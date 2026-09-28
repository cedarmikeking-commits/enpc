import { useEffect, useState } from 'react';
import { Layout, Row, Col, message, Spin } from 'antd';
import WelcomeBanner from '@/components/WelcomeBanner';
import UserProfile from '@/components/UserProfile';
import SystemStatus from '@/components/SystemStatus';
import ApplicationCard from '@/components/ApplicationCard';
import EditProfileModal from '@/components/EditProfileModal';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import type { SystemStatus as SystemStatusType } from '@/global';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile, updateUserPassword } from '@/api/user';
import { Application } from '@/api/user/type';
import { getToken } from '@/utils/auth';

const { Content, Footer } = Layout;

export const Dashboard = () => {
  // const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const [systemStatus] = useState<SystemStatusType>({
    status: '正常运行',
    online_users: 248,
    version: 'v2.3.1',
  });
  const { data, isPending } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });
  const getAppAuthorization = (appName: string): boolean => {
    return true;
    // const unauthorizedApps = ['质量保障系统', '成果互认系统'];
    // return !unauthorizedApps.includes(appName);
  };

  useEffect(() => {
    if (data) {
      setApplications([...(data.applicationList || []), {
        id: 'szawarehouse',
        clientName: '职业仓',
        clientId: 'szawarehouse',
        clientVersion: 'v1.0',
        clientDesc: '职业仓',
        clientType: 'szawarehouse',
        status: 1,
        shelfType: 1,
        moduleCount: 1,
        createdTime: 'string',
        updatedTime: '',
        webServerRedirectUri: import.meta.env.VITE_PERSONAL_CENTER_URL + '/szawarehouse.html',
        apiEndpoint: '',
        devTeam: '',
        icon: '',
        color: '',
        platformType: 'work',
      }, {
        id: 'TQMS‌',
        clientName: '教学质量监控与评价系统',
        clientId: 'TQMS‌',
        clientVersion: 'v1.0',
        clientDesc: '教学质量监控与评价系统',
        clientType: 'TQMS‌',
        status: 1,
        shelfType: 1,
        moduleCount: 1,
        createdTime: 'string',
        updatedTime: '',
        webServerRedirectUri: import.meta.env.VITE_PERSONAL_CENTER_URL + '/TQMS.html',
        apiEndpoint: '',
        devTeam: '',
        icon: '',
        color: '',
        platformType: 'work',
      }, {
        id: 'TMS‌',
        clientName: '培训与活动管理系统',
        clientId: 'TMS‌',
        clientVersion: 'v1.0',
        clientDesc: '培训与活动管理系统',
        clientType: 'TMS‌',
        status: 1,
        shelfType: 1,
        moduleCount: 1,
        createdTime: 'string',
        updatedTime: '',
        webServerRedirectUri: import.meta.env.VITE_PERSONAL_CENTER_URL + '/TMS.html',
        apiEndpoint: '',
        devTeam: '',
        icon: '',
        color: '',
        platformType: 'work',
      }]);
    }
    // return () => {
    //   setApplications([]);
    // };
  }, [data]);

  // const loadUserProfile = async () => { };

  const handleEnterApp = (app: Application) => {
    if (app.webServerRedirectUri) {
      const url = `${app.webServerRedirectUri}?token=${getToken()}&id=${app.id}&clientId=${app.clientId}`;
      window.location.href = url;
    } else {
      message.info(`正在进入 ${app.clientName}...`);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     message.success('已退出登录');
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //     message.error('退出登录失败');
  //   }
  // };

  const handleEditProfile = () => {
    setEditProfileOpen(true);
  };

  // const handleSaveProfile = async (values: Partial<User>) => { };

  const handleChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleSavePassword = async (
    oldPassword: string,
    newPassword: string,
    newPassword1: string
  ) => {
    if (newPassword !== newPassword1) {
      message.error('两次输入的新密码不一致，请重新输入');
      return;
    }
    return updateUserPassword(oldPassword, newPassword, newPassword1);
  };

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Content className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <WelcomeBanner userName={data?.name || '-'} pendingTasks={3} notifications={2} />

          <Row gutter={[24, 24]}>
            <Col xs={24} xl={6}>
              <div className="space-y-6">
                {data && (
                  <UserProfile
                    user={data!}
                    onViewProfile={handleEditProfile}
                    onChangePassword={handleChangePassword}
                  />
                )}
                <SystemStatus status={systemStatus} />
              </div>
            </Col>

            <Col xs={24} xl={18}>
              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-blue-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">应用中心</h2>
                  <p className="text-gray-500 mt-1">选择您需要使用的系统应用</p>
                </div>

                <Row gutter={[20, 20]}>
                  {applications.map(app => (
                    <Col xs={24} sm={12} lg={12} xl={8} key={app.id}>
                      <ApplicationCard
                        application={app}
                        onEnter={handleEnterApp}
                        isAuthorized={getAppAuthorization(app.clientName)}
                      />
                    </Col>
                  ))}
                  <Col xs={24} sm={12} lg={12} xl={8}>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col items-center justify-center min-h-[280px] group">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-12 h-12 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors"></h3>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer className="text-center text-gray-500 bg-transparent">
        <p>© {new Date().getFullYear()} 中国高水平职业院校深圳协议联盟 版权所有</p>
      </Footer>

      <EditProfileModal
        open={editProfileOpen}
        user={data!}
        onCancel={() => setEditProfileOpen(false)}
      />

      <ChangePasswordModal
        open={changePasswordOpen}
        onCancel={() => setChangePasswordOpen(false)}
        onSave={handleSavePassword}
      />
    </>
  );
};
