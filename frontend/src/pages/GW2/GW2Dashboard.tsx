import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { GW2ApiKeyForm } from '../../components/gw2/GW2ApiKeyForm';
import { GW2AccountCard, GW2CharacterCard } from '../../components/gw2/GW2Cards';
import { useGW2 } from '../../contexts/GW2Context';
import { RefreshCw, User, Trophy, Coins, MapPin } from 'lucide-react';

export const GW2Dashboard: React.FC = () => {
  const { 
    apiKey, 
    account, 
    characters, 
    loading, 
    error, 
    setLoading, 
    setError 
  } = useGW2();

  const handleRefresh = async () => {
    if (!apiKey) return;

    setLoading(true);
    setError(null);

    try {
      // Recarrega os dados da conta
      const accountData = await import('../../services/gw2.service').then(module => 
        module.gw2Service.getAccount(apiKey)
      );
      
      const characterNames = await import('../../services/gw2.service').then(module => 
        module.gw2Service.getCharacters(apiKey)
      );
      
      const characterPromises = characterNames.map((name: string) => 
        import('../../services/gw2.service').then(module => 
          module.gw2Service.getCharacter(name, apiKey)
        )
      );
      const characterData = await Promise.all(characterPromises);
      
      // Atualiza o contexto (isso seria feito pelo contexto, mas para demonstração)
      console.log('Dados atualizados:', { accountData, characterData });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar dados');
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GW2ApiKeyForm />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Guild Wars 2</h1>
          <Button 
            onClick={handleRefresh} 
            disabled={loading}
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>

      {account && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Informações da Conta</h2>
          <GW2AccountCard account={account} />
        </div>
      )}

      {characters.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Personagens</h2>
            <Badge variant="secondary">{characters.length} personagens</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <GW2CharacterCard 
                key={character.name} 
                character={character} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Estatísticas rápidas */}
      {account && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <User className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Personagens</p>
                <p className="text-2xl font-bold text-gray-900">{characters.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">AP Diário</p>
                <p className="text-2xl font-bold text-gray-900">
                  {account.daily_ap?.toLocaleString('pt-BR') || 'N/A'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Mundo</p>
                <p className="text-2xl font-bold text-gray-900">{account.world}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Coins className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">AP Mensal</p>
                <p className="text-2xl font-bold text-gray-900">
                  {account.monthly_ap?.toLocaleString('pt-BR') || 'N/A'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Seção de conquistas diárias */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conquistas Diárias</h2>
        <Card className="p-6">
          <p className="text-gray-600">
            Em breve: Lista de conquistas diárias disponíveis
          </p>
        </Card>
      </div>

      {/* Seção de WvW */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mundo vs Mundo</h2>
        <Card className="p-6">
          <p className="text-gray-600">
            Em breve: Informações sobre partidas WvW ativas
          </p>
        </Card>
      </div>

      {/* Seção de Trading Post */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Trading Post</h2>
        <Card className="p-6">
          <p className="text-gray-600">
            Em breve: Transações e preços do Trading Post
          </p>
        </Card>
      </div>
    </div>
  );
};
