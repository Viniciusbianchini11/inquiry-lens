export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  origem_campanha: string;
  utm_source?: string;
  utm_medium?: string;
  utm_term?: string;
  utm_content?: string;
  cadastro_landing: boolean;
  entrada_whatsapp: boolean;
  respondeu_pesquisa: boolean;
  respostas_pesquisa?: any;
  presenca_lives: {
    live1: boolean;
    live2: boolean;
    live3: boolean;
    live4: boolean;
  };
  data_cadastro?: string;
  DATA?: string;
}

export interface WebhookResponse {
  success: boolean;
  data?: Lead;
  error?: string;
}

export interface SearchFilters {
  campanha?: string;
  etapa?: 'todos' | 'cadastro' | 'whatsapp' | 'pesquisa' | 'lives';
}

export type SearchType = 'nome' | 'email' | 'telefone';