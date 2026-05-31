import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success('Registration successful! Please log in.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-center text-slate-900">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
            <input type="text" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-indigo-600" onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email</label>
            <input type="email" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-indigo-600" onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Password</label>
            <input type="password" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-indigo-600" onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-indigo-600 py-2 rounded-lg font-semibold text-sm text-white hover:bg-indigo-500 transition-colors">Sign Up</button>
        </form>
        <p className="text-xs text-slate-500 text-center mt-4">Have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link></p>
      </div>
    </div>
  );
}