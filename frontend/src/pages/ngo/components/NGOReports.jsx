import React from 'react';
import { TrendingUp, Users, Heart, Award, ArrowUpRight, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

const stats = [
  { label: 'Rescue Cases', value: '135', sub: '+18% from last period', icon: <TrendingUp size={20} />, color: 'bg-red-50 text-red-600' },
  { label: 'Health Cases', value: '99', sub: '+12% from last period', icon: <AlertCircle size={20} />, color: 'bg-blue-50 text-blue-600' },
  { label: 'Donations', value: 'Rs 423K', sub: '+24% from last period', icon: <Award size={20} />, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'New Volunteers', value: '17', sub: '+8% from last period', icon: <Users size={20} />, color: 'bg-orange-50 text-orange-600' },
];

const animalTypes = [
  { type: 'Dog', count: 45, color: 'bg-red-400' },
  { type: 'Cat', count: 28, color: 'bg-orange-400' },
  { type: 'Cow', count: 18, color: 'bg-amber-400' },
  { type: 'Bird', count: 12, color: 'bg-emerald-400' },
  { type: 'Other', count: 8, color: 'bg-blue-400' },
];

export default function NGOReports() {
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
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-6`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm font-bold text-gray-800 mb-1">{stat.label}</div>
            <div className="text-[10px] text-emerald-500 flex items-center gap-1 font-bold uppercase">
              <ArrowUpRight size={10} />
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Rescue Cases Trend */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-8">Rescue Cases Trend</h2>
            <div className="h-[250px] flex items-end gap-3 px-4">
              {[40, 70, 95, 80, 130, 110].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4">
                  <div className="w-full flex flex-col-reverse gap-1 h-full">
                    <div className="bg-blue-400 rounded-t-lg" style={{ height: `${h * 0.6}%` }}></div>
                    <div className="bg-red-400 rounded-t-lg" style={{ height: `${h * 0.4}%` }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donations Trend */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-8">Donations Trend</h2>
            <div className="h-[200px] flex items-end gap-4 px-4">
              {[45, 62, 78, 55, 95, 88].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4">
                  <div className="w-full bg-emerald-400 rounded-t-lg relative group" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Rs {h}K</div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-8">Animal Types</h2>
              <div className="space-y-6">
                {animalTypes.map(item => (
                  <div key={item.type}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-gray-600 uppercase tracking-tighter">{item.type}</span>
                      <span className="text-gray-900">{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.count/50)*100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-8">Case Status</h2>
              <div className="space-y-6">
                {[
                  { label: 'Pending', count: 22, color: 'bg-amber-400' },
                  { label: 'In Progress', count: 35, color: 'bg-blue-400' },
                  { label: 'Resolved', count: 54, color: 'bg-emerald-400' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-gray-600 uppercase tracking-tighter">{item.label}</span>
                      <span className="text-gray-900">{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.count/60)*100}%` }}></div>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-2 mt-6">
                  <div className="bg-amber-50 p-2 rounded-xl text-center">
                    <div className="text-sm font-bold text-gray-800">22</div>
                    <div className="text-[8px] font-bold text-amber-600 uppercase">Pending</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-xl text-center">
                    <div className="text-sm font-bold text-gray-800">35</div>
                    <div className="text-[8px] font-bold text-blue-600 uppercase">Active</div>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-xl text-center">
                    <div className="text-sm font-bold text-gray-800">54</div>
                    <div className="text-[8px] font-bold text-emerald-600 uppercase">Resolved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-8">Top Donors</h2>
            <div className="space-y-8">
              {[
                { name: 'Amit Kumar', campaigns: '3 campaigns', amount: 'Rs 25,000' },
                { name: 'Seema Gupta', campaigns: '2 campaigns', amount: 'Rs 18,000' },
                { name: 'Rajesh Patil', campaigns: '4 campaigns', amount: 'Rs 15,000' },
                { name: 'Neetu Sharma', campaigns: '2 campaigns', amount: 'Rs 12,000' },
                { name: 'Vikram Singh', campaigns: '1 campaigns', amount: 'Rs 10,000' },
              ].map((donor, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{donor.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{donor.campaigns}</div>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-bold text-sm">{donor.amount}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-8">Recent Activity</h2>
            <div className="space-y-8">
              {[
                { type: 'Rescue case resolved', desc: 'Injured Dog on Highway', time: '10 min ago', color: 'bg-emerald-500' },
                { type: 'New donation received', desc: 'Rs 5,000 from Amit Kumar', time: '25 min ago', color: 'bg-emerald-400' },
                { type: 'Volunteer joined', desc: 'Seema Gupta - Rescue, Photography', time: '1 hr ago', color: 'bg-blue-400' },
                { type: 'Health case created', desc: 'Cat Fever - Saket, Delhi', time: '2 hrs ago', color: 'bg-red-400' },
                { type: 'Campaign goal reached', desc: 'Vaccination Drive - Rs 25,000', time: '3 hrs ago', color: 'bg-amber-400' },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 4 && <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-gray-50"></div>}
                  <div className={`w-[24px] h-[24px] rounded-full ${act.color} flex-shrink-0 z-10 border-4 border-white shadow-sm`}></div>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-gray-900 text-sm">{act.type}</div>
                      <div className="text-[8px] text-gray-400 font-bold uppercase whitespace-nowrap ml-4">{act.time}</div>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">{act.desc}</div>
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
