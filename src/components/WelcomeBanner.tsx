import { Card, Button, Space } from 'antd';
import { CheckSquare, Clock } from 'lucide-react';

interface WelcomeBannerProps {
  userName: string;
  pendingTasks: number;
  notifications: number;
}

export default function WelcomeBanner({
  userName,
  pendingTasks,
  notifications,
}: WelcomeBannerProps) {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <Card className="mb-6 overflow-hidden relative" styles={{ body: { padding: 0 } }}>
      <div className="relative h-64 flex items-center px-12 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="absolute top-10 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-40 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 left-1/3 w-64 h-64 bg-cyan-300/10 rounded-full blur-2xl"></div>

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="mb-2">
            <div className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <span className="text-white/90 text-sm font-medium">个人应用中心</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            欢迎回来，{userName}
          </h1>

          <p className="text-lg mb-8 text-white/95 leading-relaxed font-light">
            今天是 {dateStr}，希望您今天工作顺利！
          </p>

          <Space size="middle">
            <Button
              type="primary"
              size="large"
              icon={<CheckSquare size={18} />}
              className="h-12 px-6 bg-white text-blue-600 hover:bg-gray-50 border-0 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              职业教育学习成果国际互认
            </Button>
            <Button
              size="large"
              icon={<Clock size={18} />}
              className="h-12 px-6 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:border-white/40 font-medium transition-all duration-300"
            >
              职业领域标准
            </Button>
          </Space>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none">
          <div className="relative h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent"></div>

            <div className="relative space-y-4 transform translate-x-8">
              <div className="flex gap-4 animate-float">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"></div>
              </div>
              <div className="flex gap-4 animate-float-delayed">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </Card>
  );
}
