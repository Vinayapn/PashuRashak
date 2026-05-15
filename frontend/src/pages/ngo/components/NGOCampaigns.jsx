import React from 'react';
import { DollarSign, Megaphone, Plus, Edit3, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NGOCampaigns({ campaigns, setCampaigns, setTab, setEditingCampaign }) {
  const stats = [
    { label: 'Total Raised', value: `Rs ${campaigns.reduce((acc, curr) => acc + Number(curr.raised), 0).toLocaleString()}`, icon: <DollarSign className="text-emerald-500" />, bgColor: 'bg-emerald-50' },
    { label: 'Total Goal', value: `Rs ${campaigns.reduce((acc, curr) => acc + Number(curr.goal), 0).toLocaleString()}`, icon: <Megaphone className="text-blue-500" />, bgColor: 'bg-blue-50' },
    { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length.toString(), icon: <Plus className="text-indigo-500" />, bgColor: 'bg-indigo-50' },
  ];

  const handleEdit = (camp) => {
    setEditingCampaign(camp);
    setTab('new-campaign');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      toast.success('Campaign deleted successfully');
    }
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Campaigns</h1>
          <p className="text-gray-500">Create and manage donation campaigns</p>
        </div>
        <button 
          onClick={() => setTab('new-campaign')}
          className="bg-[#4CAF50] hover:bg-[#43A047] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-100"
        >
          <Plus size={20} />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {campaigns.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-400 font-medium">
            No campaigns found. Create your first campaign to start raising funds!
          </div>
        )}
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group">
            <div className="flex justify-between items-start mb-6">
              <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${camp.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                {camp.status}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(camp)}
                  className="p-2 text-gray-400 hover:text-blue-500 transition-colors bg-gray-50 rounded-lg"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(camp.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{camp.title}</h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-2">{camp.desc}</p>
            
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
              <span>Rs {Number(camp.raised).toLocaleString()} raised</span>
              <span>Goal: Rs {Number(camp.goal).toLocaleString()}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min((Number(camp.raised) / Number(camp.goal)) * 100, 100)}%` }}></div>
            </div>
            <div className="text-xs font-bold text-emerald-600 mb-6">
              {Math.round((Number(camp.raised) / Number(camp.goal)) * 100)}% of goal reached
            </div>
            
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-6 border-t border-gray-50">
              Created {new Date(camp.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
