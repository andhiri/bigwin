import React from 'react';
import { Shield } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { GlobalSearchBar } from './GlobalSearchBar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-purple-600" />
              <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            </div>
            <GlobalSearchBar className="w-96" />
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}