export interface ConfirmacaoForm {
  nome: string;
  presenca: string;
  adultos: string;
  criancas: string;
  email: string;
  telefone: string;
  presente_id: string;
}

export interface ConfirmacaoData {
  name: string;
  email: string;
  phone: string;
  confirm: boolean;
  count_adult: number;
  count_kid: number;
  gift_id: number | null;
}

export interface ConfirmacaoResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
} 