import React, { useState } from 'react';
import { Search, Filter, Plus, Edit3, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NGOVolunteers({ volunteers, setVolunteers, setTab, setEditingVolunteer }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const stats = [
    { label: 'Total Volunteers', value: volunteers.length.toString(), icon: <Plus className="text-emerald-500" />, bgColor: 'bg-emerald-50' },
    { label: 'Active', value: volunteers.filter(v => v.status === 'active').length.toString(), icon: <Plus className="text-blue-500" />, bgColor: 'bg-blue-50' },
    { label: 'Pending Approval', value: volunteers.filter(v => v.status === 'pending').length.toString(), icon: <Plus className="text-amber-500" />, bgColor: 'bg-amber-50' },
    { label: 'Hours Contributed', value: volunteers.reduce((acc, curr) => acc + parseInt(curr.contributions || 0), 0).toString(), icon: <Plus className="text-indigo-500" />, bgColor: 'bg-indigo-50' },
  ];

  const handleEdit = (vol) => {
    setEditingVolunteer(vol);
    setTab('new-volunteer');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this volunteer?')) {
      setVolunteers(prev => prev.filter(v => v.id !== id));
      toast.success('Volunteer removed successfully');
    }
  };

  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.skills.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || v.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
          <h1 className="text-3xl font-bold text-gray-800">Volunteers</h1>
          <p className="text-gray-500">Manage volunteer applications and assignments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search volunteers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white text-gray-500 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-[300px]"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>
          <button 
            onClick={() => setTab('new-volunteer')}
            className="bg-[#4CAF50] hover:bg-[#43A047] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-100"
          >
            <Plus size={20} />
            Add Volunteer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Volunteer</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Skills</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Contributions</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Joined</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredVolunteers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">No volunteers found matching your criteria.</td>
                </tr>
              )}
              {filteredVolunteers.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                        {v.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{v.name}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{v.email}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{v.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {v.skills.map((skill, i) => (
                        <span key={i} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          ['Rescue', 'Transport'].includes(skill) ? 'bg-red-50 text-red-500' :
                          ['Medical', 'Foster Care'].includes(skill) ? 'bg-blue-50 text-blue-500' :
                          'bg-purple-50 text-purple-500'
                        }`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      v.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      v.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="text-gray-900 font-bold text-sm">{v.contributions}</div>
                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{v.cases}</div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="text-xs font-bold text-gray-500">{new Date(v.joined).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(v)}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors bg-gray-50 rounded-lg"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(v.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
