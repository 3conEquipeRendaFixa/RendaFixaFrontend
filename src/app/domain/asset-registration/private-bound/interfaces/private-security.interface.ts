import { IBaseAsset } from './base-asset.interface';

/**
 * Interface para registro de título privado na listagem
 * Baseada na interface comum IBaseAsset
 * Contém apenas os campos essenciais para exibição no grid
 */
export interface IPrivateSecurityRecord extends IBaseAsset {
  // Esta interface herda todos os campos necessários de IBaseAsset
  // Campos adicionais específicos para a listagem podem ser adicionados aqui se necessário
}

/**
 * Chaves disponíveis para filtros
 */
export type PrivateSecurityFilterKey = 
  | 'tipoAtivo' 
  | 'codigoAtivo' 
  | 'apelidoAtivo' 
  | 'emissor' 
  | 'dataEmissao' 
  | 'dataVencimento' 
  | 'situacaoAtivo' 
  | 'inadimplente';

/**
 * Interface para filtros aplicados
 */
export interface PrivateSecurityAppliedFilter {
  label: string;
  value: string;
  key: PrivateSecurityFilterKey;
}

/**
 * Interface para filtros do formulário
 */
export type PrivateSecurityFilters = Record<PrivateSecurityFilterKey, string>;

/**
 * Labels dos filtros para exibição
 */
export const PRIVATE_SECURITY_FILTER_LABELS: Record<PrivateSecurityFilterKey, string> = {
  tipoAtivo: 'Tipo do Ativo',
  codigoAtivo: 'Código do Ativo',
  apelidoAtivo: 'Apelido do Ativo',
  emissor: 'Emissor (Razão Social)',
  dataEmissao: 'Data Emissão',
  dataVencimento: 'Data Vencimento',
  situacaoAtivo: 'Situação do Ativo',
  inadimplente: 'Inadimplente'
};
