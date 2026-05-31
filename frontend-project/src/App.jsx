import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Page Imports
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import Task from './pages/Task';
import Report from './pages/Report';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import Navbar from './pages/Navbar';

// Layout Wrapper to automatically persist the Navbar across authenticated app screens
function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="animate-in fade-in duration-200">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Real-time Action Flash Notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          className: 'text-sm font-medium text-slate-800 border border-slate-100 bg-white shadow-md rounded-xl',
          duration: 3500 
        }} 
      />
      
      <Routes>
        {/* Public Authentication Channels */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />

        {/* Protected Production Workspaces */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* Automatic Root Node Redirection */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/board" element={<Board />} />
            <Route path="/task/:id" element={<Task />} />
            <Route path="/report" element={<Report />} />
          </Route>
        </Route>

        {/* Global Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}