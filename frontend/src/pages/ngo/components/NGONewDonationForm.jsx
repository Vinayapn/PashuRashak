import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, User, Mail, Phone, Heart, IndianRupee, MessageSquare, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NGONewDonationForm({ setTab, setDonations, editingDonation, campaigns }) {
  const [formData, setFormData] = useState({
    donor: '',
    email: '',
    phone: '',
    campaign: campaigns.length > 0 ? campaigns[0].title : '',
    amount: '',
    method: 'UPI',
    status: 'completed',
    msg: '',
  });

  useEffect(() => {
    if (editingDonation) {
      setFormData({
        donor: editingDonation.donor || '',
        email: editingDonation.email || '',
        phone: editingDonation.phone || '',
        campaign: editingDonation.campaign || (campaigns.length > 0 ? campaigns[0].title : ''),
        amount: editingDonation.amount || '',
        method: editingDonation.method || 'UPI',
        status: editingDonation.status || 'completed',
        msg: editingDonation.msg !== '—' ? editingDonation.msg.replace(/"/g, '') : '',
      });
    }
  }, [editingDonation, campaigns]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.donor || !formData.amount || !formData.campaign) {
      toast.error('Please fill all required fields');
      return;
    }

    const formattedMsg = formData.msg.trim() ? `"${formData.msg.trim()}"` : '—';
    const amountNum = Number(formData.amount);

    if (editingDonation) {
      // Update existing
      setDonations(prev => prev.map(d => 
        d.id === editingDonation.id 
          ? { ...d, ...formData, msg: formattedMsg, amount: amountNum }
          : d
      ));
      toast.success('Donation record updated successfully');
    } else {
      // Create new
      const newDonation = {
        id: Date.now(),
        ...formData,
        msg: formattedMsg,
        amount: amountNum,
        date: new Date().toISOString().split('T')[0]
      };
      setDonations(prev => [newDonation, ...prev]);
      toast.success('New donation added successfully');
    }
    
    setTab('donations');
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => setTab('donations')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Donations
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {editingDonation ? 'Edit Donation Record' : 'Record New Donation'}
            </h1>
            <p className="text-emerald-50">Log an offline or manual donation received by your organization.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Donor Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={formData.donor}
                      onChange={(e) => setFormData({...formData, donor: e.target.value})}
                      placeholder="Amit Kumar"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Campaign *</label>
                  <select 
                    required
                    value={formData.campaign}
                    onChange={(e) => setFormData({...formData, campaign: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium cursor-pointer"
                  >
                    {campaigns.length === 0 && <option value="">No campaigns available</option>}
                    {campaigns.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="amit@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Amount (Rs) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IndianRupee size={18} className="text-gray-400" />
                    </div>
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      placeholder="5000"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Payment Method</label>
                  <select 
                    value={formData.method}
                    onChange={(e) => setFormData({...formData, method: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium cursor-pointer"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Cash">Cash (Offline)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium cursor-pointer"
                  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <MessageSquare size={18} className="text-gray-400" />
                  </div>
                  <textarea 
                    rows="3"
                    value={formData.msg}
                    onChange={(e) => setFormData({...formData, msg: e.target.value})}
                    placeholder="Message from the donor..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-800 font-medium resize-none"
                  />
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => setTab('donations')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200"
              >
                <Save size={20} />
                {editingDonation ? 'Save Changes' : 'Record Donation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
