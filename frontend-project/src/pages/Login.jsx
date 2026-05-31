import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/apiAxios';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real application: const res = await api.post('/auth/login', form);
      // For now, we simulate a successful login:
      localStorage.setItem('token', 'mock_jwt_session_string');
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-center text-slate-900">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email</label>
            <input type="email" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-indigo-600" onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Password</label>
            <input type="password" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-indigo-600" onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-indigo-600 py-2 rounded-lg font-semibold text-sm text-white hover:bg-indigo-500 transition-colors">Enter Workspace</button>
        </form>
        <p className="text-xs text-slate-500 text-center mt-4">New here? <Link to="/register" className="text-indigo-600 hover:underline">Create an account</Link></p>
      </div>
    </div>
  );
}