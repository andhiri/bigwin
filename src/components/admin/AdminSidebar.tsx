import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Clock, CheckCircle, XCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Clock, label: 'Pending Orders', path: '/admin/pending' },
    { icon: CheckCircle, label: 'Approved Entries', path: '/admin/approved' },
    { icon: XCircle, label: 'Rejected Entries', path: '/admin/rejected' },
  ];

  const handleLogout = () => {
    logout();
    navigate('https://calm-dodol-ce1871.netlify.app/admin/login');
  };

  return (
    <div className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800">BIGWIN.MV</h2>
        <p className="text-sm text-gray-500">Administration</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors ${
                  isActive ? 'bg-purple-50 text-purple-600 border-r-4 border-purple-600' : ''
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}