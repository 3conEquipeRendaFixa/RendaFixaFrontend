import { IBaseAsset } from './base-asset.interface';

/**
 * Interface para Certificado de Recebíveis Imobiliários (CRI)
 * Baseado em características específicas de CRI
 */
export interface ICRI extends IBaseAsset {
  // Campos específicos do CRI
  securitizadora: string;                     // Securitizadora
  patrimonioSeparado: string;                 // Patrimônio Separado
  lastro: string;                            // Lastro/Ativo Subjacente
  garantiaReal: string;                      // Garantia Real
  classificacaoRisco: string;                // Classificação de Risco
  agenciaClassificacao: string;              // Agência de Classificação
  codigoISIN: string;                        // Código ISIN
  
  // Quantidade
  quantidadeEmitida: number;                 // Quantidade Emitida
  quantidadeCirculacao: number;              // Quantidade em Circulação
  
  // Valores
  valorNominalUnitario: number;              // Valor Nominal Unitário (R$)
  valorTotalEmissao: number;                 // Valor Total da Emissão (R$)
  precoUnitario: number;                     // Preço Unitário Atual (R$)
  
  // Remuneração
  tipoRemuneracao: string;                   // Tipo de Remuneração
  indexador: string;                         // Indexador
  percentualIndexador: number;               // Percentual do Indexador (%)
  spreadRemuneracao: number;                 // Spread de Remuneração (% a.a.)
  periodicidadePagamento: string;            // Periodicidade de Pagamento
  
  // Amortização
  tipoAmortizacao: string;                   // Tipo de Amortização
  dataInicioAmortizacao: string;             // Data de Início da Amortização
  periodicidadeAmortizacao: string;          // Periodicidade da Amortização
}

/**
 * Interface para Certificado de Recebíveis do Agronegócio (CRA)
 * Baseado em características específicas de CRA
 */
export interface ICRA extends IBaseAsset {
  // Campos específicos do CRA
  securitizadora: string;                     // Securitizadora
  patrimonioSeparado: string;                 // Patrimônio Separado
  lastroAgronegocio: string;                 // Lastro do Agronegócio
  tipoLastro: string;                        // Tipo de Lastro (Rural/Agrícola)
  garantiaReal: string;                      // Garantia Real
  classificacaoRisco: string;                // Classificação de Risco
  agenciaClassificacao: string;              // Agência de Classificação
  codigoISIN: string;                        // Código ISIN
  
  // Quantidade
  quantidadeEmitida: number;                 // Quantidade Emitida
  quantidadeCirculacao: number;              // Quantidade em Circulação
  
  // Valores
  valorNominalUnitario: number;              // Valor Nominal Unitário (R$)
  valorTotalEmissao: number;                 // Valor Total da Emissão (R$)
  precoUnitario: number;                     // Preço Unitário Atual (R$)
  
  // Remuneração
  tipoRemuneracao: string;                   // Tipo de Remuneração
  indexador: string;                         // Indexador
  percentualIndexador: number;               // Percentual do Indexador (%)
  spreadRemuneracao: number;                 // Spread de Remuneração (% a.a.)
  periodicidadePagamento: string;            // Periodicidade de Pagamento
  
  // Amortização
  tipoAmortizacao: string;                   // Tipo de Amortização
  dataInicioAmortizacao: string;             // Data de Início da Amortização
  periodicidadeAmortizacao: string;          // Periodicidade da Amortização
}

/**
 * Interface para Crédito de Descarbonização (CBIO)
 * Baseado em características específicas de CBIO
 */
export interface ICBIO extends IBaseAsset {
  // Campos específicos do CBIO
  tipoCredito: string;                       // Tipo de Crédito de Carbono
  volumeCarbono: number;                     // Volume de Carbono (tCO2eq)
  metodologia: string;                       // Metodologia de Cálculo
  entidadeCertificadora: string;             // Entidade Certificadora
  projetoOrigem: string;                     // Projeto de Origem
  localizacaoProjeto: string;                // Localização do Projeto
  periodoCredito: string;                    // Período de Geração do Crédito
  codigoISIN: string;                        // Código ISIN
  
  // Quantidade
  quantidadeEmitida: number;                 // Quantidade Emitida
  quantidadeCirculacao: number;              // Quantidade em Circulação
  quantidadeAposentada: number;              // Quantidade Aposentada
  
  // Valores
  precoUnitario: number;                     // Preço Unitário (R$/tCO2eq)
  valorTotalEmissao: number;                 // Valor Total da Emissão (R$)
  
  // Sustentabilidade
  impactoAmbiental: string;                  // Impacto Ambiental
  beneficiosAdicionais: string;              // Benefícios Adicionais
}