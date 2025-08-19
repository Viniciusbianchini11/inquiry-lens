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
      const rawData = await response.json();
      console.log('📋 Dados da resposta:', rawData);

      // Check if response is an array and get first element, or use directly if object
      const webhookData = Array.isArray(rawData) ? rawData[0] : rawData;
      
      if (!webhookData || !webhookData.lead) {
        throw new Error('Lead não encontrado');
      }

      // Map webhook response to Lead interface
      const mappedLead: Lead = {
        id: webhookData.lead.email || Math.random().toString(),
        nome: webhookData.lead.nome,
        email: webhookData.lead.email,
        telefone: webhookData.lead.telefone?.toString() || '',
        origem_campanha: webhookData.origem?.campanha || 'N/A',
        cadastro_landing: !!webhookData.cadastro?.data,
        entrada_whatsapp: !!webhookData.whatsapp?.entrou_grupo,
        respondeu_pesquisa: !!webhookData.pesquisa,
        respostas_pesquisa: webhookData.pesquisa ? [
          `Função: ${webhookData.pesquisa.funcao}`,
          `Empresa: ${webhookData.pesquisa.empresa}`,
          `Renda: ${webhookData.pesquisa.renda}`,
          `Objetivo: ${webhookData.pesquisa.objetivo}`,
          `Área de Atuação: ${webhookData.pesquisa.area_atuacao}`
        ].filter(Boolean) : [],
        presenca_lives: {
          live1: !!webhookData.lives?.aula1 && Object.keys(webhookData.lives.aula1).length > 0,
          live2: !!webhookData.lives?.aula2 && Object.keys(webhookData.lives.aula2).length > 0,
          live3: !!webhookData.lives?.aula3 && Object.keys(webhookData.lives.aula3).length > 0,
          live4: !!webhookData.lives?.mentoria && Object.keys(webhookData.lives.mentoria).length > 0,
        },
        data_cadastro: webhookData.cadastro?.data,
        ultimo_contato: webhookData.cadastro?.entradas?.[webhookData.cadastro.entradas.length - 1]?.split(' ')[0],
      };

      console.log('✅ Lead mapeado com sucesso:', mappedLead);
      return mappedLead;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('❌ Erro na busca:', errorMessage);
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
  console.log('🎯 Usando função:', 'WEBHOOK REAL');
  
  return {
    searchLead: searchLead, // Sempre usar webhook real para teste
    loading,
    error,
  };
};
