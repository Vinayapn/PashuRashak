import React, { useEffect, useRef, useState, useCallback } from 'react';

const SEVERITY_COLORS = { Critical: '#e74c3c', High: '#f39c12', Medium: '#3498db', Low: '#2ecc71' };
const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 };
const TILE_LAYERS = {
  default: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    options: { subdomains: 'abcd', maxZoom: 19 },
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, Maxar, Earthstar Geographics',
    options: { maxZoom: 18 },
    labelsUrl: 'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
    labelsOptions: { subdomains: 'abcd', maxZoom: 19, pane: 'shadowPane' },
  },
};

/* ─── Shared inline style helpers ─── */
const panelStyle = {
  position: 'absolute', zIndex: 1000, fontFamily: "'Inter', sans-serif",
  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
  border: '1px solid rgba(0,0,0,0.1)', borderRadius: 14,
  boxShadow: '0 8px 32px rgba(0,0,0,0.15)', color: '#1f2937',
};
const inputStyle = {
  width: '100%', padding: '9px 12px', fontSize: 13, borderRadius: 8,
  border: '1px solid rgba(0,0,0,0.15)', background: 'rgba(0,0,0,0.02)',
  color: '#1f2937', outline: 'none', fontFamily: "'Inter', sans-serif",
};
const btnPrimary = (active) => ({
  padding: '8px 14px', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer',
  borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6,
  background: active ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(0,0,0,0.05)',
  color: active ? '#fff' : '#4b5563', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
});

/* ─── Nominatim geocode helper ─── */
async function searchPlaces(query) {
  if (!query || query.length < 3) return [];
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`);
  return res.ok ? res.json() : [];
}

/* ─── OSRM route helper with multiple modes ─── */
async function getRoute(startLat, startLng, endLat, endLng, mode = 'car') {
  // Use specialized OpenStreetMap routing instances for different modes
  const profileMap = {
    car: 'routed-car',
    bike: 'routed-bike',
    walk: 'routed-foot',
    train: 'routed-car' // Fallback for transit as OSRM doesn't support it
  };
  const subdomain = profileMap[mode] || 'routed-car';
  
  const url = `https://routing.openstreetmap.de/${subdomain}/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.routes && data.routes.length > 0) return data.routes[0];
  } catch (err) {
    console.error('Route fetch error:', err);
  }
  return null;
}

