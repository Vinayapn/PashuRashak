import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

export default function Sidebar({ navItems, activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const { connected } = useSocket();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const badgeClass = { rescuer: 'badge-rescuer', ngo: 'badge-ngo', doctor: 'badge-doctor' }[user?.role] || '';
  const avatarClass = { rescuer: 'avatar-rescuer', ngo: 'avatar-ngo', doctor: 'avatar-doctor' }[user?.role] || '';
  const roleLabel = { rescuer: '🦺 Rescuer', ngo: '🏥 NGO', doctor: '👨‍⚕️ Doctor' }[user?.role] || user?.role;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>🐾</span>
          <span className="app-name">PashuRashak</span>
        </div>
        <span className={`role-badge ${badgeClass}`}>{roleLabel}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <span className="live-dot" style={{ background: connected ? 'var(--green)' : 'var(--red)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{connected ? 'Live' : 'Offline'}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button key={item.id} className={`nav-item ${activeTab === item.id ? `active ${user?.role}` : ''}`}
            onClick={() => setActiveTab(item.id)} id={`nav-${item.id}`}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            {item.label}
            {item.badge ? <span style={{ marginLeft: 'auto', background: 'var(--red)', color: 'white',
              borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{item.badge}</span> : null}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className={`user-avatar ${avatarClass}`}>{user?.name?.charAt(0).toUpperCase()}</div>
          <div>
            <div className="user-name">{user?.name}</div>
            <div className="user-email">{user?.email}</div>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm w-full" onClick={handleLogout} id="logout-btn"
          style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  );
}
