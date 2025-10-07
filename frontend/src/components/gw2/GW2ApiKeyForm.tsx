import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Alert } from '../ui/Alert';
import { useGW2 } from '../../contexts/GW2Context';
import { gw2Service } from '../../services/gw2.service';

interface GW2ApiKeyFormProps {
  className?: string;
}

export const GW2ApiKeyForm: React.FC<GW2ApiKeyFormProps> = ({ className = '' }) => {
  const { apiKey, setApiKey, loading, setLoading, error, setError } = useGW2();
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputKey.trim()) {
      setError('Por favor, insira uma chave de API válida');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      // Valida a chave de API testando o endpoint tokeninfo
      await gw2Service.getTokenInfo(inputKey.trim());
      setApiKey(inputKey.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Chave de API inválida');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemove = () => {
    setApiKey(null);
    setInputKey('');
    setError(null);
  };

  const handleTest = async () => {
    if (!apiKey) return;

    setLoading(true);
    setError(null);

    try {
      await gw2Service.getAccount(apiKey);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao testar a chave de API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuração da API do Guild Wars 2</h2>
        <p className="text-gray-600">
          Para acessar seus dados do Guild Wars 2, você precisa de uma chave de API. 
          Você pode criar uma em{' '}
          <a 
            href="https://account.arena.net/applications" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            account.arena.net/applications
          </a>
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}

      {apiKey ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">Chave de API Configurada</h3>
                <p className="text-sm text-green-600">
                  Chave: {apiKey.substring(0, 8)}...{apiKey.substring(apiKey.length - 4)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleTest}
                  disabled={loading}
                >
                  {loading ? 'Testando...' : 'Testar'}
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleRemove}
                >
                  Remover
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Chave de API do Guild Wars 2</Label>
            <Input
              id="apiKey"
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Cole sua chave de API aqui..."
              className="mt-1"
              disabled={isValidating}
            />
            <p className="text-sm text-gray-500 mt-1">
              Sua chave de API será armazenada localmente no navegador
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isValidating || !inputKey.trim()}
          >
            {isValidating ? 'Validando...' : 'Configurar Chave'}
          </Button>
        </form>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Como obter uma chave de API:</h4>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Acesse <a href="https://account.arena.net/applications" target="_blank" rel="noopener noreferrer" className="underline">account.arena.net/applications</a></li>
          <li>Faça login com sua conta do Guild Wars 2</li>
          <li>Clique em "New Key"</li>
          <li>Dê um nome para sua chave (ex: "TaimiLab App")</li>
          <li>Marque as permissões necessárias para os dados que deseja acessar</li>
          <li>Copie a chave gerada e cole no campo acima</li>
        </ol>
      </div>
    </Card>
  );
};
