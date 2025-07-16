import React from 'react';

interface ChartProps {
  data: { date: string; value: number }[];
  title: string;
  color: string;
}

const Chart: React.FC<ChartProps> = ({ data, title, color }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className="glass-card-hover group">
      <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">{title}</h3>
      <div className="h-64 relative chart-glow">
        <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-800/50"
            />
          ))}

          {/* Data points and line */}
          <path
            d={`M ${data.map((d, i) => `${(i * 400) / (data.length - 1)},${200 - ((d.value - minValue) / range) * 200}`).join(' L ')}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          
          {/* Area fill */}
          <path
            d={`M ${data.map((d, i) => `${(i * 400) / (data.length - 1)},${200 - ((d.value - minValue) / range) * 200}`).join(' L ')} L 400,200 L 0,200 Z`}
            fill={`url(#gradient-${color})`}
          />

          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(i * 400) / (data.length - 1)}
              cy={200 - ((d.value - minValue) / range) * 200}
              r="4"
              fill={color}
              className="hover:r-6 transition-all duration-300 cursor-pointer"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Chart;