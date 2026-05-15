import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Eye, Shield, Users, Heart, Award, Leaf, TreePine } from 'lucide-react';
import Navbar from '../../components/Navbar';

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Heart size={24} />,
      title: "Compassion First",
      desc: "Every animal deserves to be treated with kindness, empathy, and respect."
    },
    {
      icon: <Shield size={24} />,
      title: "Integrity & Trust",
      desc: "We maintain transparency and accountability in all our rescue operations."
    },
    {
      icon: <Users size={24} />,
      title: "Community Driven",
      desc: "We believe in the power of collective action to create lasting change."
    },
    {
      icon: <Award size={24} />,
      title: "Innovation",
      desc: "Using technology to solve the most pressing challenges in animal welfare."
    }
  ];

  const milestones = [
    { year: "2023", title: "The Idea Born", desc: "Started with a vision to connect animal lovers in a single digital ecosystem." },
    { year: "2024", title: "Launch Phase", desc: "Platform launched in New Delhi with 50+ registered rescuers and 10 NGOs." },
    { year: "2025", title: "Expansion", desc: "Reached 5000+ rescues and expanded to major cities across North India." },
    { year: "2026", title: "PashuRashak 2.0", desc: "Integrated real-time tracking and medical database for veterinary doctors." }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 selection:bg-emerald-500/30">
      <Navbar />
      
      <header className="py-24 px-6 md:px-10 text-center bg-gradient-to-b from-emerald-500/5 to-transparent relative overflow-hidden">
        <div className="absolute top-16 right-20 opacity-10 rotate-12 pointer-events-none hidden lg:block">
          <Leaf size={100} strokeWidth={1} />
        </div>
        <div className="absolute bottom-10 left-20 opacity-10 -rotate-12 pointer-events-none hidden lg:block">
          <TreePine size={80} strokeWidth={1} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full mb-6 border border-emerald-500/20">
            About Us
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Our Mission & Vision</h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            Connecting compassion with action to ensure every animal gets the care and protection they deserve.
          </p>
        </div>
      </header>

      <section className="py-20 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-12 rounded-[48px] hover:bg-emerald-500/[0.08] hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-black mb-6">Our Mission</h3>
            <p className="text-white/70 text-lg leading-relaxed">
              To build a seamless, tech-enabled ecosystem that connects rescuers, NGOs, and veterinary doctors, ensuring rapid response and comprehensive care for animals in distress.
            </p>
          </div>
          <div className="bg-sky-500/5 border border-sky-500/20 p-12 rounded-[48px] hover:bg-sky-500/[0.08] hover:border-sky-500/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-14 h-14 bg-sky-500/10 text-sky-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-black mb-6">Our Vision</h3>
            <p className="text-white/70 text-lg leading-relaxed">
              A world where no animal has to suffer due to lack of immediate help, and where every community is empowered to protect and care for its animal population.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 bg-white/[0.02] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-emerald-500/20">
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Core Values</h2>
            <p className="text-white/60 text-lg">The principles that guide every rescue and every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-gray-950 border border-white/10 p-10 rounded-[32px] hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{v.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm relative z-10">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-[1400px] mx-auto relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="text-center mb-20 relative z-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-emerald-500/20">
            History
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Our Journey</h2>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-0">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
          {milestones.map((m, i) => (
            <div key={i} className={`flex flex-col md:flex-row justify-between items-center mb-16 relative w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full z-10 border-4 border-gray-950 shadow-lg shadow-emerald-500/30"></div>
              <div className="w-full md:w-[45%]">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.08] hover:border-emerald-500/20 transition-all duration-300 group">
                  <span className="text-emerald-400 font-black text-2xl tracking-tighter group-hover:text-emerald-300 transition-colors">{m.year}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{m.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
              <div className="md:w-[45%]"></div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black pt-20 pb-10 border-t border-white/5 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto text-center md:text-left relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <Heart size={20} fill="white" color="white" />
                </div>
                <span className="text-2xl font-black tracking-tight">PashuRashak</span>
              </div>
              <p className="text-white/40 max-w-md leading-relaxed mx-auto md:mx-0">
                Empowering the community to protect and care for every life. Our platform bridges the gap between those who can help and animals in need.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-8">Quick Links</h4>
              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('/')} className="text-white/60 hover:text-white transition-colors text-left">Home</button>
                <button onClick={() => navigate('/services')} className="text-white/60 hover:text-white transition-colors text-left">Services</button>
                <button onClick={() => navigate('/about')} className="text-white/60 hover:text-white transition-colors text-left">About Us</button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-8">Support</h4>
              <div className="flex flex-col gap-4 text-white/60">
                <p>Email: help@pashurashak.org</p>
                <p>Phone: +91 1800-123-4567</p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-white/30 text-sm">
            <p>&copy; 2026 PashuRashak Animal Welfare Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Background Orbs */}
      <div className="fixed top-0 -left-64 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 -right-64 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
    </div>
  );
};

export default AboutPage;