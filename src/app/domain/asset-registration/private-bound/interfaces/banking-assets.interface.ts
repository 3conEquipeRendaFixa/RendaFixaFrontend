import { IBaseAsset } from './base-asset.interface';

/**
 * Interface para Certificado de Depósito Bancário (CDB)
 * Baseado em características específicas de CDB
 */
export interface ICDB extends IBaseAsset {
  // Campos específicos do CDB
  tipoCDB: string;                           // Tipo do CDB (Prefixado/Pós-fixado/Híbrido)
  instituicaoFinanceira: string;             // Instituição Financeira Emissora
  cnpjInstituicao: string;                   // CNPJ da Instituição
  coberturaFGC: boolean;                     // Cobertura do FGC
  limiteFGC: number;                         // Limite da Cobertura FGC (R$)
  carenciaLiquidez: string;                  // Carência para Liquidez
  liquidezAntecipada: boolean;               // Permite Liquidez Antecipada
  
  // Quantidade/Aplicação
  valorMinimoAplicacao: number;              // Valor Mínimo de Aplicação (R$)
  valorMaximoAplicacao: number;              // Valor Máximo de Aplicação (R$)
  valorAplicado: number;                     // Valor Aplicado (R$)
  
  // Remuneração
  tipoRemuneracao: string;                   // Tipo de Remuneração
  taxaRemuneracao: number;                   // Taxa de Remuneração (% a.a.)
  indexador: string;                         // Indexador (CDI, IPCA, etc.)
  percentualIndexador: number;               // Percentual do Indexador (%)
  
  // Tributação
  regraImposto: string;                      // Regra do Imposto de Renda
  aliquotaAtual: number;                     // Alíquota Atual (%)
  valorBruto: number;                        // Valor Bruto (R$)
  valorLiquido: number;                      // Valor Líquido (R$)
}

/**
 * Interface para Letra Financeira (LF)
 * Baseado em características específicas de LF
 */
export interface ILF extends IBaseAsset {
  // Campos específicos da LF
  tipoLF: string;                            // Tipo da LF (Sênior/Subordinada)
  instituicaoFinanceira: string;             // Instituição Financeira Emissora
  cnpjInstituicao: string;                   // CNPJ da Instituição
  subordinacao: boolean;                     // É Subordinada
  clausulaSubordinacao: string;              // Cláusula de Subordinação
  garantiaCredito: string;                   // Garantia de Crédito
  
  // Quantidade
  quantidadeEmitida: number;                 // Quantidade Emitida
  quantidadeCirculacao: number;              // Quantidade em Circulação
  
  // Valores
  valorNominalUnitario: number;              // Valor Nominal Unitário (R$)
  valorTotalEmissao: number;                 // Valor Total da Emissão (R$)
  valorMinimoAplicacao: number;              // Valor Mínimo de Aplicação (R$)
  
  // Remuneração
  tipoRemuneracao: string;                   // Tipo de Remuneração
  taxaRemuneracao: number;                   // Taxa de Remuneração (% a.a.)
  indexador: string;                         // Indexador
  percentualIndexador: number;               // Percentual do Indexador (%)
  periodicidadePagamento: string;            // Periodicidade de Pagamento
  
  // Liquidez
  liquidezAntecipada: boolean;               // Permite Liquidez Antecipada
  carenciaLiquidez: string;                  // Carência para Liquidez
}

/**
 * Interface para Letra de Crédito Imobiliário (LCI)
 * Baseado em características específicas de LCI
 */
export interface ILCI extends IBaseAsset {
  // Campos específicos da LCI
  instituicaoFinanceira: string;             // Instituição Financeira Emissora
  cnpjInstituicao: string;                   // CNPJ da Instituição
  tipoLastro: string;                        // Tipo de Lastro Imobiliário
  garantiaReal: string;                      // Garantia Real
  isencaoIR: boolean;                        // Isenção de Imposto de Renda
  coberturaFGC: boolean;                     // Cobertura do FGC
  limiteFGC: number;                         // Limite da Cobertura FGC (R$)
  
  // Quantidade
  quantidadeEmitida: number;                 // Quantidade Emitida
  quantidadeCirculacao: number;              // Quantidade em Circulação
  
  // Valores
  valorNominalUnitario: number;              // Valor Nominal Unitário (R$)
  valorTotalEmissao: number;                 // Valor Total da Emissão (R$)
  valorMinimoAplicacao: number;              // Valor Mínimo de Aplicação (R$)
  
  // Remuneração
  tipoRemuneracao: string;                   // Tipo de Remuneração
  taxaRemuneracao: number;                   // Taxa de Remuneração (% a.a.)
  indexador: string;                         // Indexador
  percentualIndexador: number;               // Percentual do Indexador (%)
  periodicidadePagamento: string;            // Periodicidade de Pagamento
}

/**
 * Interface para Letra de Crédito do Agronegócio (LCA)
 * Baseado em características específicas de LCA
 */
export interface ILCA extends IBaseAsset {
  // Campos específicos da LCA
  instituicaoFinanceira: string;             // Instituição Financeira Emissora
  cnpjInstituicao: string;                   // CNPJ da Instituição
  tipoLastroAgronegocio: string;             // Tipo de Lastro do Agronegócio
  garantiaReal: string;                      // Garantia Real
  isencaoIR: boolean;                        // Isenção de Imposto de Renda
  coberturaFGC: boolean;                     // Cobertura do FGC
  limiteFGC: number;                         // Limite da Cobertura FGC (R$)
  
  // Quantidade
  quantidadeEmitida: number;                 // Quantidade Emitida
  quantidadeCirculacao: number;              // Quantidade em Circulação
  
  // Valores
  valorNominalUnitario: number;              // Valor Nominal Unitário (R$)
  valorTotalEmissao: number;                 // Valor Total da Emissão (R$)
  valorMinimoAplicacao: number;              // Valor Mínimo de Aplicação (R$)
  
  // Remuneração
  tipoRemuneracao: string;                   // Tipo de Remuneração
  taxaRemuneracao: number;                   // Taxa de Remuneração (% a.a.)
  indexador: string;                         // Indexador
  percentualIndexador: number;               // Percentual do Indexador (%)
  periodicidadePagamento: string;            // Periodicidade de Pagamento
}

/**
 * Interface para Certificado de Operações Estruturadas (CFF)
 * Baseado em características específicas de CFF
 */
export interface ICFF extends IBaseAsset {
  // Campos específicos do CFF
  tipoFinanciamento: string;                 // Tipo de Financiamento
  finalidadeRecursos: string;                // Finalidade dos Recursos
  garantias: string;                         // Garantias Oferecidas
  classificacaoRisco: string;                // Classificação de Risco
  agenciaClassificacao: string;              // Agência de Classificação
  
  // Quantidade
  quantidadeEmitida: number;                 // Quantidade Emitida
  quantidadeCirculacao: number;              // Quantidade em Circulação
  
  // Valores
  valorNominalUnitario: number;              // Valor Nominal Unitário (R$)
  valorTotalEmissao: number;                 // Valor Total da Emissão (R$)
  
  // Remuneração
  tipoRemuneracao: string;                   // Tipo de Remuneração
  taxaRemuneracao: number;                   // Taxa de Remuneração (% a.a.)
  indexador: string;                         // Indexador
  percentualIndexador: number;               // Percentual do Indexador (%)
  periodicidadePagamento: string;            // Periodicidade de Pagamento
  
  // Amortização
  tipoAmortizacao: string;                   // Tipo de Amortização
  dataInicioAmortizacao: string;             // Data de Início da Amortização
  periodicidadeAmortizacao: string;          // Periodicidade da Amortização
}