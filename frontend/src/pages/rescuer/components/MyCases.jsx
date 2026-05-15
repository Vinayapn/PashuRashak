import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ExternalLink, RefreshCw } from 'lucide-react';
import { rescuerAPI } from '../../../services/api';
import toast from 'react-hot-toast';

const getUrgencyColor = (urgency) => {
  switch (urgency) {
    case 'High': case 'Critical': return 'text-red-500 bg-red-500';
    case 'Medium': return 'text-amber-500 bg-amber-500';
    case 'Low': return 'text-emerald-500 bg-emerald-500';
    default: return 'text-gray-500 bg-gray-500';
  }
};

const getStatusStyles = (status) => {
  switch (status) {
    case 'Pending': return 'bg-amber-100 text-amber-700';
    case 'InProgress': case 'In Progress': return 'bg-blue-100 text-blue-700';
    case 'Resolved': return 'bg-emerald-100 text-emerald-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function MyCases({ alerts, refresh }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const updateStatus = async (id, status) => {
    try {
      await rescuerAPI.updateAlertStatus(id, status);
      toast.success(`Status updated to ${status}`);
      refresh();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const safeAlerts = alerts || [];
  
  const filteredAlerts = safeAlerts.filter(c => 
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlerts = filteredAlerts.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Rescue Alerts</h1>
          <p className="text-gray-500">Manage and track all rescue operations</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={refresh}
            className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all shadow-sm"
          >
            <RefreshCw size={18} />
          </button>
          <div className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-12 pr-4 py-3 bg-white text-black border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none w-[300px]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Title & Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedAlerts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">No alerts found matching your search.</td>
                </tr>
              )}
              {paginatedAlerts.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{c.title}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">{new Date(c.createdAt).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">{c.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="max-w-[200px] truncate">{c.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getUrgencyColor(c.severity).split(' ')[1]}`}></span>
                      <span className={`text-sm font-bold ${getUrgencyColor(c.severity).split(' ')[0]}`}>{c.severity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      className="text-xs font-bold bg-gray-50 border border-gray-100 rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="text-sm text-gray-400 font-bold uppercase">
            Showing {filteredAlerts.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredAlerts.length)} of {filteredAlerts.length} Alerts
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold transition-all ${currentPage === 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
            >
              Previous
            </button>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold transition-all ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
