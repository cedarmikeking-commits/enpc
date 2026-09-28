import { Layout, Button } from 'antd';
import { LogOut } from 'lucide-react';
//import weblogo from '@/img/logo.png';
const weblogo = import.meta.env.VITE_STATIC_URL + "/logo.png";
const { Header: AntHeader } = Layout;

interface HeaderProps {
  onLogout?: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <AntHeader className="bg-white shadow-sm px-6 flex items-center justify-between h-16">
      <div className="flex items-center gap-3">
        <img src={weblogo} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
        <span className="text-xl font-semibold text-gray-800">职业教育学习成果国际互认平台</span>
      </div>

      <Button
        type="text"
        className='logout-btn'
        danger
        icon={<LogOut size={16} />}
        onClick={onLogout}
      >
        安全账户退出
      </Button>
    </AntHeader>
  );
}
