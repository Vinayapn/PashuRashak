import React, { useState, useRef, useEffect } from 'react';
import MapView from '../../../components/MapView';
import { Filter, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MapExplore({ alerts }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapHeight, setMapHeight] = useState(500);
  const containerRef = useRef(null);

  const safeAlerts = alerts || [];
  
  const filteredAlerts = activeFilter 
    ? safeAlerts.filter(a => a.severity === activeFilter)
    : safeAlerts;

  const toggleFilter = (severity) => {
    setActiveFilter(prev => prev === severity ? null : severity);
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    toast.loading('Locating...', { id: 'location' });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        toast.success('Location found!', { id: 'location' });
      },
      (error) => {
        let msg = 'Unable to retrieve your location';
        if (error.code === 1) msg = 'Location permission denied';
        toast.error(msg, { id: 'location' });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Calculate actual pixel height for the map container
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Subtract some padding for the container
        setMapHeight(Math.max(rect.height - 16, 300));
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="p-8 bg-[#F8F9FA] h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Live Rescue Map</h1>
          <p className="text-gray-500">Real-time visualization of all rescue cases and alerts</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveFilter(null)}
            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-all shadow-sm ${activeFilter === null ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            <Filter size={18} />
            {activeFilter ? `Clear Filter` : `All Alerts`}
          </button>
          <button 
            onClick={handleNearMe}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100"
          >
            <Navigation size={18} />
            Near Me
          </button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 bg-white p-2 rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative mb-8">
        <div className="absolute top-6 left-6 z-[1000] space-y-2">
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
            {[
              { id: 'Critical', color: 'bg-red-500', shadow: 'shadow-red-200' },
              { id: 'High', color: 'bg-orange-500', shadow: 'shadow-orange-200' },
              { id: 'Medium', color: 'bg-amber-500', shadow: 'shadow-amber-200' },
              { id: 'Low', color: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
            ].map(level => (
              <div 
                key={level.id}
                onClick={() => toggleFilter(level.id)}
                className={`flex items-center gap-2 cursor-pointer p-1 rounded-lg transition-colors ${activeFilter === level.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <span className={`w-3 h-3 rounded-full ${level.color} shadow-sm ${level.shadow}`}></span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${activeFilter === level.id ? 'text-gray-900' : 'text-gray-500'}`}>
                  {level.id}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full h-full rounded-2xl overflow-hidden">
           <MapView alerts={filteredAlerts} center={mapCenter} height={mapHeight} />
        </div>
      </div>
    </div>
  );
}
