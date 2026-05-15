import React from 'react';
import { LayoutDashboard, Megaphone, DollarSign, User, Users, FileText, LogOut, Heart } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { id: 'campaigns', icon: <Megaphone size={20} />, label: 'Campaigns' },
  { id: 'donations', icon: <DollarSign size={20} />, label: 'Donations' },
  { id: 'profile', icon: <User size={20} />, label: 'Profile' },
  { id: 'volunteers', icon: <Users size={20} />, label: 'Volunteers' },
  { id: 'adoption', icon: <Heart size={20} />, label: 'Adoption' },
  { id: 'reports', icon: <FileText size={20} />, label: 'Reports' },
];

export default function NGOSidebar({ activeTab, setTab }) {
  const { logout } = useAuth();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold">
            <Heart size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-none mb-1">PashuRashak</h2>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">NGO Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-gray-50">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm text-red-400 hover:text-red-500 hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
