import React, { useState, useEffect } from 'react';
import { Search, Plus, MapPin, Heart, Info, Filter, X, Upload, Camera } from 'lucide-react';
import { ngoAPI } from '../../../services/api';
import toast from 'react-hot-toast';

export default function NGOAdoptionAnimal() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', type: 'Dog', breed: '', age: '', location: '', description: '', imageUrl: ''
  });

  const fetchAnimals = async () => {
    try {
      const { data } = await ngoAPI.getAnimals();
      if (data.success) setAnimals(data.animals);
    } catch (error) {
      toast.error('Failed to fetch animals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleAddAnimal = async (e) => {
    e.preventDefault();
    try {
      const { data } = await ngoAPI.createAnimal(formData);
      if (data.success) {
        toast.success('Animal added successfully!');
        setShowAddModal(false);
        setFormData({ name: '', type: 'Dog', breed: '', age: '', location: '', description: '', imageUrl: '' });
        fetchAnimals();
      }
    } catch (error) {
      toast.error('Failed to add animal');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await ngoAPI.updateAnimal(id, { status });
      if (data.success) {
        toast.success(`Status updated to ${status}`);
        fetchAnimals();
        if (selectedAnimal?._id === id) setSelectedAnimal(data.animal);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredAnimals = animals.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                         a.breed.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Animal Adoption</h1>
          <p className="text-gray-500">Manage animals looking for a forever home</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search animals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-[300px] text-black"
            />
          </div>
          <div className="relative">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none appearance-none pr-10"
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Adopted">Adopted</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#4CAF50] hover:bg-[#43A047] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-100"
          >
            <Plus size={20} />
            Add Animal
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAnimals.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="text-gray-400 font-medium mb-2">No animals found</div>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
          {filteredAnimals.map((animal) => (
            <div key={animal._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                {animal.imageUrl ? (
                  <img src={animal.imageUrl} alt={animal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Camera size={48} />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    animal.status === 'Available' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' :
                    animal.status === 'Adopted' ? 'bg-blue-500 text-white shadow-lg shadow-blue-100' :
                    'bg-amber-500 text-white shadow-lg shadow-amber-100'
                  }`}>
                    {animal.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{animal.name}</h3>
                    <div className="text-sm font-bold text-emerald-600 uppercase tracking-tighter mt-1">{animal.breed || animal.type}</div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <MapPin size={16} />
                    <span className="text-xs font-bold">{animal.location || 'Not Specified'}</span>
                  </div>
                </div>
                
                <div className="flex gap-4 mb-6 pt-6 border-t border-gray-50">
                  <div className="flex-1 text-center">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Age</div>
                    <div className="text-sm font-bold text-gray-700">{animal.age || '—'}</div>
                  </div>
                  <div className="w-[1px] bg-gray-100"></div>
                  <div className="flex-1 text-center">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</div>
                    <div className="text-sm font-bold text-gray-700">{animal.type}</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => { setSelectedAnimal(animal); setShowDetailsModal(true); }}
                    className="flex-1 bg-emerald-50 text-emerald-600 py-3 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Info size={18} />
                    Details
                  </button>
                  <button className="w-12 h-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Animal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Add New Animal</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAnimal} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Name</label>
                  <input required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-black" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Buddy" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Type</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-black"
                    value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>Dog</option><option>Cat</option><option>Cow</option><option>Bird</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Breed</label>
                  <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-black" 
                    value={formData.breed} onChange={(e) => setFormData({...formData, breed: e.target.value})} placeholder="Labrador" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Age</label>
                  <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-black" 
                    value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} placeholder="2 years" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Location</label>
                <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-black" 
                  value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Delhi Shelter" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                <div className="flex gap-2">
                  <input className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-black" 
                    value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
                  <button type="button" className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-emerald-500 transition-all">
                    <Upload size={18} />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                <textarea className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-black resize-none h-24" 
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Tell something about the animal..." />
              </div>
              <button type="submit" className="w-full py-4 bg-[#4CAF50] text-white font-bold rounded-2xl hover:bg-[#43A047] transition-all shadow-lg shadow-green-100 mt-4">
                Save Animal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Animal Details Modal */}
      {showDetailsModal && selectedAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="w-full md:w-1/2 h-80 md:h-auto relative">
              {selectedAnimal.imageUrl ? (
                <img src={selectedAnimal.imageUrl} alt={selectedAnimal.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                   <Camera size={64} />
                </div>
              )}
              <div className="absolute top-6 left-6">
                <button onClick={() => setShowDetailsModal(false)} className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-gray-800 hover:bg-white transition-all shadow-xl">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-10 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">{selectedAnimal.name}</h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest">
                    {selectedAnimal.breed || selectedAnimal.type}
                  </div>
                </div>
                <button className="p-4 bg-gray-50 text-gray-400 rounded-3xl hover:bg-red-50 hover:text-red-500 transition-all">
                  <Heart size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-3xl">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Age</div>
                  <div className="text-lg font-bold text-gray-800">{selectedAnimal.age || 'Unknown'}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-3xl">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-lg font-bold text-gray-800">{selectedAnimal.location || 'Shelter'}</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedAnimal.description || 'No description provided for this lovely animal. Contact us for more information.'}
                </p>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Update Status</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateStatus(selectedAnimal._id, 'Available')}
                    className={`flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${selectedAnimal.status === 'Available' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    Available
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedAnimal._id, 'Pending')}
                    className={`flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${selectedAnimal.status === 'Pending' ? 'bg-amber-500 text-white shadow-lg shadow-amber-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedAnimal._id, 'Adopted')}
                    className={`flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${selectedAnimal.status === 'Adopted' ? 'bg-blue-500 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    Adopted
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
