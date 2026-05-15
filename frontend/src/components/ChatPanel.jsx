import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { Send } from 'lucide-react';

export default function ChatPanel({ roomId = 'rescuer-general', title = 'Team Chat' }) {
  const { user } = useAuth();
  const { messages, joinRoom, sendMessage, connected } = useSocket();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { joinRoom(roomId); }, [roomId]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const roomMessages = messages.filter(m => m.roomId === roomId);

  const send = () => {
    if (!input.trim() || !connected) return;
    sendMessage(roomId, input.trim());
    setInput('');
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const roleColors = { rescuer: 'var(--orange)', ngo: 'var(--blue)', doctor: 'var(--green)' };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">💬 {title}</span>
        <span style={{ fontSize: 12, color: connected ? 'var(--green)' : 'var(--red)' }}>
          {connected ? '● Live' : '○ Offline'}
        </span>
      </div>
      <div className="chat-panel" style={{ flex: 1, minHeight: 0 }}>
        <div className="chat-messages" style={{ flex: 1 }}>
          {roomMessages.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', marginTop: 20 }}>
              No messages yet. Start the conversation!
            </p>
          )}
          {roomMessages.map(msg => {
            const isOwn = msg.from?.id === user?.id;
            return (
              <div key={msg.id} className={`chat-msg ${isOwn ? 'own' : ''}`}>
                {!isOwn && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-card)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700,
                      color: roleColors[msg.from?.role] || 'white' }}>
                      {msg.from?.name?.charAt(0)}
                    </div>
                    <span style={{ fontSize: 11, color: roleColors[msg.from?.role], fontWeight: 600 }}>{msg.from?.name}</span>
                  </div>
                )}
                <div className="chat-bubble">{msg.message}</div>
                <div className="chat-meta">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input-row">
          <input className="chat-input" placeholder="Type a message..." value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={handleKey} id="chat-input" />
          <button className="chat-send-btn" onClick={send} id="chat-send-btn"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}
