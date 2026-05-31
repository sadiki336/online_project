import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ArrowLeft } from 'lucide-react';

export default function Report() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" /> Exit Reports
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-indigo-600 h-6 w-6" />
          <h2 className="text-xl font-bold">System Metrics Overview</h2>
        </div>
        <p className="text-sm text-slate-500">Track and optimize development velocities, cycle times, and task completion metrics across deployment pipelines.</p>
      </div>
    </div>
  );
}