import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { GW2Account, GW2Character, GW2Achievement, GW2Item, GW2World } from '../../types/gw2';

interface GW2AccountCardProps {
  account: GW2Account;
  className?: string;
}

export const GW2AccountCard: React.FC<GW2AccountCardProps> = ({ account, className = '' }) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{account.name}</h3>
        <Badge variant="secondary">ID: {account.id}</Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Mundo</p>
          <p className="font-semibold">{account.world}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Criado em</p>
          <p className="font-semibold">{new Date(account.created).toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      {account.fractal_level && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Nível Fractal</p>
          <p className="font-semibold">{account.fractal_level}</p>
        </div>
      )}

      {account.daily_ap && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">AP Diário</p>
          <p className="font-semibold">{account.daily_ap.toLocaleString('pt-BR')}</p>
        </div>
      )}

      {account.monthly_ap && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">AP Mensal</p>
          <p className="font-semibold">{account.monthly_ap.toLocaleString('pt-BR')}</p>
        </div>
      )}

      {account.wvw_rank && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Rank WvW</p>
          <p className="font-semibold">{account.wvw_rank}</p>
        </div>
      )}

      {account.commander && (
        <Badge variant="default" className="mt-2">Comandante</Badge>
      )}
    </Card>
  );
};

interface GW2CharacterCardProps {
  character: GW2Character;
  className?: string;
}

export const GW2CharacterCard: React.FC<GW2CharacterCardProps> = ({ character, className = '' }) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{character.name}</h3>
        <Badge variant="secondary">Nível {character.level}</Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Raça</p>
          <p className="font-semibold">{character.race}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Profissão</p>
          <p className="font-semibold">{character.profession}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Gênero</p>
          <p className="font-semibold">{character.gender}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Mortes</p>
          <p className="font-semibold">{character.deaths}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Criado em</p>
        <p className="font-semibold">{new Date(character.created).toLocaleDateString('pt-BR')}</p>
      </div>

      {character.guild && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Guilda</p>
          <p className="font-semibold">{character.guild}</p>
        </div>
      )}

      {character.title && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Título</p>
          <p className="font-semibold">ID: {character.title}</p>
        </div>
      )}

      {character.craftings && character.craftings.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Profissões</p>
          <div className="flex flex-wrap gap-2">
            {character.craftings.map((crafting: any, index: number) => (
              <Badge key={index} variant="outline">
                {crafting.discipline} ({crafting.rating})
              </Badge>
            ))}
          </div>
        </div>
      )}

      {character.flags && character.flags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Flags</p>
          <div className="flex flex-wrap gap-2">
            {character.flags.map((flag: string, index: number) => (
              <Badge key={index} variant="outline">{flag}</Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

interface GW2AchievementCardProps {
  achievement: GW2Achievement;
  progress?: {
    current?: number;
    max?: number;
    done?: boolean;
  };
  className?: string;
}

export const GW2AchievementCard: React.FC<GW2AchievementCardProps> = ({ 
  achievement, 
  progress, 
  className = '' 
}) => {
  const progressPercentage = progress?.max ? (progress.current || 0) / progress.max * 100 : 0;

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{achievement.name}</h3>
        {progress?.done && <Badge variant="default">Concluída</Badge>}
      </div>
      
      {achievement.description && (
        <p className="text-gray-700 mb-4">{achievement.description}</p>
      )}

      {achievement.requirement && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Requisito</p>
          <p className="font-semibold">{achievement.requirement}</p>
        </div>
      )}

      {achievement.type && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Tipo</p>
          <p className="font-semibold">{achievement.type}</p>
        </div>
      )}

      {progress && progress.max && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{progress.current || 0} / {progress.max}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {achievement.tiers && achievement.tiers.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Níveis</p>
          <div className="space-y-2">
            {achievement.tiers.map((tier: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span>Nível {index + 1}</span>
                <span>{tier.count} - {tier.points} pontos</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {achievement.flags && achievement.flags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Flags</p>
          <div className="flex flex-wrap gap-2">
            {achievement.flags.map((flag: string, index: number) => (
              <Badge key={index} variant="outline">{flag}</Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

interface GW2ItemCardProps {
  item: GW2Item;
  className?: string;
}

export const GW2ItemCard: React.FC<GW2ItemCardProps> = ({ item, className = '' }) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
        {item.rarity && <Badge variant="secondary">{item.rarity}</Badge>}
      </div>
      
      {item.description && (
        <p className="text-gray-700 mb-4">{item.description}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        {item.type && (
          <div>
            <p className="text-sm text-gray-600">Tipo</p>
            <p className="font-semibold">{item.type}</p>
          </div>
        )}
        {item.level && (
          <div>
            <p className="text-sm text-gray-600">Nível</p>
            <p className="font-semibold">{item.level}</p>
          </div>
        )}
      </div>

      {item.vendor_value && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Valor do Vendedor</p>
          <p className="font-semibold">{item.vendor_value.toLocaleString('pt-BR')} cobre</p>
        </div>
      )}

      {item.flags && item.flags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Flags</p>
          <div className="flex flex-wrap gap-2">
            {item.flags.map((flag: string, index: number) => (
              <Badge key={index} variant="outline">{flag}</Badge>
            ))}
          </div>
        </div>
      )}

      {item.restrictions && item.restrictions.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Restrições</p>
          <div className="flex flex-wrap gap-2">
            {item.restrictions.map((restriction: string, index: number) => (
              <Badge key={index} variant="destructive">{restriction}</Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

interface GW2WorldCardProps {
  world: GW2World;
  className?: string;
}

export const GW2WorldCard: React.FC<GW2WorldCardProps> = ({ world, className = '' }) => {
  const getPopulationColor = (population: string) => {
    switch (population.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      case 'veryhigh': return 'text-red-800';
      default: return 'text-gray-600';
    }
  };

  const getPopulationText = (population: string) => {
    switch (population.toLowerCase()) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
      case 'veryhigh': return 'Muito Alta';
      default: return population;
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{world.name}</h3>
        <Badge variant="secondary">ID: {world.id}</Badge>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">População</p>
        <p className={`font-semibold ${getPopulationColor(world.population)}`}>
          {getPopulationText(world.population)}
        </p>
      </div>
    </Card>
  );
};
