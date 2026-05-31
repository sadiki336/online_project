import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-4">
      <h1 className="text-5xl font-black text-slate-300">404</h1>
      <h2 className="text-lg font-bold text-slate-800 mt-2">Workspace Page Not Found</h2>
      <p className="text-xs text-slate-500 mt-1 max-w-xs">The route you requested does not exist or has been relocated to another workspace node.</p>
      <Link to="/dashboard" className="mt-4 inline-block bg-indigo-600 text-white font-semibold text-xs px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors">
        Return to Dashboard
      </Link>
    </div>
  );
}