import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, AlignLeft } from 'lucide-react';

export default function Task() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/board" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Task Board
      </Link>
      
      <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl shadow-sm">
        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Task Ref: {id}</span>
        <h1 className="text-xl font-bold text-slate-900 mt-2">Task Details View</h1>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-2.5 text-sm text-slate-600">
            <AlignLeft className="h-4 w-4 mt-0.5 text-slate-400" />
            <div>
              <h4 className="font-semibold text-slate-800">Scope Description</h4>
              <p className="text-xs text-slate-500 mt-0.5">Configure system routing configurations to match the API gateway architecture.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}