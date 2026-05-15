import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, IndianRupee, FileText, Target } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NGONewCampaignForm({ setTab, setCampaigns, editingCampaign }) {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    goal: '',
    status: 'active',
  });

  useEffect(() => {
    if (editingCampaign) {
      setFormData({
        title: editingCampaign.title || '',
        desc: editingCampaign.desc || '',
        goal: editingCampaign.goal || '',
        status: editingCampaign.status || 'active',
      });
    }
  }, [editingCampaign]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.desc || !formData.goal) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingCampaign) {
      // Update existing
      setCampaigns(prev => prev.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, ...formData, goal: Number(formData.goal) }
          : c
      ));
      toast.success('Campaign updated successfully');
    } else {
      // Create new
      const newCampaign = {
        id: Date.now(),
        ...formData,
        goal: Number(formData.goal),
        raised: 0,
        date: new Date().toISOString().split('T')[0]
      };
      setCampaigns(prev => [newCampaign, ...prev]);
      toast.success('New campaign created successfully');
    }
    
    setTab('campaigns');
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => setTab('campaigns')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Campaigns
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
            </h1>
            <p className="text-emerald-50">Fill in the details to launch your fundraising campaign.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Title *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Target size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Winter Blankets for Stray Dogs"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <FileText size={18} className="text-gray-400" />
                  </div>
                  <textarea 
                    required
                    rows="4"
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                    placeholder="Describe the purpose of this campaign..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Funding Goal (Rs) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IndianRupee size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                      placeholder="50000"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => setTab('campaigns')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200"
              >
                <Save size={20} />
                {editingCampaign ? 'Save Changes' : 'Publish Campaign'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
