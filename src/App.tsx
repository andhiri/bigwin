import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Packages } from './components/Packages';
import { Prize } from './components/Prize';
import { Checkout } from './components/Checkout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { PendingOrdersPage } from './pages/admin/PendingOrdersPage';
import { ApprovedEntriesPage } from './pages/admin/ApprovedEntriesPage';
import { RejectedEntriesPage } from './pages/admin/RejectedEntriesPage';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Prize />
      <Packages />
    </div>
  );
}

function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Checkout />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout><PendingOrdersPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/pending" element={<ProtectedRoute><AdminLayout><PendingOrdersPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/approved" element={<ProtectedRoute><AdminLayout><ApprovedEntriesPage /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/rejected" element={<ProtectedRoute><AdminLayout><RejectedEntriesPage /></AdminLayout></ProtectedRoute>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}