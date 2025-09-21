import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export function HomeView() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
          <span className="text-blue-600">TaimiLab</span>
        </h1>
        
        {isAuthenticated ? (
          <div className="space-y-6">
            <p className="text-2xl text-gray-700">
              Olá, <span className="font-semibold text-blue-600">{user?.name || user?.email}</span>!
            </p>
            <p className="text-lg text-gray-600">
              Você está logado com sucesso.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xl text-gray-600 mb-8">
              Faça login para acessar o sistema
            </p>
            <Button
              onClick={handleLogin}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Logar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}