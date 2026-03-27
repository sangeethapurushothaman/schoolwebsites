import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '',
    previousSchool: '',
    parentName: '',
    message: ''
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3000/api/apply', formData);
    if (response.status === 201) {
      alert("விண்ணப்பம் சமர்ப்பிக்கப்பட்டது!");
      navigate('/');
    }
  } catch (error) {
    console.error("பிழை:", error);
    alert("சமர்ப்பிப்பதில் தோல்வி!");
  }
};

  return (
    <div className="min-h-screen bg-stone-50 pb-20 px-6 pt-32"> {/* pt-32 ensures space for your Header */}
      <div className="max-w-2xl mx-auto relative">
        
        {/* --- Back to Home Button --- */}
        <button 
          onClick={() => navigate('/')} 
          className="relative z-50 flex items-center gap-2 text-[#1a2e4c] font-bold mb-8 hover:text-[#d4a34d] transition-all duration-300 group bg-white/50 py-2 px-4 rounded-full shadow-sm"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest">Back to Home</span>
        </button>

        {/* --- Main Form Card --- */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-100">
          
          {/* Progress Header */}
          <div className="bg-[#1a2e4c] p-8 text-white">
            <h2 className="text-2xl font-serif mb-6 tracking-tight">Student Application</h2>
            <div className="flex items-center justify-between max-w-xs">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 ${
                    step >= num ? "bg-[#d4a34d] border-[#d4a34d] text-[#1a2e4c]" : "border-gray-500 text-gray-400"
                  }`}>
                    {step > num ? <CheckCircle size={20} /> : num}
                  </div>
                  {num < 3 && (
                    <div className={`h-[2px] w-12 mx-2 rounded ${step > num ? "bg-[#d4a34d]" : "bg-gray-700"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="border-b border-stone-100 pb-2">
                    <h3 className="text-xl font-bold text-[#1a2e4c]">Personal Details</h3>
                    <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Step 1 of 3</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-xs font-bold uppercase text-stone-500 mb-2">First Name</label>
                      <input name="firstName" onChange={handleChange} value={formData.firstName} className="border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-[#d4a34d] focus:border-transparent outline-none transition-all" placeholder="Enter first name" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-bold uppercase text-stone-500 mb-2">Last Name</label>
                      <input name="lastName" onChange={handleChange} value={formData.lastName} className="border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-[#d4a34d] focus:border-transparent outline-none transition-all" placeholder="Enter last name" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase text-stone-500 mb-2">Email Address</label>
                    <input name="email" type="email" onChange={handleChange} value={formData.email} className="border border-stone-200 p-3 rounded-lg focus:ring-2 focus:ring-[#d4a34d] focus:border-transparent outline-none transition-all" placeholder="email@example.com" />
                  </div>

                  <button onClick={nextStep} className="w-full bg-[#1a2e4c] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#253f66] shadow-lg transition-all active:scale-[0.98]">
                    Next Step <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Academic Info */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="border-b border-stone-100 pb-2">
                    <h3 className="text-xl font-bold text-[#1a2e4c]">Academic History</h3>
                    <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Step 2 of 3</p>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase text-stone-500 mb-2">Applying for Grade</label>
                    <select name="grade" onChange={handleChange} value={formData.grade} className="border border-stone-200 p-3 rounded-lg outline-none bg-white cursor-pointer focus:ring-2 focus:ring-[#d4a34d]">
                      <option value="">Select Grade Level</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase text-stone-500 mb-2">Previous School Name</label>
                    <input name="previousSchool" onChange={handleChange} value={formData.previousSchool} className="border border-stone-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#d4a34d]" placeholder="Name of institution" />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={prevStep} className="flex-1 border border-stone-200 py-4 rounded-lg font-bold text-stone-600 flex items-center justify-center gap-2 hover:bg-stone-50 transition-all">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button onClick={nextStep} className="flex-1 bg-[#1a2e4c] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#253f66] shadow-lg transition-all">
                      Continue <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#1a2e4c] mb-3">Ready to Join?</h3>
                  <p className="text-stone-500 mb-10 leading-relaxed max-w-sm mx-auto">
                    Please review your details. Once submitted, our admissions office will review your application and reach out within 48 hours.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={prevStep} className="flex-1 border border-stone-200 py-4 rounded-lg font-bold text-stone-600 hover:bg-stone-50 transition-all">
                      Review Details
                    </button>
                    <button 
                      onClick={handleSubmit}
                      className="flex-1 bg-[#d4a34d] text-[#1a2e4c] py-4 rounded-lg font-extrabold shadow-[0_5px_0_rgb(163,123,56)] hover:translate-y-[2px] hover:shadow-[0_3px_0_rgb(163,123,56)] active:translate-y-[5px] active:shadow-none transition-all"
                    >
                      SUBMIT APPLICATION
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;