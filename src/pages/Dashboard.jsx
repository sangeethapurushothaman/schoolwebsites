import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  RefreshCw, 
  Download, 
  Filter, 
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  GraduationCap,
  X,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all'); // all, today, week, custom
  const [customDate, setCustomDate] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/students/${id}/status`, { status: newStatus });
      fetchStudents(); // Refresh data
      if (selectedStudent && selectedStudent._id === id) {
        setSelectedStudent({ ...selectedStudent, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const exportToCSV = () => {
    if (students.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "First Name", "Last Name", "Email", "Phone", "Grade", 
      "Previous School", "Parent Name", "Submitted At", "Status", "Message"
    ];

    const rows = students.map(student => [
      student.firstName,
      student.lastName,
      student.email,
      student.phone || "",
      student.grade,
      student.previousSchool || "",
      student.parentName || "",
      new Date(student.submittedAt).toLocaleString(),
      student.status || "Pending",
      `"${(student.message || "").replace(/"/g, '""')}"` // Escape quotes in message
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `student_admissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, customDate]);

  const allFilteredStudents = students.filter(student => {
    const studentDate = new Date(student.submittedAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = studentDate >= today;
    } else if (dateFilter === 'week') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      matchesDate = studentDate >= lastWeek;
    } else if (dateFilter === 'custom' && customDate) {
      const selectedDate = new Date(customDate);
      matchesDate = 
        studentDate.getFullYear() === selectedDate.getFullYear() &&
        studentDate.getMonth() === selectedDate.getMonth() &&
        studentDate.getDate() === selectedDate.getDate();
    }

    const matchesSearch = 
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDate && matchesSearch;
  });

  const totalPages = Math.ceil(allFilteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = allFilteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-500 hover:text-[#1a2e4c] transition-colors mb-2"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
            <h1 className="text-3xl font-serif font-bold text-[#1a2e4c]">Admissions Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage and review all student applications</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchStudents}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#1a2e4c] text-white rounded-lg font-bold text-sm hover:bg-[#253f66] transition-all shadow-md"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Users size={24} />
              </div>
              <span className="text-green-500 text-sm font-bold">+12%</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">Total Applications</h3>
            <p className="text-3xl font-bold text-slate-900 mt-1">{students.length}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <GraduationCap size={24} />
              </div>
              <span className="text-slate-400 text-sm font-medium">This Week</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">Pending Review</h3>
            <p className="text-3xl font-bold text-slate-900 mt-1">{students.filter(s => (s.status || 'Pending') === 'Pending').length}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Calendar size={24} />
              </div>
              <span className="text-emerald-500 text-sm font-bold">New</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">Latest Submission</h3>
            <p className="text-lg font-bold text-slate-900 mt-1 truncate">
              {students.length > 0 ? formatDate(students[0].submittedAt) : 'No data'}
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Filters Bar */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, email or grade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Date Filter Dropdown */}
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
                <Calendar size={16} className="text-slate-400" />
                <select 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="custom">Specific Date</option>
                </select>
              </div>

              {/* Custom Date Picker - only shows if 'custom' is selected */}
              {dateFilter === 'custom' && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm"
                >
                  <input 
                    type="date" 
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                  />
                </motion.div>
              )}

              <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>

              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
                <Filter size={16} />
                More Filters
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4 border-b border-slate-100">Student Name</th>
                  <th className="px-6 py-4 border-b border-slate-100">Grade</th>
                  <th className="px-6 py-4 border-b border-slate-100">Contact Info</th>
                  <th className="px-6 py-4 border-b border-slate-100">Submitted Date</th>
                  <th className="px-6 py-4 border-b border-slate-100">Status</th>
                  <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                      <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
                      Loading submissions...
                    </td>
                  </tr>
                ) : paginatedStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                      No matching applications found.
                    </td>
                  </tr>
                ) : (
                  paginatedStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{student.firstName} {student.lastName}</div>
                        <div className="text-xs text-slate-400">{student.previousSchool || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold ring-1 ring-inset ring-blue-700/10">
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Mail size={12} className="text-slate-400" />
                            {student.email}
                          </div>
                          {student.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              <Phone size={12} className="text-slate-400" />
                              {student.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(student.submittedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={student.status || 'Pending'} 
                          onChange={(e) => handleUpdateStatus(student._id, e.target.value)}
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset outline-none cursor-pointer transition-all ${
                            student.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10' :
                            student.status === 'Rejected' ? 'bg-rose-50 text-rose-700 ring-rose-600/10' :
                            student.status === 'Reviewed' ? 'bg-blue-50 text-blue-700 ring-blue-600/10' :
                            'bg-amber-50 text-amber-700 ring-amber-600/10'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => {
                            setSelectedStudent(student);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors opacity-0 group-hover:opacity-100"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allFilteredStudents.length)} of {allFilteredStudents.length} results</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-2">Page {currentPage} of {totalPages || 1}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="bg-[#1a2e4c] p-6 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-bold">Application Details</h2>
                  <p className="text-blue-200 text-xs mt-1">ID: {selectedStudent._id}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Student Information</h3>
                    <DetailItem label="Full Name" value={`${selectedStudent.firstName} ${selectedStudent.lastName}`} icon={<Users size={16} />} />
                    <DetailItem label="Email" value={selectedStudent.email} icon={<Mail size={16} />} />
                    <DetailItem label="Phone" value={selectedStudent.phone || 'N/A'} icon={<Phone size={16} />} />
                    <DetailItem label="Grade Applying" value={selectedStudent.grade} icon={<GraduationCap size={16} />} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Background</h3>
                    <DetailItem label="Previous School" value={selectedStudent.previousSchool || 'N/A'} icon={<GraduationCap size={16} />} />
                    <DetailItem label="Parent Name" value={selectedStudent.parentName || 'N/A'} icon={<Users size={16} />} />
                    <DetailItem label="Submitted At" value={formatDate(selectedStudent.submittedAt)} icon={<Calendar size={16} />} />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Message / Notes</h3>
                  <div className="bg-slate-50 p-4 rounded-xl text-slate-700 text-sm leading-relaxed border border-slate-100 italic">
                    "{selectedStudent.message || 'No additional message provided.'}"
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      selectedStudent.status === 'Accepted' ? 'bg-emerald-100 text-emerald-600' :
                      selectedStudent.status === 'Rejected' ? 'bg-rose-100 text-rose-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {selectedStudent.status === 'Accepted' ? <CheckCircle2 size={24} /> :
                       selectedStudent.status === 'Rejected' ? <AlertCircle size={24} /> :
                       <Clock size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Current Status</h4>
                      <p className="text-xs text-slate-500">Update application progress</p>
                    </div>
                  </div>
                  <select 
                    value={selectedStudent.status || 'Pending'} 
                    onChange={(e) => handleUpdateStatus(selectedStudent._id, e.target.value)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailItem = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-slate-400">{icon}</div>
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">{label}</div>
      <div className="text-sm font-semibold text-slate-700">{value}</div>
    </div>
  </div>
);

export default Dashboard;