export default function MapView({ height = 400, center = DEFAULT_CENTER, alerts = [], onLocationSelect = null, selectedPosition = null }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const tileRef = useRef(null);
  const labelsRef = useRef(null);
  const markersRef = useRef([]);
  const selectedMarkerRef = useRef(null);
  const searchMarkerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const routeMarkersRef = useRef([]);

  const [mapReady, setMapReady] = useState(false);
  const [activeLayer, setActiveLayer] = useState('default');

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Directions state
  const [dirOpen, setDirOpen] = useState(false);
  const [dirFrom, setDirFrom] = useState('');
  const [dirTo, setDirTo] = useState('');
  const [dirLoading, setDirLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [travelMode, setTravelMode] = useState('car'); // car, bike, walk, train

  const searchTimer = useRef(null);

  /* ─── Map init ─── */
  useEffect(() => {
    if (!mapContainerRef.current || !window.L || mapRef.current) return;
    const map = window.L.map(mapContainerRef.current, { center: [center.lat, center.lng], zoom: 5, zoomControl: true, attributionControl: true });
    const cfg = TILE_LAYERS.default;
    tileRef.current = window.L.tileLayer(cfg.url, { attribution: cfg.attribution, ...cfg.options }).addTo(map);
    if (onLocationSelect) map.on('click', (e) => onLocationSelect(e.latlng.lat, e.latlng.lng));
    mapRef.current = map;
    setMapReady(true);
    return () => { map.remove(); mapRef.current = null; tileRef.current = null; setMapReady(false); };
  }, []);

  /* ─── Tile layer switch ─── */
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    // Remove current tile + labels layers
    if (tileRef.current) mapRef.current.removeLayer(tileRef.current);
    if (labelsRef.current) { mapRef.current.removeLayer(labelsRef.current); labelsRef.current = null; }
    // Add new base tile layer
    const cfg = TILE_LAYERS[activeLayer];
    tileRef.current = window.L.tileLayer(cfg.url, { attribution: cfg.attribution, ...cfg.options }).addTo(mapRef.current);
    // Add labels overlay for satellite view (imagery has no labels by default)
    if (cfg.labelsUrl) {
      labelsRef.current = window.L.tileLayer(cfg.labelsUrl, { attribution: '', ...cfg.labelsOptions }).addTo(mapRef.current);
    }
  }, [activeLayer, mapReady]);

  /* ─── Center update ─── */
  useEffect(() => { if (mapRef.current) mapRef.current.setView([center.lat, center.lng], mapRef.current.getZoom()); }, [center.lat, center.lng]);

  /* ─── Alert markers ─── */
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const map = mapRef.current;
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];
    if (!alerts || !alerts.length) return;
    const bounds = [];
    alerts.forEach(alert => {
      const coords = alert.coordinates || alert.location?.coordinates;
      if (!coords || coords.length < 2) return;
      const [lng, lat] = coords;
      const col = SEVERITY_COLORS[alert.severity] || '#9b59b6';
      const m = window.L.circleMarker([lat, lng], { radius: 10, fillColor: col, fillOpacity: 0.9, color: '#fff', weight: 2 }).addTo(map);
      m.bindPopup(`<div style="min-width:180px;font-family:Inter,sans-serif"><h3 style="margin:0 0 4px;font-size:14px;font-weight:700;color:#1a1a2e">${alert.title||'Untitled'}</h3><p style="margin:0 0 6px;font-size:12px;color:#555">${alert.description||alert.address||'No description'}</p><div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700"><span style="color:${col};text-transform:uppercase">${alert.severity||'Unknown'}</span><span style="background:#f0f0f0;padding:2px 6px;border-radius:4px;color:#333">${alert.status||'Unknown'}</span></div></div>`, { maxWidth: 260 });
      markersRef.current.push(m);
      bounds.push([lat, lng]);
    });
    if (bounds.length) map.fitBounds(window.L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 14 });
  }, [alerts, mapReady]);

  /* ─── Selected position marker ─── */
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const map = mapRef.current;
    if (selectedMarkerRef.current) { map.removeLayer(selectedMarkerRef.current); selectedMarkerRef.current = null; }
    if (!selectedPosition) return;
    const icon = window.L.divIcon({ className: '', html: '<div style="width:28px;height:28px;background:#e74c3c;border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>', iconSize: [28, 28], iconAnchor: [14, 28] });
    const m = window.L.marker([selectedPosition.lat, selectedPosition.lng], { icon, draggable: !!onLocationSelect }).addTo(map);
    m.bindPopup('📍 Selected Location').openPopup();
    if (onLocationSelect) m.on('dragend', e => { const p = e.target.getLatLng(); onLocationSelect(p.lat, p.lng); });
    selectedMarkerRef.current = m;
    map.setView([selectedPosition.lat, selectedPosition.lng], Math.max(map.getZoom(), 13));
  }, [selectedPosition, mapReady, onLocationSelect]);

  /* ─── Search handler with debounce ─── */
  const handleSearchInput = useCallback((val) => {
    setSearchQuery(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (val.length < 3) { setSearchResults([]); return; }
    setSearching(true);
    searchTimer.current = setTimeout(async () => {
      const results = await searchPlaces(val);
      setSearchResults(results);
      setSearching(false);
    }, 400);
  }, []);

  const handleSearchSelect = useCallback((place) => {
    if (!mapRef.current) return;
    const lat = parseFloat(place.lat), lng = parseFloat(place.lon);
    mapRef.current.setView([lat, lng], 15);
    if (searchMarkerRef.current) mapRef.current.removeLayer(searchMarkerRef.current);
    const icon = window.L.divIcon({ className: '', html: '<div style="width:24px;height:24px;background:#6366f1;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 10px rgba(99,102,241,0.5)"></div>', iconSize: [24, 24], iconAnchor: [12, 12] });
    searchMarkerRef.current = window.L.marker([lat, lng], { icon }).addTo(mapRef.current);
    searchMarkerRef.current.bindPopup(`<b style="font-family:Inter,sans-serif;font-size:13px">${place.display_name}</b>`).openPopup();
    setSearchQuery(place.display_name);
    setSearchResults([]);
    if (onLocationSelect) onLocationSelect(lat, lng);
  }, [onLocationSelect]);

  /* ─── Directions handler ─── */
  const handleGetDirections = useCallback(async () => {
    if (!mapRef.current || !dirFrom.trim() || !dirTo.trim()) return;
    setDirLoading(true);
    setRouteInfo(null);
    clearRoute();
    try {
      const [fromPlaces, toPlaces] = await Promise.all([searchPlaces(dirFrom), searchPlaces(dirTo)]);
      if (!fromPlaces.length || !toPlaces.length) { setDirLoading(false); return; }
      const from = fromPlaces[0], to = toPlaces[0];
      const fLat = parseFloat(from.lat), fLng = parseFloat(from.lon);
      const tLat = parseFloat(to.lat), tLng = parseFloat(to.lon);
      const route = await getRoute(fLat, fLng, tLat, tLng, travelMode);
      if (!route) { setDirLoading(false); return; }

      // Draw route polyline
      const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
      routeLayerRef.current = window.L.polyline(coords, { color: '#6366f1', weight: 5, opacity: 0.85, dashArray: null }).addTo(mapRef.current);

      // Start marker (green)
      const startIcon = window.L.divIcon({ className: '', html: '<div style="width:18px;height:18px;background:#10b981;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(16,185,129,0.5)"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });
      const endIcon = window.L.divIcon({ className: '', html: '<div style="width:18px;height:18px;background:#ef4444;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(239,68,68,0.5)"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });
      const sm = window.L.marker([fLat, fLng], { icon: startIcon }).addTo(mapRef.current).bindPopup(`<b style="font-family:Inter,sans-serif;color:#10b981">Start:</b> ${from.display_name}`);
      const em = window.L.marker([tLat, tLng], { icon: endIcon }).addTo(mapRef.current).bindPopup(`<b style="font-family:Inter,sans-serif;color:#ef4444">End:</b> ${to.display_name}`);
      routeMarkersRef.current = [sm, em];

      mapRef.current.fitBounds(routeLayerRef.current.getBounds(), { padding: [50, 50] });

      const distKm = (route.distance / 1000).toFixed(1);
      const durMin = Math.round(route.duration / 60);
      const hours = Math.floor(durMin / 60);
      const mins = durMin % 60;
      
      // Extract turn-by-turn steps
      const steps = [];
      if (route.legs && route.legs[0].steps) {
        route.legs[0].steps.forEach(step => {
          if (step.maneuver && step.maneuver.instruction) {
            steps.push({
              instruction: step.maneuver.instruction,
              distance: step.distance > 1000 ? `${(step.distance/1000).toFixed(1)} km` : `${Math.round(step.distance)} m`
            });
          }
        });
      }

      setRouteInfo({ 
        distance: `${distKm} km`, 
        duration: hours > 0 ? `${hours}h ${mins}m` : `${mins} min`,
        steps: steps
      });
    } catch (err) { console.error('Directions error:', err); }
    setDirLoading(false);
  }, [dirFrom, dirTo]);

  const clearRoute = useCallback(() => {
    if (!mapRef.current) return;
    if (routeLayerRef.current) { mapRef.current.removeLayer(routeLayerRef.current); routeLayerRef.current = null; }
    routeMarkersRef.current.forEach(m => mapRef.current.removeLayer(m));
    routeMarkersRef.current = [];
    setRouteInfo(null);
  }, []);

  if (!window.L) {
    return (
      <div className="overflow-hidden relative rounded-2xl border border-gray-200" style={{ height, background: '#1a1a2e' }}>
        <div className="h-full flex flex-col items-center justify-center text-red-400 p-5 text-center text-sm">
          <span className="text-3xl mb-2">⚠️</span><p className="font-semibold">Map library not loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative rounded-2xl border border-gray-200" style={{ height, background: '#f8f9fa' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* ── Toolbar: Search + Directions buttons ── */}
      <div style={{ ...panelStyle, top: 12, right: 12, display: 'flex', gap: 6, padding: 6, background: 'rgba(255,255,255,0.9)' }}>
        <button type="button" onClick={() => { setSearchOpen(s => !s); setDirOpen(false); }} style={{...btnPrimary(searchOpen), color: searchOpen ? '#fff' : '#4b5563'}} title="Search location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Search
        </button>
        <button type="button" onClick={() => { setDirOpen(d => !d); setSearchOpen(false); }} style={btnPrimary(dirOpen)} title="Get directions">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>Directions
        </button>
      </div>

      {/* ── Search Panel ── */}
      {searchOpen && (
        <div style={{ ...panelStyle, top: 56, right: 12, width: 300, padding: 12 }}>
          <input style={inputStyle} placeholder="Search a location…" value={searchQuery}
            onChange={e => handleSearchInput(e.target.value)} autoFocus />
          {searching && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '6px 0 0' }}>Searching…</p>}
          {searchResults.length > 0 && (
            <div style={{ maxHeight: 200, overflowY: 'auto', marginTop: 8 }}>
              {searchResults.map((p, i) => (
                <div key={i} onClick={() => handleSearchSelect(p)} style={{ padding: '8px 10px', fontSize: 12, cursor: 'pointer', borderRadius: 6, borderBottom: '1px solid rgba(0,0,0,0.06)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontWeight: 600 }}>{p.display_name.split(',')[0]}</span>
                  <span style={{ color: 'rgba(0,0,0,0.5)', display: 'block', fontSize: 11, marginTop: 2 }}>{p.display_name.split(',').slice(1, 3).join(',')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Directions Panel ── */}
      {dirOpen && (
        <div style={{ ...panelStyle, top: 56, right: 12, width: 320, padding: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Mode Selector */}
            <div style={{ display: 'flex', gap: 4, padding: 4, background: 'rgba(0,0,0,0.04)', borderRadius: 10 }}>
              {[
                { id: 'car', icon: '🚗', label: 'Car' },
                { id: 'bike', icon: '🚲', label: 'Bike' },
                { id: 'walk', icon: '🚶', label: 'Walk' },
                { id: 'train', icon: '🚆', label: 'Train' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTravelMode(m.id)}
                  style={{
                    flex: 1, padding: '6px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
                    fontSize: 14, transition: 'all 0.2s',
                    background: travelMode === m.id ? '#6366f1' : 'transparent',
                    color: travelMode === m.id ? '#fff' : '#6b7280',
                    boxShadow: travelMode === m.id ? '0 2px 8px rgba(99,102,241,0.3)' : 'none'
                  }}
                  title={m.label}
                >
                  {m.icon}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
              <input style={inputStyle} placeholder="Start location" value={dirFrom} onChange={e => setDirFrom(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
              <input style={inputStyle} placeholder="Destination" value={dirTo} onChange={e => setDirTo(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button type="button" onClick={handleGetDirections} disabled={dirLoading} style={{ ...btnPrimary(true), flex: 1, justifyContent: 'center', opacity: dirLoading ? 0.6 : 1 }}>
                {dirLoading ? 'Finding best route…' : `🧭 Get ${travelMode.charAt(0).toUpperCase() + travelMode.slice(1)} Route`}
              </button>
              {(routeInfo || dirFrom || dirTo) && (
                <button type="button" onClick={() => { clearRoute(); setDirFrom(''); setDirTo(''); }} style={{ ...btnPrimary(false), background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>✕</button>
              )}
            </div>
          </div>
          {routeInfo && (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: '12px', background: 'rgba(99,102,241,0.08)', borderRadius: 10, display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#4f46e5' }}>{routeInfo.distance}</div>
                  <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Distance</div>
                </div>
                <div style={{ width: 1, background: 'rgba(0,0,0,0.08)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#4f46e5' }}>{routeInfo.duration}</div>
                  <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Duration</div>
                </div>
              </div>
              
              {/* Turn-by-Turn Steps */}
              {routeInfo.steps && routeInfo.steps.length > 0 && (
                <div style={{ maxHeight: 200, overflowY: 'auto', padding: '10px 4px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#9ca3af', marginBottom: 8, paddingLeft: 8 }}>Navigation Steps</h4>
                  {routeInfo.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px', borderBottom: '1px solid rgba(0,0,0,0.03)', alignItems: 'start' }}>
                      <div style={{ fontSize: 12, color: '#6366f1', marginTop: 2 }}>•</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.4 }}>{step.instruction}</div>
                        <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>{step.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Layer Toggle ── */}
      <div style={{ position: 'absolute', bottom: 24, right: 16, zIndex: 1000, display: 'flex', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.15)' }}>
        {[{ key: 'default', label: 'Default', grad: '#6366f1,#8b5cf6', icon: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></> },
          { key: 'satellite', label: 'Satellite', grad: '#10b981,#059669', icon: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> }
        ].map(l => (
          <button key={l.key} type="button" onClick={() => setActiveLayer(l.key)} style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, fontFamily: "'Inter',sans-serif", border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s', background: activeLayer === l.key ? `linear-gradient(135deg,${l.grad})` : 'rgba(255,255,255,0.85)', color: activeLayer === l.key ? '#fff' : '#4b5563', backdropFilter: 'blur(12px)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{l.icon}</svg>{l.label}
          </button>
        ))}
      </div>
    </div>
  );
}