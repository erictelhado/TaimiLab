import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, Clock, Shield, User, LogOut, Settings, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AuthService } from '../services/auth.service';
import { useAuth } from '../contexts/AuthContext';

export function DashboardView() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sessionInfo, setSessionInfo] = useState({
    isRememberMe: false,
    tokenExpiry: null as Date | null,
    sessionStatus: 'active' as 'active' | 'expiring' | 'expired'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateSessionInfo = () => {
      const info = AuthService.getSessionInfo();
      setSessionInfo(info);
    };

    updateSessionInfo();
    const interval = setInterval(updateSessionInfo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      AuthService.logout();
      
      // Show logout notification
      if ((window as any).addNotification) {
        (window as any).addNotification({
          type: 'info',
          title: 'Logout realizado',
          message: 'Você foi desconectado com sucesso.',
          duration: 2000
        });
      }
      
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshToken = () => {
    const newToken = AuthService.refreshToken();
    if (newToken) {
      if ((window as any).addNotification) {
        (window as any).addNotification({
          type: 'success',
          title: 'Token renovado',
          message: 'Sua sessão foi renovada com sucesso.',
          duration: 2000
        });
      }
      // Update session info
      const info = AuthService.getSessionInfo();
      setSessionInfo(info);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                  Bem-vindo ao seu painel de controle. Gerencie sua conta e configurações.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleRefreshToken}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>Renovar Sessão</span>
                </Button>
                <Button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isLoading ? 'Saindo...' : 'Sair'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Informações do Usuário</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">ID do Usuário</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                    {user?.id}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nome</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.name || 'Não informado'}</dd>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Informações da Sessão</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status da Sessão</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      sessionInfo.sessionStatus === 'active' ? 'bg-green-100 text-green-800' :
                      sessionInfo.sessionStatus === 'expiring' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      <Circle size={8} className="mr-2" />
                      {sessionInfo.sessionStatus === 'active' ? 'Sessão Ativa' :
                       sessionInfo.sessionStatus === 'expiring' ? 'Sessão Expirando' :
                       'Sessão Expirada'}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Lembrar de Mim</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {sessionInfo.isRememberMe ? 'Ativado' : 'Desativado'}
                  </dd>
                </div>
                {sessionInfo.tokenExpiry && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Token Expira em</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {sessionInfo.tokenExpiry.toLocaleString('pt-BR')}
                    </dd>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>Informações de Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-blue-700">Tipo de Armazenamento</dt>
                <dd className="mt-1 text-sm text-blue-600">
                  {sessionInfo.isRememberMe ? 'LocalStorage (Persistente)' : 'SessionStorage (Temporário)'}
                </dd>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-green-700">Refresh Automático</dt>
                <dd className="mt-1 text-sm text-green-600">Ativado (a cada 5 minutos)</dd>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-yellow-700">Timeout de Inatividade</dt>
                <dd className="mt-1 text-sm text-yellow-600">30 minutos</dd>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-red-700">Rate Limiting</dt>
                <dd className="mt-1 text-sm text-red-600">5 tentativas por 15 minutos</dd>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate('/profile')}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <User className="w-6 h-6" />
                <span>Perfil</span>
              </Button>
              <Button
                onClick={() => navigate('/settings')}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <Settings className="w-6 h-6" />
                <span>Configurações</span>
              </Button>
              <Button
                onClick={handleRefreshToken}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <Activity className="w-6 h-6" />
                <span>Renovar Sessão</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
