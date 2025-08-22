import { useState } from 'react';
import { Lead, WebhookResponse, SearchType } from '@/types/lead';

export const useWebhook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLead = async (
    searchValue: string,
    searchType: SearchType
  ): Promise<Lead | null> => {
    setLoading(true);
    setError(null);

    try {
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

      const rawData = await response.json();

      // Check if response is an array and get first element, or use directly if object
      const webhookData = Array.isArray(rawData) ? rawData[0] : rawData;
      
      if (!webhookData) {
        throw new Error('Lead não encontrado');
      }

      // Map webhook response to Lead interface - handle both formats
      const mappedLead: Lead = {
        id: webhookData.lead?.email || webhookData.email || webhookData['E-MAIL'] || Math.random().toString(),
        nome: webhookData.lead?.nome || webhookData.nome || webhookData.NOME,
        email: webhookData.lead?.email || webhookData.email || webhookData['E-MAIL'],
        telefone: (webhookData.lead?.telefone || webhookData.telefone)?.toString() || '',
        origem_campanha: webhookData.origem?.campanha || 'N/A',
        utm_source: webhookData.origem?.utm_source || webhookData.utm_source || webhookData['UTM SOURCE'],
        utm_medium: webhookData.origem?.utm_medium || webhookData.utm_medium || webhookData['UTM MEDIUM'],
        utm_term: webhookData.origem?.utm_term || webhookData.utm_term || webhookData['UTM TERM'],
        utm_content: webhookData.origem?.utm_content || webhookData.utm_content || webhookData['UTM CONTENT'],
        cadastro_landing: !!(webhookData.cadastro?.data || webhookData.DATA),
        entrada_whatsapp: !!(webhookData.whatsapp?.entrou_grupo || webhookData.entrou_no_grupo),
        respondeu_pesquisa: !!(webhookData.pesquisa || webhookData.resposta_pesquisa || webhookData.RESPOSTAS),
        respostas_pesquisa: webhookData.pesquisa || {
          cargo: webhookData["Qual das opções descreveria melhor a função que você desempenha ou a última que desempenhou?"],
          renda: webhookData["Qual a sua renda pessoal mensal?"],
          objetivo: webhookData["Qual é o seu principal objetivo de desenvolvimento profissional neste momento?"],
          pq_decidiu: webhookData["Por que você decidiu se inscrever na Imersão Gestor do Futuro?"],
          faixa_etaria: webhookData["Qual a sua faixa etária?"],
          genero: webhookData["Você é..."],
          porte_empresa: webhookData["Qual o porte da empresa em que trabalha atualmente?"],
          empresa: webhookData["Qual nome da empresa em que trabalha?"],
          pessoas_lideradas: webhookData["Quantas pessoas você lidera atualmente?"],
          escolaridade: webhookData["Qual a sua escolaridade?"],
          whatsapp: webhookData["Qual seu número de WhatsApp? (Podemos enviar lembretes da aula para os alunos e responder suas dúvidas durante o curso)"],
          conhecimento_ia: webhookData["Como você considera seus conhecimentos em Inteligência Artificial hoje? "],
          interesse_ia: webhookData["Você tem interesse em se especializar em Inteligência Artificial e nas principais ferramentas dessa área, visto que esse conhecimento é cada vez mais valorizado no mercado?  "],
          frequencia_ia: webhookData["Com qual frequência você utiliza Inteligência Artificial e Excel no trabalho? "],
          investiu_capacitacao: webhookData["Você investiu na sua capacitação profissional com cursos e/ou treinamentos nos últimos 12 meses?"],
          nao_pode_faltar: webhookData["Para você, o que não pode faltar na Imersão Gestor do Futuro"],
          conhecimento_excel: webhookData["Como você considera seus conhecimentos em Excel hoje? "],
          area_atuacao: webhookData["E qual é a área que você atua?"]
        },
        presenca_lives: {
          live1: !!(webhookData.lives?.aula1 && Object.keys(webhookData.lives.aula1).length > 0),
          live2: !!(webhookData.lives?.aula2 && Object.keys(webhookData.lives.aula2).length > 0),
          live3: !!(webhookData.lives?.aula3 && Object.keys(webhookData.lives.aula3).length > 0),
          live4: !!(webhookData.lives?.mentoria && Object.keys(webhookData.lives.mentoria).length > 0),
        },
        data_cadastro: webhookData.cadastro?.data || webhookData.DATA,
        DATA: webhookData.DATA,
      };

      return mappedLead;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchLead,
    loading,
    error,
  };
};
