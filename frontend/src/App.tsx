import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GW2Provider } from './contexts/GW2Context';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginView, DashboardView, HomeView, ProfileView } from './pages';
import { GW2Dashboard } from './pages/GW2/GW2Dashboard';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

function AppContent() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden antialiased">
      <Header />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route 
            path="/gw2" 
            element={
              <ProtectedRoute>
                <GW2Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomeView />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfileView />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
        <GW2Provider>
          <AppContent />
        </GW2Provider>
      </AuthProvider>
    </Router>
  );
}