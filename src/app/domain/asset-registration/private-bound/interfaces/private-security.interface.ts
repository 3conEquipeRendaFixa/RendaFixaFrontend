/**
 * Interface para registro de título privado na listagem
 */
export interface PrivateSecurityRecord {
  id: number;
  tipo: string;
  registradora: string;
  codigo: string;
  apelido: string;
  emissor: string;
  dataEmissao: string;
  dataVencimento: string;
  situacao: string;
  
  // === Seção: Ativo ===
  tipoRegistro?: string;
  tipoRendimento?: string;
  indicadorDesmembramento?: string;
  codigoTitulo?: string;
  indicadorNegociacao?: string;
  dataBase?: string;
  indicadorAmortizacao?: string;
  indicadorBloqueio?: string;
  valorNominalDataBase?: string;
  precoUnitarioLastro?: string;
  codigoISIN?: string;
  dataPrimeiraEmissao?: string;
  indicadorAtualizacaoValorNominal?: string;
  valorNominalAtualizado?: string;
  siglaTitulo?: string;
  posicaoGeralCustodia?: string;
  indicadorPagamentoCupom?: string;
  esforcoRestrito?: string;
  debentureSecuritizacao?: string;
  debentureIncentivada?: string;
  eventosCursadosB3?: string;
  regraIncentivo?: string;
  classe?: string;
  ritoOferta?: string;
  emissorCnpj?: string;
  statusDebenture?: string;
  instrumentoVencidoInadimplido?: string;
  pendenteDemonstracao?: string;
  emissao?: string;
  dataUltimaAlteracao?: string;
  agenteFiduciario?: string;
  possibilidadeResgateAntecipado?: string;
  tipoEmissao?: string;
  escrituradorNomeSimples?: string;
  serie?: string;
  forma?: string;
  garantiaEspecie?: string;
  tipoRegime?: string;
  admiteSubscricaoSemIntegralizacao?: string;
  
  // === Seção: Quantidade ===
  quantidadeEmitida?: string;
  quantidadeResgatada?: string;
  quantidadeCirculacao?: string;
  quantidadeConvertida?: string;
  
  // === Seção: Valores ===
  valorNominalEmissao?: string;
  precoUnitario?: string;
  valorFinanceiro?: string;
  
  // === Seção: Remuneração ===
  tipoRemuneracao?: string;
  indexador?: string;
  percentualIndexador?: string;
  spreadRemuneracao?: string;
  dataPagamentoRemuneracao?: string;
  periodicidadePagamento?: string;
  baseCalculoDias?: string;
  criterioCalculoRemuneracao?: string;
  tipoTaxaRemuneracao?: string;
  
  // === Seção: Juros/Spread ===
  taxaJuros?: string;
  spreadJuros?: string;
  periodicidadeJuros?: string;
  dataInicioJuros?: string;
  dataPagamentoJuros?: string;
  baseCalculoJuros?: string;
  criterioCalculoJuros?: string;
  tipoTaxaJuros?: string;
  
  // === Seção: Amortização ===
  tipoAmortizacao?: string;
  dataInicioAmortizacao?: string;
  periodicidadeAmortizacao?: string;
  percentualAmortizacao?: string;
  
  // === Seção: Distribuição ===
  tipoDistribuicao?: string;
  dataInicioDistribuicao?: string;
  
  // === Seção: Título Sustentável ===
  tituloSustentavel?: string;
  
  // === Seção: Negociação ===
  negociacaoSecundaria?: string;
  mercadoNegociacao?: string;
  segmentoNegociacao?: string;
  
  // === Campos específicos por tipo ===
  // CRI/CRA
  securitizadora?: string;
  patrimonioSeparado?: string;
  lastro?: string;
  
  // CDB
  tipoCDB?: string;
  carenciaLiquidez?: string;
  coberturaFGC?: string;
  
  // LF
  tipoLF?: string;
  subordinacao?: string;
  clausulaSubordinacao?: string;
  
  // LCI/LCA
  tipoLastro?: string;
  isencaoIR?: string;
  
  // CFF
  tipoFinanciamento?: string;
  
  // CBIO
  tipoCredito?: string;
  volumeCarbono?: string;
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
