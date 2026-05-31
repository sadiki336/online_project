import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Plus, Search, MoreHorizontal, MessageSquare, Paperclip, Clock, Wifi, WifiOff } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/apiAxios';

// Create websocket pipeline to server port 5000
const socket = io('http://localhost:5000');

export default function Board() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [searchQuery, setSearchQuery] = useState('');
  const [columns, setColumns] = useState({});

  useEffect(() => {
    // 1. Initial REST Sync load
    const loadBoardData = async () => {
      try {
        const res = await api.get('/tasks');
        setColumns(res.data);
      } catch (err) {
        toast.error('Failed to load tasks from database.');
      }
    };
    loadBoardData();

    // 2. Real-time dynamic network events
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    socket.on('boardUpdated', (updatedColumns) => {
      setColumns(updatedColumns);
      toast('Board state synced via server', { icon: '⚡' });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('boardUpdated');
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workspace Task Engine</h1>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            {isConnected ? (
              <span className="inline-flex items-center text-emerald-600 gap-1"><Wifi className="h-3 w-3" /> Sync Connected</span>
            ) : (
              <span className="inline-flex items-center text-rose-600 gap-1"><WifiOff className="h-3 w-3" /> Disconnected</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.values(columns).map((col) => (
          <div key={col.id} className="bg-slate-100 rounded-xl p-4 min-h-[500px]">
            <h2 className="font-semibold mb-4 text-slate-700">{col.title}</h2>
            <div className="space-y-3">
              {col.tasks?.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-lg shadow-xs border border-slate-200">
                  <h3 className="font-medium text-sm text-slate-900">{task.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}