import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, BookOpen, Clock, ShieldCheck, Camera, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DoctorProfile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute -bottom-16 left-10">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-[40px] p-1 shadow-xl">
                  <div className="w-full h-full bg-blue-50 rounded-[36px] flex items-center justify-center text-blue-600">
                    <User size={64} />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-3 bg-white shadow-lg rounded-2xl text-gray-400 hover:text-blue-600 transition-all border border-gray-100">
                  <Camera size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-10 px-10">
            <div className="flex justify-between items-start mb-10">
              <div className="flex-1 mr-8">
                {isEditing ? (
                  <input 
                    className="text-4xl font-bold text-gray-900 mb-2 bg-gray-50 border-none rounded-xl px-4 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{user.name}</h1>
                )}
                <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">Veterinary Surgeon • Senior Specialist</p>
              </div>
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => { setIsEditing(false); setFormData({ ...user }); }}
                      className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 bg-[#2962FF] text-white font-bold rounded-2xl hover:bg-[#1E40AF] transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
                    >
                      <Save size={18} />
                      Save
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-8 py-3 bg-[#2962FF] text-white font-bold rounded-2xl hover:bg-[#1E40AF] transition-all shadow-lg shadow-blue-100"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-gray-50">
              <div className="space-y-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><Mail size={20} /></div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</div>
                      {isEditing ? (
                        <input 
                          className="w-full bg-gray-50 border-none rounded-lg px-3 py-1 font-bold text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      ) : (
                        <div className="text-sm font-bold text-gray-800">{user.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><Phone size={20} /></div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</div>
                      {isEditing ? (
                        <input 
                          className="w-full bg-gray-50 border-none rounded-lg px-3 py-1 font-bold text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      ) : (
                        <div className="text-sm font-bold text-gray-800">{user.phone}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><MapPin size={20} /></div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</div>
                      {isEditing ? (
                        <input 
                          className="w-full bg-gray-50 border-none rounded-lg px-3 py-1 font-bold text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      ) : (
                        <div className="text-sm font-bold text-gray-800">{user.location}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Professional Details</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><Award size={20} /></div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience</div>
                      {isEditing ? (
                        <input 
                          className="w-full bg-gray-50 border-none rounded-lg px-3 py-1 font-bold text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                      ) : (
                        <div className="text-sm font-bold text-gray-800">{user.experience} Professional Experience</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><BookOpen size={20} /></div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Specialization</div>
                      {isEditing ? (
                        <input 
                          className="w-full bg-gray-50 border-none rounded-lg px-3 py-1 font-bold text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                          value={formData.specialization}
                          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        />
                      ) : (
                        <div className="text-sm font-bold text-gray-800">{user.specialization}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><Clock size={20} /></div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Working Hours</div>
                      {isEditing ? (
                        <input 
                          className="w-full bg-gray-50 border-none rounded-lg px-3 py-1 font-bold text-gray-800 outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                          value={formData.hours}
                          onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        />
                      ) : (
                        <div className="text-sm font-bold text-gray-800">{user.hours}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 rounded-[40px] p-10 text-white flex justify-between items-center shadow-xl shadow-emerald-100">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center">
              <ShieldCheck size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Medical Certification</h3>
              <p className="text-emerald-50 text-sm opacity-80">Your profile is verified by the National Medical Council</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg">
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
