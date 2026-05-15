import React from 'react';
import { LayoutDashboard, FileStack, PlusSquare, Map, User, BarChart3, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'my-cases', label: 'My Cases', icon: <FileStack size={20} /> },
  { id: 'new-case', label: 'New Case', icon: <PlusSquare size={20} /> },
  { id: 'map', label: 'Map', icon: <Map size={20} /> },
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
];

export default function RescuerSidebar({ activeTab, setTab, onLogout }) {
  return (
    <aside className="w-[280px] bg-white border-right border-gray-100 flex flex-col h-full shadow-sm z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
            <span className="text-2xl">🐾</span>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800 tracking-tight">PashuRashak</div>
            <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest -mt-1">Rescuer Dashboard</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
              activeTab === item.id 
                ? 'bg-red-50 text-red-600' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-top border-gray-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
