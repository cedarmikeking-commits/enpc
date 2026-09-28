import { Card, Avatar, Button, Space } from 'antd';
import { Mail, Building2, Shield, Lock, User } from 'lucide-react';
import { UserRecord } from '@/api/user/type';

interface UserProfileProps {
  user: UserRecord;
  onViewProfile?: () => void;
  onChangePassword?: () => void;
}

export default function UserProfile({ user, onViewProfile, onChangePassword }: UserProfileProps) {
  return (
    <Card className="shadow-md">
      <div className="text-center mb-6">
        <Avatar
          size={96}
          src={
            user?.avatar ||
            'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=200'
          }
          className="mb-4"
        />
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h3>
      </div>

      <Space direction="vertical" size={16} className="w-full">
        <div className="flex items-start gap-3">
          <Mail size={20} className="text-blue-400 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-400 mb-1">邮箱地址</div>
            <div className="text-sm text-gray-700 break-all">{user.email}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Building2 size={20} className="text-green-400 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-400 mb-1">所属组织</div>
            <div className="text-sm text-gray-700">{user.deptName || '技术部'}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield size={20} className="text-purple-400 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-400 mb-1">角色权限</div>
            <div className="text-sm text-gray-700">{user.roleName}</div>
          </div>
        </div>
      </Space>

      <div className="border-t border-gray-100 mt-6 pt-6">
        <Space direction="vertical" size={10} className="w-full">
          <Button
            type="primary"
            block
            size="large"
            icon={<User size={18} />}
            onClick={onViewProfile}
            className="h-12 font-medium"
          >
            个人信息
          </Button>
          <Button
            block
            size="large"
            icon={<Lock size={18} />}
            onClick={onChangePassword}
            className="h-12 font-medium"
          >
            修改密码
          </Button>
        </Space>
      </div>
    </Card>
  );
}
