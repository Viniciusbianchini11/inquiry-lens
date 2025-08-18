export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  origem_campanha: string;
  cadastro_landing: boolean;
  entrada_whatsapp: boolean;
  respondeu_pesquisa: boolean;
  respostas_pesquisa?: string[];
  presenca_lives: {
    live1: boolean;
    live2: boolean;
    live3: boolean;
    live4: boolean;
  };
  data_cadastro?: string;
  ultimo_contato?: string;
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