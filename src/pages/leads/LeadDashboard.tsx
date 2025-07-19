import React from 'react';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Mail, 
  Phone, 
  Calendar,
  Plus,
  Filter,
  Download,
  Search,
  MoreHorizontal,
  Eye,
  MessageCircle,
  UserPlus,
  Building
} from 'lucide-react';
import StatCard from '../../components/StatCard';
import Chart from '../../components/Chart';

const LeadDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Leads',
      value: '2.4K',
      change: '12.3%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'purple' as const
    },
    {
      title: 'Qualified Leads',
      value: '847',
      change: '8.7%',
      changeType: 'increase' as const,
      icon: Target,
      color: 'blue' as const
    },
    {
      title: 'Conversion Rate',
      value: '24.5%',
      change: '2.1%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'green' as const
    },
    {
      title: 'Active Campaigns',
      value: '12',
      change: '15.2%',
      changeType: 'increase' as const,
      icon: Mail,
      color: 'orange' as const
    }
  ];

  const chartData = [
    { date: '2024-01-01', value: 120 },
    { date: '2024-01-02', value: 135 },
    { date: '2024-01-03', value: 148 },
    { date: '2024-01-04', value: 162 },
    { date: '2024-01-05', value: 178 },
    { date: '2024-01-06', value: 195 },
    { date: '2024-01-07', value: 210 }
  ];

  const recentLeads = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      title: 'Marketing Director',
      source: 'LinkedIn',
      status: 'qualified',
      score: 85,
      lastContact: '2 hours ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'StartupXYZ',
      title: 'CEO',
      source: 'Content',
      status: 'new',
      score: 72,
      lastContact: '1 day ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      company: 'Enterprise Solutions',
      title: 'VP Sales',
      source: 'Referral',
      status: 'contacted',
      score: 91,
      lastContact: '3 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'qualified':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'new':
        return 'bg-blue-500/20 text-blue-400';
      case 'contacted':
        return 'bg-amber-500/20 text-amber-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Lead Dashboard</h1>
          <p className="text-gray-400">Track and manage your LinkedIn lead generation</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 glass-card hover:bg-gray-800/60 text-gray-300 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 glass-card hover:bg-gray-800/60 text-gray-300 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="stagger-animation">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          data={chartData} 
          title="Lead Generation Over Time" 
          color="#06b6d4" 
        />
        
        <div className="glass-card-hover">
          <h3 className="text-lg font-semibold text-white mb-4">Lead Sources</h3>
          <div className="space-y-4">
            {[
              { source: 'LinkedIn Posts', count: 156, percentage: 45 },
              { source: 'Direct Outreach', count: 89, percentage: 26 },
              { source: 'Content Marketing', count: 67, percentage: 19 },
              { source: 'Referrals', count: 34, percentage: 10 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{item.source}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-10">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="glass-card-hover">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Leads</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-3 px-4 font-medium text-white">Lead</th>
                <th className="text-left py-3 px-4 font-medium text-white">Company</th>
                <th className="text-left py-3 px-4 font-medium text-white">Source</th>
                <th className="text-left py-3 px-4 font-medium text-white">Status</th>
                <th className="text-left py-3 px-4 font-medium text-white">Score</th>
                <th className="text-left py-3 px-4 font-medium text-white">Last Contact</th>
                <th className="text-left py-3 px-4 font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors duration-300">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{lead.name}</p>
                        <p className="text-xs text-gray-400">{lead.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-white">{lead.company}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-300">{lead.source}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-400">{lead.lastContact}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors duration-200">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-400 transition-colors duration-200">
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-white">Find New Leads</h4>
              <p className="text-sm text-gray-400">Discover potential customers</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg transition-all duration-300 hover:scale-105">
            Start Lead Search
          </button>
        </div>

        <div className="glass-card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-white">Outreach Campaign</h4>
              <p className="text-sm text-gray-400">Create personalized campaigns</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 border border-violet-500/30 rounded-lg transition-all duration-300 hover:scale-105">
            Create Campaign
          </button>
        </div>

        <div className="glass-card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-white">Schedule Follow-up</h4>
              <p className="text-sm text-gray-400">Never miss a follow-up</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-lg transition-all duration-300 hover:scale-105">
            Schedule Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDashboard;