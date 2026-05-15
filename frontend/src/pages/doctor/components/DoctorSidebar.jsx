import React from 'react';
import { LayoutDashboard, Stethoscope, Calendar, PlusCircle, User, Pill, BarChart3, LogOut } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'health-cases', label: 'Health Cases', icon: <Stethoscope size={20} /> },
  { id: 'appointments', label: 'Appointments', icon: <Calendar size={20} /> },
  { id: 'new-case', label: 'New Case', icon: <PlusCircle size={20} /> },
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  { id: 'medicine-stock', label: 'Medicine Stock', icon: <Pill size={20} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
];

export default function DoctorSidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <div className="w-80 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-10 mb-6">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-[#2962FF] rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-all duration-500">
            <Stethoscope className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">PashuRashak</h1>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em] mt-1">Doctor Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            <span className={`${activeTab === item.id ? 'scale-110' : ''} transition-transform`}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(41,98,255,0.6)]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-gray-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
