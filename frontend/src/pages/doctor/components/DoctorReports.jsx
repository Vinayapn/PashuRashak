import React from 'react';
import { TrendingUp, Activity, Users, Calendar, ArrowUpRight, ArrowDownRight, ChevronDown } from 'lucide-react';

const stats = [
  { label: 'Rescue Cases', value: '135', trend: '+18% from last period', isUp: true, icon: <Activity className="text-red-500" />, bgColor: 'bg-red-50' },
  { label: 'Health Cases', value: '99', trend: '+12% from last period', isUp: true, icon: <Activity className="text-blue-500" />, bgColor: 'bg-blue-50' },
  { label: 'Donations', value: 'Rs 423K', trend: '+24% from last period', isUp: true, icon: <TrendingUp className="text-emerald-500" />, bgColor: 'bg-emerald-50' },
  { label: 'New Volunteers', value: '17', trend: '+8% from last period', isUp: true, icon: <Users className="text-indigo-500" />, bgColor: 'bg-indigo-50' },
];

const animalTypes = [
  { type: 'Dog', count: 45, color: 'bg-red-400' },
  { type: 'Cat', count: 28, color: 'bg-orange-400' },
  { type: 'Cow', count: 18, color: 'bg-yellow-400' },
  { type: 'Bird', count: 12, color: 'bg-blue-400' },
  { type: 'Other', count: 8, color: 'bg-blue-600' },
];

export default function DoctorReports() {
  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500">Track your impact and organization performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
            Last 6 Months
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col">
            <div className={`w-12 h-12 ${s.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
              {s.icon}
            </div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{s.label}</div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{s.value}</div>
            <div className={`flex items-center gap-1 text-[10px] font-bold ${s.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
              {s.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Rescue Cases Trend</h3>
              <p className="text-xs text-gray-400 font-medium">Monthly rescue and health cases</p>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[35, 65, 45, 85, 55, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full relative flex flex-col justify-end gap-1 h-full">
                   <div className="w-full bg-red-400 rounded-lg group-hover:opacity-80 transition-opacity" style={{ height: `${val}%` }}></div>
                   <div className="w-full bg-blue-500 rounded-lg group-hover:opacity-80 transition-opacity" style={{ height: `${val/1.5}%` }}></div>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Animal Types</h3>
          <p className="text-xs text-gray-400 font-medium mb-8">Distribution of rescued animals</p>
          <div className="space-y-6">
            {animalTypes.map((a, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>{a.type}</span>
                  <span>{a.count}</span>
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div className={`h-full ${a.color}`} style={{ width: `${(a.count/50)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Case Urgency</h3>
          <p className="text-xs text-gray-400 font-medium mb-8">Breakdown by urgency level</p>
          <div className="space-y-6">
            {[
              { label: 'Critical', count: 15, color: 'bg-red-500' },
              { label: 'High', count: 32, color: 'bg-orange-500' },
              { label: 'Medium', count: 48, color: 'bg-amber-500' },
              { label: 'Low', count: 16, color: 'bg-emerald-500' },
            ].map((u, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${u.color}`}></div>
                <div className="flex-1 text-sm font-bold text-gray-600">{u.label}</div>
                <div className="text-sm font-bold text-gray-900">{u.count}</div>
                <div className="w-32 h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div className={`h-full ${u.color}`} style={{ width: `${(u.count/50)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Recent Activity</h3>
          <p className="text-xs text-gray-400 font-medium mb-8">Latest actions across the platform</p>
          <div className="space-y-6">
            {[
              { title: 'Rescue case resolved', desc: 'Injured Dog on Highway', time: '10 min ago', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { title: 'New health case created', desc: 'Cat Fever - Saket, Delhi', time: '2 hr ago', color: 'text-red-500', bg: 'bg-red-50' },
              { title: 'Appointment completed', desc: 'Tommy (Dog) - Checkup', time: '3 hr ago', color: 'text-blue-500', bg: 'bg-blue-50' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-3xl transition-colors group">
                <div className={`w-12 h-12 ${a.bg} ${a.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Activity size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-gray-900 text-sm">{a.title}</div>
                    <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-4">{a.time}</div>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
