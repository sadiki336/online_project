import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trello, 
  BarChart3, 
  LogOut, 
  Bell, 
  User 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to determine if a link node is active
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Signed out securely.');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1600px] px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand/Logo */}
          <div className="flex items-center gap-8">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 font-bold text-lg text-indigo-600 transition-transform hover:scale-[1.02]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
                <Trello className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="tracking-tight text-slate-900 font-black">RealTask</span>
            </Link>

            {/* Navigation Nodes Links */}
            <div className="hidden items-center gap-1 md:flex">
              <Link
                to="/dashboard"
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <Link
                to="/board"
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive('/board')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Trello className="h-4 w-4" />
                Task Board
              </Link>

              <Link
                to="/report"
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive('/report')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Metrics Report
              </Link>
            </div>
          </div>

          {/* Action Tools/Profile Elements */}
          <div className="flex items-center gap-4">
            
            {/* System Notification Bell */}
            <button className="relative rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white"></span>
              <Bell className="h-5 w-5" />
            </button>

            {/* Profile Context Dropdown UI Mock */}
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="hidden flex-col text-right sm:flex">
                <span className="text-xs font-bold text-slate-800">Alex Mercer</span>
                <span className="text-[10px] text-slate-400 font-medium">Lead Developer</span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 font-bold text-sm text-slate-700">
                <User className="h-4 w-4 text-slate-500" />
              </div>

              {/* Quick Session Drop/Logout */}
              <button 
                onClick={handleLogout}
                title="Sign Out"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}