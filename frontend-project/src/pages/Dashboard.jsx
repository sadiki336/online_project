import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckCircle2, ListTodo, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-lg text-indigo-600">
          <LayoutDashboard className="h-5 w-5" /> RealTask Workspace
        </div>
        <button onClick={handleLogout} className="text-sm font-medium text-slate-600 hover:text-rose-600 flex items-center gap-1.5">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="text-slate-500 mt-1">Here is a quick snapshot of your sprint status.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-500 transition-all" onClick={() => navigate('/board')}>
            <ListTodo className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg">Sprint Boards</h3>
            <p className="text-xs text-slate-500 mt-1">Access interactive task streams and move tasks.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-500 transition-all" onClick={() => navigate('/report')}>
            <CheckCircle2 className="h-8 w-8 text-emerald-600 mb-3" />
            <h3 className="font-semibold text-lg">Velocity Report</h3>
            <p className="text-xs text-slate-500 mt-1">Review sprint distributions and performance graphs.</p>
          </div>
        </div>
      </main>
    </div>
  );
}