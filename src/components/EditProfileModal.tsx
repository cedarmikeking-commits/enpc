import { Modal, Descriptions, Avatar } from 'antd';
import { User as UserIcon, Mail, Briefcase, Building, Shield } from 'lucide-react';
import { UserRecord } from '@/api/user/type';

interface EditProfileModalProps {
  open: boolean;
  user: UserRecord;
  onCancel: () => void;
}

export default function EditProfileModal({ open, user, onCancel }: EditProfileModalProps) {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg">
          <UserIcon size={20} className="text-blue-500" />
          <span>个人信息</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnHidden
    >
      <div className="mt-6">
        <div className="text-center mb-6 pb-6 border-b border-gray-100">
          <Avatar
            size={96}
            src={
              user.avatar ||
              'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=200'
            }
            className="mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
        </div>

        <Descriptions
          column={1}
          labelStyle={{ fontWeight: 600, width: '120px' }}
          contentStyle={{ color: '#4B5563' }}
        >
          <Descriptions.Item
            label={
              <span className="flex items-center gap-2">
                <UserIcon size={16} className="text-blue-500" />
                姓名
              </span>
            }
          >
            {user.name}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className="flex items-center gap-2">
                <Mail size={16} className="text-green-500" />
                邮箱地址
              </span>
            }
          >
            {user.email}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className="flex items-center gap-2">
                <Briefcase size={16} className="text-orange-500" />
                用户名
              </span>
            }
          >
            {user.account || '-'}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className="flex items-center gap-2">
                <Building size={16} className="text-cyan-500" />
                所属组织
              </span>
            }
          >
            {user.deptName || '-'}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className="flex items-center gap-2">
                <Shield size={16} className="text-purple-500" />
                角色权限
              </span>
            }
          >
            {user.roleName}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
}
