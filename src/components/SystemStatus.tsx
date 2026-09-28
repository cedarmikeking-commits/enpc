import { Card } from 'antd';
import { Activity } from 'lucide-react';
import type { SystemStatus } from '@/global';

interface SystemStatusProps {
  status: SystemStatus;
}

export default function SystemStatus({ status }: SystemStatusProps) {
  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-orange-500" />
          <span>系统状态</span>
        </div>
      }
      className="shadow-md"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">系统状态</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-600 font-medium">{status.status}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">系统版本</span>
          <span className="text-gray-800 font-semibold">{status.version}</span>
        </div>
      </div>
    </Card>
  );
}
