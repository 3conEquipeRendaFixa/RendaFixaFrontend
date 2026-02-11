/**
 * Interface para características de Título Público Federal
 * Baseado em títulos do Tesouro Nacional
 */
export interface PublicBondCharacteristic {
  // Identificação
  tickerSymbol: string;                       // Código do Ativo (ex: LTN, NTN-B, NTN-F, LFT)
  tickerSymbolSurname: string;                // Apelido
  isinCode: string;                           // Código ISIN
  
  // Emissor
  issuerName: string;                         // Emissor (Tesouro Nacional)
  issuerDocumentNumber: string;               // CNPJ do Emissor
  
  // Características da Emissão
  issueDate: string;                          // Data de Emissão
  maturityDate: string;                       // Data de Vencimento
  issueNumber: string;                        // Número da Emissão
  seriesNumber: string;                       // Número da Série
  
  // Valores
  nominalUnitValue: number;                   // Valor Nominal Unitário
  issueTotalValue: number;                    // Valor Total da Emissão
  updatedNominalValue: number;                // Valor Nominal Atualizado
  nominalValueReferenceDate: string;          // Data de Referência do Valor
  
  // Quantidade
  issueQuantity: number;                      // Quantidade Emitida
  outstandingQuantity: number;                // Quantidade em Circulação
  
  // Remuneração
  couponRate: number;                         // Taxa do Cupom (%)
  couponFrequency: string;                    // Frequência do Cupom (Semestral, Anual)
  indexType: string;                          // Tipo de Indexação (Prefixado, IPCA, Selic)
  profitabilityPercentage: number;            // Rentabilidade (%)
  
  // Status
  instrumentStatusDescription: string;        // Situação do Ativo
  tradingStatus: string;                      // Status de Negociação
  
  // Datas importantes
  lastCouponDate: string;                     // Data do Último Cupom
  nextCouponDate: string;                     // Data do Próximo Cupom
  
  // Custódia
  custodianName: string;                      // Nome do Custodiante
  clearingHouse: string;                      // Câmara de Liquidação
}

/**
 * Tipos de títulos públicos federais
 */
export enum PublicBondType {
  LTN = 'LTN',           // Letra do Tesouro Nacional (Prefixado)
  NTN_B = 'NTN-B',       // Nota do Tesouro Nacional - Série B (IPCA + Juros Semestrais)
  NTN_B_PRINCIPAL = 'NTN-B Principal', // IPCA sem juros semestrais
  NTN_F = 'NTN-F',       // Nota do Tesouro Nacional - Série F (Prefixado + Juros Semestrais)
  LFT = 'LFT',           // Letra Financeira do Tesouro (Selic)
}
