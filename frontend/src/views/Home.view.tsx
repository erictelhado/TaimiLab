import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { User, BarChart3, LogOut, ArrowRight } from 'lucide-react';

export function HomeView() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/dashboard');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Bem-vindo, <span className="text-blue-600">{user?.name || user?.email}</span>!
            </h1>
            <p className="text-xl text-gray-600">
              Gerencie seus projetos e explore todas as funcionalidades
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center mb-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer max-w-xs" onClick={handleProfile}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Perfil</h3>
                <p className="text-sm text-gray-600">Gerencie suas informações</p>
                <ArrowRight className="w-4 h-4 mx-auto mt-2 text-gray-400" />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Login realizado</p>
                      <p className="text-xs text-gray-500">Há alguns minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Perfil atualizado</p>
                      <p className="text-xs text-gray-500">Ontem</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Novo projeto criado</p>
                      <p className="text-xs text-gray-500">2 dias atrás</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Informações da Conta</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <p className="text-lg text-gray-900">
                    {user?.name || 'Não informado'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-lg text-gray-900">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID do Usuário
                  </label>
                  <p className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                    {user?.id}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 flex space-x-3">
                  <Button
                    onClick={handleProfile}
                    className="flex-1"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Ver Perfil
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="flex-1"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}