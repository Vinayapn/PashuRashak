import React from 'react';
import { TrendingUp, Users, Heart, Award, ArrowUpRight, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

const stats = [
  { label: 'Rescue Cases', value: '135', sub: '+12% from last month', icon: <TrendingUp size={20} />, color: 'bg-red-50 text-red-600' },
  { label: 'Animals Helped', value: '98', sub: '+5 since yesterday', icon: <Heart size={20} />, color: 'bg-blue-50 text-blue-600' },
  { label: 'Donations', value: 'Rs 423K', sub: '+Rs 45K from last period', icon: <Award size={20} />, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'New Volunteers', value: '17', sub: '+2 this week', icon: <Users size={20} />, color: 'bg-orange-50 text-orange-600' },
];

const animalTypes = [
  { type: 'Dog', count: 48, color: 'bg-red-400' },
  { type: 'Cat', count: 28, color: 'bg-orange-400' },
  { type: 'Cow', count: 18, color: 'bg-amber-400' },
  { type: 'Bird', count: 12, color: 'bg-emerald-400' },
  { type: 'Other', count: 8, color: 'bg-blue-400' },
];

const urgencies = [
  { level: 'Critical', count: 12, color: 'bg-red-600' },
  { level: 'High', count: 32, color: 'bg-orange-500' },
  { level: 'Medium', count: 44, color: 'bg-amber-400' },
  { level: 'Low', count: 18, color: 'bg-emerald-400' },
];

const statuses = [
  { status: 'Pending', count: 22, color: 'bg-amber-400' },
  { status: 'In Progress', count: 35, color: 'bg-blue-400' },
  { status: 'Resolved', count: 54, color: 'bg-emerald-400' },
];

const topDonors = [
  { name: 'Amit Kumar', amount: 'Rs 22,000', label: '8 campaigns' },
  { name: 'Sunita Gupta', amount: 'Rs 18,000', label: '5 campaigns' },
  { name: 'Rohan Patil', amount: 'Rs 15,000', label: '4 campaigns' },
  { name: 'Neelu Sharma', amount: 'Rs 12,000', label: '2 campaigns' },
  { name: 'Vikram Singh', amount: 'Rs 10,000', label: '7 campaigns' },
];

const recentActivity = [
  { type: 'Rescue case resolved', desc: 'Injured Dog on Highway', time: '10 min ago', icon: <CheckCircle size={16} />, color: 'bg-emerald-50 text-emerald-500' },
  { type: 'New donation received', desc: 'Anjali donated Rs 2,500', time: '25 min ago', icon: <Heart size={16} />, color: 'bg-emerald-50 text-emerald-500' },
  { type: 'Volunteer joined', desc: 'Raman Gupta joined the squad', time: '1 hr ago', icon: <Users size={16} />, color: 'bg-blue-50 text-blue-500' },
  { type: 'Health case created', desc: 'Cat Fever - Saket, Delhi', time: '2 hrs ago', icon: <AlertCircle size={16} />, color: 'bg-red-50 text-red-500' },
  { type: 'Campaign target reached', desc: 'Vaccination Drive - Rs 25,000', time: '3 hrs ago', icon: <TrendingUp size={16} />, color: 'bg-amber-50 text-amber-500' },
];

export default function ReportsAnalytics() {
  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500">Track your impact and organization performance</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
          <Calendar size={18} className="text-gray-400 ml-2" />
          <select className="bg-transparent border-none text-sm font-bold text-gray-700 outline-none pr-4">
            <option>Last 6 Months</option>
            <option>Last 30 Days</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-800 mb-1">{stat.label}</div>
            <div className="text-xs text-emerald-500 flex items-center gap-1 font-bold">
              <ArrowUpRight size={12} />
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Charts) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Rescue Cases Trend */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-800">Rescue Cases Trend</h2>
            </div>
            <div className="h-[250px] flex items-end gap-3 px-4">
              {[60, 85, 120, 95, 140, 110].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full flex flex-col-reverse gap-1 h-full">
                    <div className="bg-blue-400 rounded-t-md transition-all hover:bg-blue-500" style={{ height: `${h * 0.6}%` }}></div>
                    <div className="bg-red-400 rounded-t-md transition-all hover:bg-red-500" style={{ height: `${h * 0.4}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Donations Trend */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-8">Donations Trend</h2>
            <div className="h-[200px] flex items-end gap-3 px-4">
              {[40, 65, 80, 55, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full bg-emerald-400 rounded-t-md transition-all hover:bg-emerald-500 relative group" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Rs {h}k</div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Animal Types */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Animal Types</h2>
              <div className="space-y-4">
                {animalTypes.map(item => (
                  <div key={item.type}>
                    <div className="flex justify-between text-sm mb-1 font-bold">
                      <span className="text-gray-600">{item.type}</span>
                      <span className="text-gray-900">{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.count/50)*100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Urgency */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Case Urgency</h2>
              <div className="space-y-4">
                {urgencies.map(item => (
                  <div key={item.level}>
                    <div className="flex justify-between text-sm mb-1 font-bold">
                      <span className="text-gray-600">{item.level}</span>
                      <span className="text-gray-900">{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.count/50)*100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Case Status */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Case Status</h2>
            <div className="space-y-6">
              {statuses.map(item => (
                <div key={item.status}>
                  <div className="flex justify-between text-sm mb-1 font-bold">
                    <span className="text-gray-600">{item.status}</span>
                    <span className="text-gray-900">{item.count}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${(item.count/60)*100}%` }}></div>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-3 gap-4 pt-4">
                {statuses.map(item => (
                  <div key={item.status} className={`${item.color.replace('bg-', 'bg-').split('-')[0]}-50 p-4 rounded-xl text-center`}>
                    <div className="text-2xl font-bold text-gray-900">{item.count}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Top Donors */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Top Donors</h2>
            <div className="space-y-6">
              {topDonors.map((donor, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{donor.name}</div>
                      <div className="text-xs text-gray-400">{donor.label}</div>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-bold text-sm">{donor.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== recentActivity.length - 1 && <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-50"></div>}
                  <div className={`w-10 h-10 ${act.color} rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
                    {act.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-gray-900 text-sm">{act.type}</div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase">{act.time}</div>
                    </div>
                    <div className="text-xs text-gray-500">{act.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
