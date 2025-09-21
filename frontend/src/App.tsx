import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginView, DashboardView, HomeView } from './views';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

function AppContent() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden antialiased">
      <Header />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={<HomeView />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App(): React.JSX.Element {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}