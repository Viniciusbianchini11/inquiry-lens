import { useState } from 'react';
import { Lead, WebhookResponse, SearchType } from '@/types/lead';

export const useWebhook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLead = async (
    searchValue: string,
    searchType: SearchType
  ): Promise<Lead | null> => {
    console.log('🔍 Iniciando busca:', { searchValue, searchType });
    setLoading(true);
    setError(null);

    try {
      // Call n8n webhook
      console.log('📡 Fazendo requisição para webhook:', 'https://tetraeducacao-agente.app.n8n.cloud/webhook/jornada-do-cliente');
      console.log('📦 Dados enviados:', { searchValue, searchType });
      
      const response = await fetch('https://tetraeducacao-agente.app.n8n.cloud/webhook/jornada-do-cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchValue,
          searchType,
        }),
      });

      console.log('📡 Resposta recebida - Status:', response.status);
      const data: WebhookResponse = await response.json();
      console.log('📋 Dados da resposta:', data);

      if (!data.success) {
        throw new Error(data.error || 'Erro ao buscar lead');
      }

      return data.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Mock function for development
  const mockSearchLead = async (
    searchValue: string,
    searchType: SearchType
  ): Promise<Lead | null> => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Mock data for development
      const mockLead: Lead = {
        id: '1',
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999',
        origem_campanha: 'IEA1',
        cadastro_landing: true,
        entrada_whatsapp: true,
        respondeu_pesquisa: true,
        respostas_pesquisa: ['Interessado em investimentos', 'Renda entre 5-10k'],
        presenca_lives: {
          live1: true,
          live2: true,
          live3: false,
          live4: false,
        },
        data_cadastro: '2024-01-15',
        ultimo_contato: '2024-01-20',
      };

      return searchValue.toLowerCase().includes('joao') || 
             searchValue.toLowerCase().includes('silva') ||
             searchValue.includes('joao.silva@email.com') ||
             searchValue.includes('99999-9999') ? mockLead : null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  console.log('🔧 Modo atual:', process.env.NODE_ENV);
  console.log('🎯 Usando função:', process.env.NODE_ENV === 'development' ? 'MOCK' : 'WEBHOOK REAL');
  
  return {
    searchLead: searchLead, // Sempre usar webhook real para teste
    loading,
    error,
  };
};