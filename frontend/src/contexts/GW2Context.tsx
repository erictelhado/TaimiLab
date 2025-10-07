import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GW2Account, GW2Character, GW2ContextType } from '../types/gw2';
import { gw2Service } from '../services/gw2.service';

const GW2Context = createContext<GW2ContextType | undefined>(undefined);

interface GW2ProviderProps {
  children: ReactNode;
}

export const GW2Provider: React.FC<GW2ProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [account, setAccount] = useState<GW2Account | null>(null);
  const [characters, setCharacters] = useState<GW2Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega a chave de API do localStorage na inicialização
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gw2_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Salva a chave de API no localStorage quando ela muda
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('gw2_api_key', apiKey);
    } else {
      localStorage.removeItem('gw2_api_key');
    }
  }, [apiKey]);

  // Carrega os dados da conta quando a chave de API muda
  useEffect(() => {
    if (apiKey) {
      loadAccountData();
    } else {
      setAccount(null);
      setCharacters([]);
    }
  }, [apiKey]);

  const loadAccountData = async () => {
    if (!apiKey) return;

    setLoading(true);
    setError(null);

    try {
      // Carrega informações da conta
      const accountData = await gw2Service.getAccount(apiKey);
      setAccount(accountData);

      // Carrega lista de personagens
      const characterNames = await gw2Service.getCharacters(apiKey);
      
      // Carrega informações detalhadas de cada personagem
      const characterPromises = characterNames.map((name: string) => 
        gw2Service.getCharacter(name, apiKey)
      );
      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados da conta');
      setAccount(null);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const value: GW2ContextType = {
    apiKey,
    setApiKey,
    account,
    setAccount,
    characters,
    setCharacters,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <GW2Context.Provider value={value}>
      {children}
    </GW2Context.Provider>
  );
};

export const useGW2 = (): GW2ContextType => {
  const context = useContext(GW2Context);
  if (context === undefined) {
    throw new Error('useGW2 deve ser usado dentro de um GW2Provider');
  }
  return context;
};

export default GW2Context;
