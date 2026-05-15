import React from 'react';
import { DollarSign, Megaphone, Users, Heart, Plus, FileText, CheckCircle } from 'lucide-react';

const activeCampaigns = [
  { id: 1, title: 'Street Dogs Rescue', raised: 32500, goal: 50000, donors: 145, status: 'Active' },
  { id: 2, title: 'Cow Shelter Build', raised: 78000, goal: 100000, donors: 234, status: 'Active' },
  { id: 3, title: 'Vaccination Drive', raised: 25000, goal: 25000, donors: 89, status: 'Completed' },
];

const recentDonations = [
  { id: 1, donor: 'Amit Kumar', campaign: 'Street Dogs Rescue', amount: '+Rs 5,000', date: '2025-04-28' },
  { id: 2, donor: 'Seema Gupta', campaign: 'Cow Shelter Build', amount: '+Rs 10,000', date: '2025-04-27' },
  { id: 3, donor: 'Rajesh Patil', campaign: 'Street Dogs Rescue', amount: '+Rs 2,500', date: '2025-04-27' },
  { id: 4, donor: 'Neetu Sharma', campaign: 'Cow Shelter Build', amount: '+Rs 7,500', date: '2025-04-26' },
];

export default function NGODashboardOverview({ setTab, stats }) {
  const displayStats = [
    { label: 'Total Donations', value: 'Rs 2.5L', icon: <DollarSign className="text-emerald-500" />, bgColor: 'bg-emerald-50' },
    { label: 'Campaigns', value: stats?.totalActiveCampaigns || '8', icon: <Megaphone className="text-blue-500" />, bgColor: 'bg-blue-50' },
    { label: 'Donors', value: '468', icon: <Users className="text-indigo-500" />, bgColor: 'bg-indigo-50' },
    { label: 'Animals Saved', value: stats?.totalAnimalsSaved || '0', icon: <Heart className="text-red-500" />, bgColor: 'bg-red-50' },
  ];

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hello, sameer!</h1>
        <p className="text-gray-500">Which campaign will you run today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {displayStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>


      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button 
          onClick={() => setTab('campaigns')}
          className="bg-[#4CAF50] hover:bg-[#43A047] text-white p-8 rounded-2xl flex items-start gap-4 transition-all group shadow-lg shadow-green-100"
        >
          <div className="bg-white/20 p-3 rounded-xl">
            <Plus size={24} />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold mb-1">New Campaign</div>
            <div className="text-white/80 text-sm">Start a donation campaign</div>
          </div>
        </button>

        <button 
          onClick={() => setTab('donations')}
          className="bg-[#FF9800] hover:bg-[#F57C00] text-white p-8 rounded-2xl flex items-start gap-4 transition-all group shadow-lg shadow-orange-100"
        >
          <div className="bg-white/20 p-3 rounded-xl">
            <FileText size={24} />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold mb-1">Donation Report</div>
            <div className="text-white/80 text-sm">View donors and amounts</div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Campaigns */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Active Campaigns</h2>
            <button onClick={() => setTab('campaigns')} className="text-[#4CAF50] font-semibold text-sm hover:underline">View All</button>
          </div>
          <div className="p-6 space-y-6">
            {activeCampaigns.map((camp) => (
              <div key={camp.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{camp.title}</h3>
                    <div className="text-xs text-gray-500 mt-1">Rs {camp.raised.toLocaleString()} raised • Goal: Rs {camp.goal.toLocaleString()}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${camp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                    {camp.status}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-500" style={{ width: `${(camp.raised / camp.goal) * 100}%` }}></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Users size={12} />
                  {camp.donors} donors
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Recent Donations</h2>
            <button onClick={() => setTab('donations')} className="text-[#4CAF50] font-semibold text-sm hover:underline">View All</button>
          </div>
          <div className="p-2">
            {recentDonations.map((don) => (
              <div key={don.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{don.donor}</div>
                    <div className="text-xs text-gray-500">{don.campaign}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-600 font-bold">{don.amount}</div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{don.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
