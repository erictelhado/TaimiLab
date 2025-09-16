import { useAuth } from '../../contexts/AuthContext';
import { AuthUtils } from '../../utils/auth';
import { useState, useEffect } from 'react';
import { Circle, Clock, Shield, User } from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [sessionInfo, setSessionInfo] = useState({
    isRememberMe: false,
    tokenExpiry: null as Date | null,
    sessionStatus: 'active' as 'active' | 'expiring' | 'expired'
  });

  useEffect(() => {
    const updateSessionInfo = () => {
      const token = AuthUtils.getToken();
      const isRememberMe = AuthUtils.isRememberMeEnabled();
      
      if (token) {
        const decoded = AuthUtils.decodeToken(token);
        if (decoded) {
          const expiryDate = new Date(decoded.exp * 1000);
          const shouldRefresh = AuthUtils.shouldRefreshToken(token);
          
          setSessionInfo({
            isRememberMe,
            tokenExpiry: expiryDate,
            sessionStatus: shouldRefresh ? 'expiring' : 'active'
          });
        }
      } else {
        setSessionInfo({
          isRememberMe: false,
          tokenExpiry: null,
          sessionStatus: 'expired'
        });
      }
    };

    updateSessionInfo();
    const interval = setInterval(updateSessionInfo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6 mt-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome to your Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                  This is a protected area. Only authenticated users can see this content.
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* User Information Card */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-medium text-gray-900">Informações do Usuário</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">ID do Usuário</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono">{user?.id}</dd>
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
              </div>

              {/* Session Information Card */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-medium text-gray-900">Informações da Sessão</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status da Sessão</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sessionInfo.sessionStatus === 'active' ? 'bg-green-100 text-green-800' :
                        sessionInfo.sessionStatus === 'expiring' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        <Circle size={8} className="mr-1" />
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
              </div>
            </div>

            {/* Security Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">Informações de Segurança</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-blue-700">Tipo de Armazenamento</dt>
                  <dd className="mt-1 text-sm text-blue-600">
                    {sessionInfo.isRememberMe ? 'LocalStorage (Persistente)' : 'SessionStorage (Temporário)'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-blue-700">Refresh Automático</dt>
                  <dd className="mt-1 text-sm text-blue-600">Ativado (a cada 5 minutos)</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-blue-700">Timeout de Inatividade</dt>
                  <dd className="mt-1 text-sm text-blue-600">30 minutos</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-blue-700">Rate Limiting</dt>
                  <dd className="mt-1 text-sm text-blue-600">5 tentativas por 15 minutos</dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 