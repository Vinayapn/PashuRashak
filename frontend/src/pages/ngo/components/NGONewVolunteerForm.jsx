import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, User, Mail, Phone, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NGONewVolunteerForm({ setTab, setVolunteers, editingVolunteer }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'pending',
    skills: '', // We'll let them enter comma separated skills
  });

  useEffect(() => {
    if (editingVolunteer) {
      setFormData({
        name: editingVolunteer.name || '',
        email: editingVolunteer.email || '',
        phone: editingVolunteer.phone || '',
        status: editingVolunteer.status || 'pending',
        skills: editingVolunteer.skills ? editingVolunteer.skills.join(', ') : '',
      });
    }
  }, [editingVolunteer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');

    if (editingVolunteer) {
      // Update existing
      setVolunteers(prev => prev.map(v => 
        v.id === editingVolunteer.id 
          ? { ...v, ...formData, skills: skillsArray.length ? skillsArray : v.skills }
          : v
      ));
      toast.success('Volunteer updated successfully');
    } else {
      // Create new
      const newVolunteer = {
        id: Date.now(),
        ...formData,
        skills: skillsArray.length ? skillsArray : ['General Support'],
        contributions: '0 hrs',
        cases: '0 cases',
        joined: new Date().toISOString().split('T')[0]
      };
      setVolunteers(prev => [newVolunteer, ...prev]);
      toast.success('New volunteer added successfully');
    }
    
    setTab('volunteers');
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => setTab('volunteers')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Volunteers
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {editingVolunteer ? 'Edit Volunteer' : 'Add New Volunteer'}
            </h1>
            <p className="text-emerald-50">Manage volunteer details and assignment status.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Rahul Sharma"
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
                    <option value="pending">Pending Approval</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="rahul@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Skills (Comma Separated)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Heart size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    placeholder="Rescue, Medical, Transport, Foster Care..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">E.g., Medical, Transport, Fundraising. These will be automatically formatted into tags.</p>
              </div>

            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => setTab('volunteers')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200"
              >
                <Save size={20} />
                {editingVolunteer ? 'Save Changes' : 'Add Volunteer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
