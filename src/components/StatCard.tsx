import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  color: 'purple' | 'blue' | 'green' | 'orange' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    purple: 'bg-gradient-to-br from-violet-500/30 to-purple-500/30 text-violet-400 border border-violet-500/40 shadow-lg shadow-violet-500/20',
    blue: 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/20',
    green: 'bg-gradient-to-br from-emerald-500/30 to-green-500/30 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20',
    orange: 'bg-gradient-to-br from-amber-500/30 to-orange-500/30 text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-500/20',
    red: 'bg-gradient-to-br from-rose-500/30 to-red-500/30 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-500/20'
  };

  return (
    <div className="glass-card-hover stat-card-glow group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300">{title}</p>
          <p className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">{value}</p>
          <p className={`text-sm mt-1 ${changeType === 'increase' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {changeType === 'increase' ? '+' : '-'}{change}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]} group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
          <Icon className="w-6 h-6 group-hover:animate-pulse" />
          <div className="pulse-ring opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;