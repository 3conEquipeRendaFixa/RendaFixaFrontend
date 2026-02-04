/**
 * Interface para registro de título público na listagem
 */
export interface PublicSecurityRecord {
  id: number;
  tipo: string;
  registradora: string;
  codigo: string;
  apelido: string;
  emissor: string;
  dataEmissao: string;
  dataVencimento: string;
  situacao: string;
}

/**
 * Chaves disponíveis para filtros
 */
export type PublicSecurityFilterKey = 
  | 'tipoAtivo' 
  | 'codigoAtivo' 
  | 'apelidoAtivo' 
  | 'emissor' 
  | 'dataEmissao' 
  | 'dataVencimento' 
  | 'situacaoAtivo';

/**
 * Interface para filtros aplicados
 */
export interface PublicSecurityAppliedFilter {
  label: string;
  value: string;
  key: PublicSecurityFilterKey;
}

/**
 * Interface para filtros do formulário
 */
export type PublicSecurityFilters = Record<PublicSecurityFilterKey, string>;

/**
 * Labels dos filtros para exibição
 */
export const PUBLIC_SECURITY_FILTER_LABELS: Record<PublicSecurityFilterKey, string> = {
  tipoAtivo: 'Tipo do Ativo',
  codigoAtivo: 'Código do Ativo',
  apelidoAtivo: 'Apelido do Ativo',
  emissor: 'Emissor',
  dataEmissao: 'Data Emissão',
  dataVencimento: 'Data Vencimento',
  situacaoAtivo: 'Situação do Ativo'
};
