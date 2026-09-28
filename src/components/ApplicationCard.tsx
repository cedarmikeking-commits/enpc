import { Application } from '@/api/user/type';
import { Card, Button, message } from 'antd';
import {
  ArrowRight,
  Building2,
  CheckSquare,
  PieChart,
  Users,
  FileText,
  Video,
  FileSignature,
  Briefcase,
  BookOpen,
  Award,
  ShieldCheck,
  Lock,
  CheckCircle,
} from 'lucide-react';
import { useState } from 'react';

interface ApplicationCardProps {
  application: Application;
  onEnter?: (app: Application) => void;
  isAuthorized?: boolean;
}

const iconMap: Record<string, any> = {
  Building2,
  CheckSquare,
  PieChart,
  Users,
  FileText,
  Video,
  FileSignature,
  Briefcase,
  BookOpen,
  Award,
  ShieldCheck,
};

const colorClassMap: Record<string, string> = {
  '#3b82f6': 'bg-blue-50',
  '#8b5cf6': 'bg-purple-50',
  '#10b981': 'bg-green-50',
  '#ec4899': 'bg-pink-50',
  '#f59e0b': 'bg-orange-50',
};
const applicationOpts = [
  { label: '管理平台', value: '1', className: 'from-red-500 to-red-600' },
  { label: '工作平台', value: '2', className: 'from-blue-500 to-blue-600' },
  { label: '学习平台', value: '3', className: 'from-green-500 to-green-600' },
  { label: '门户', value: '', className: 'from-yellow-500 to-yellow-600' },
];
export default function ApplicationCard({
  application,
  onEnter,
  isAuthorized = true,
}: ApplicationCardProps) {
  const IconComponent = application.icon ? iconMap[application.icon] : Building2;
  //const bgColorClass = application.color ? colorClassMap[application.color] : 'bg-blue-50';
  const bgColorClass = colorClassMap[application.color] || 'bg-blue-50';
  const [isSelected, setIsSelected] = useState(false);
  console.log('application.clientType', application.clientType);
  const applicationOpt = applicationOpts.find(opt => opt.value == application.clientType);
  const handleEnter = () => {
    if (!isAuthorized) {
      message.warning('该系统暂未授权，请联系管理员申请权限');
      return;
    }
    onEnter?.(application);
  };

  return (
    <Card
      className={`shadow-sm transition-all duration-300 h-full border ${isAuthorized
          ? 'hover:shadow-xl border-gray-100 hover:border-blue-200'
          : 'border-gray-200 opacity-90'
        }`}
      styles={{ body: { padding: '28px' } }}
    >
      <div className="flex flex-col h-full min-h-[220px]">
        <div className="relative">
          <div
            className={`w-16 h-16 ${bgColorClass} rounded-2xl flex items-center justify-center mb-5 shadow-sm ${!isAuthorized ? 'opacity-60' : ''}`}
          >
            <IconComponent size={32} style={{ color: application.color }} strokeWidth={2} />
          </div>
          {application.clientId === 'saber' ? (
            <div className="absolute -top-2 -right-2 px-4 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium rounded-full shadow-md">
              管理平台
            </div>
          ) : (
            <div className="absolute -top-2 -right-2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full shadow-md">
              工作平台
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          {application.clientName}
        </h3>

        <div className="mb-3">
          {isAuthorized ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
              <CheckCircle size={14} />
              已授权
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-300">
              <Lock size={14} />
              未授权
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed">
          {application.clientDesc}
        </p>

        <Button
          type={isAuthorized && isSelected ? "primary" : "default"}
          size="large"
          icon={isAuthorized ? <ArrowRight size={18} /> : <Lock size={18} />}
          iconPosition="end"
          onClick={handleEnter}
          block
          className={`font-medium h-11 transition-all duration-300 ${isAuthorized && !isSelected
              ? 'bg-gray-100 text-gray-600 border-gray-200 hover:!bg-blue-500 hover:!text-white hover:!border-blue-500'
              : !isAuthorized
                ? 'bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed'
                : ''
            }`}
          disabled={!isAuthorized}
        >
          {isAuthorized ? '进入系统' : '暂未授权'}
        </Button>
      </div>
    </Card>
  );
}
