import { Modal, Form, Input, message } from 'antd';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface ChangePasswordModalProps {
  open: boolean;
  onCancel: () => void;
  onSave: (oldPassword: string, newPassword: string, newPassword1: string) => Promise<void>;
}

export default function ChangePasswordModal({ open, onCancel, onSave }: ChangePasswordModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await onSave(values.oldPassword, values.newPassword, values.newPassword1);
      message.success('密码修改成功，请使用新密码登录');
      form.resetFields();
      onCancel();
    } catch (error) {
      if (error instanceof Error) {
        message.error('密码修改失败，请重试');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg">
          <Lock size={20} className="text-blue-500" />
          <span>修改密码</span>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="确认修改"
      cancelText="取消"
      width={520}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" className="mt-6">
        <Form.Item
          label={
            <span className="flex items-center gap-2">
              <Lock size={16} />
              当前密码
            </span>
          }
          name="oldPassword"
          rules={[
            { required: true, message: '请输入当前密码' },
            { min: 6, message: '密码长度至少为6个字符' },
          ]}
        >
          <Input.Password
            placeholder="请输入当前密码"
            size="large"
            className="rounded-lg"
            iconRender={visible => (visible ? <Eye size={16} /> : <EyeOff size={16} />)}
            visibilityToggle={{
              visible: showOldPassword,
              onVisibleChange: setShowOldPassword,
            }}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="flex items-center gap-2">
              <Lock size={16} />
              新密码
            </span>
          }
          name="newPassword"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 8, message: '新密码长度至少为8个字符' },
            { max: 32, message: '新密码长度不能超过32个字符' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: '密码必须包含大小写字母和数字',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('oldPassword') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('新密码不能与当前密码相同'));
              },
            }),
          ]}
          help="密码必须包含大小写字母和数字，长度8-32个字符"
        >
          <Input.Password
            placeholder="请输入新密码"
            size="large"
            className="rounded-lg"
            iconRender={visible => (visible ? <Eye size={16} /> : <EyeOff size={16} />)}
            visibilityToggle={{
              visible: showNewPassword,
              onVisibleChange: setShowNewPassword,
            }}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="flex items-center gap-2">
              <Lock size={16} />
              确认新密码
            </span>
          }
          name="newPassword1"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请确认新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="请再次输入新密码"
            size="large"
            className="rounded-lg"
            iconRender={visible => (visible ? <Eye size={16} /> : <EyeOff size={16} />)}
            visibilityToggle={{
              visible: showConfirmPassword,
              onVisibleChange: setShowConfirmPassword,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
