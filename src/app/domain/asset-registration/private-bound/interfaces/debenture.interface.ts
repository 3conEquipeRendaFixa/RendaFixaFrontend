/**
 * Interface para características de Debênture
 * Baseado em TRM_RF_DEB_CARACTERISTICS
 */
export interface IDebenture {
  // Ativo
  tickerSymbol: string;                       // Código do Ativo
  tickerSymbolSurname: string;                // Apelido
  issuerCorporationName: string;              // Emissor (Razão Social)
  issuerDocumentNumber: string;               // Emissor (CNPJ)
  issueNumber: string;                        // Emissão
  issueTypeName: string;                      // Tipo de Emissão (Pública/Privada)
  scripturalEmissionName: string;             // Forma (Nominativa/Escritural)
  emissionRestrictedWorkIndicator: boolean;   // Esforço Restrito
  law12431SupportIndicator: boolean;          // Debênture Incentivada
  law12431SupportRuleCode: string;            // Regra de Incentivo
  instrumentStatusDescription: string;        // Status da Debênture
  updateLastDate: string;                     // Data Última Alteração (ddmmaaaa)
  otcAccountBookkeeperShortName: string;      // Escriturador / Emissor (Nome Simples)
  collateralTypeName: string;                 // Garantia/Espécie
  issueDate: string;                          // Data de Emissão (ddmmaaaa)
  maturityDate: string;                       // Data de Vencimento (ddmmaaaa)
  classTypeName: string;                      // Classe
  nonPaymentIndicator: boolean;               // Instrumento Vencido e Inadimplido
  fiduciaryAgentName: string;                 // Agente Fiduciário
  seriesIdentificationCode: string;           // Série
  regimeTypeName: string;                     // Tipo de Regime (Depositado/Registrado)
  securitizationDebentureInd: boolean;        // Debênture de securitização
  b3EventAttendedIndicator: boolean;          // Eventos Cursados na B3?
  offerRitual: string;                        // Rito de Oferta
  financialStatmentPendingInd: boolean;       // Pendente de Demonstração Financeira
  earlyRedemptionIndicator: boolean;          // Possibilidade de Resgate Antecipado?
  isinCode: string;                           // ISIN
  subscriptionPaymentIndicator: boolean;      // Admite Subscrição sem a Integralização?

  // Quantidade
  issueQuantity: number;                      // Quantidade Emitida
  depositQuantity: number;                    // Quantidade Depositada
  redemptionQuantity: number;                 // Quantidade Resgatada

  // Valores
  nominalUnitValue: number;                   // Valor Nominal Unitário na Emissão (R$)
  issueTotalValue: number;                    // Valor Total da Emissão (R$)
  updatedNominalValue: number;                // Valor Atual
  nominalValueReferenceDate: string;          // Valor Atualizado em (ddmmaaaa)

  // Remuneração
  sndIndicator: boolean;                      // Padrão SND
  adjustmentFrequencyDayQuantity: number;     // Periodicidade em Dias
  profitabilityStartDate: string;             // Data de Início de Rentabilidade
  adjustmentFrequencyDay: number;             // Dia de Referência p/Índice de Preços
  indexShortName: string;                     // Índice
  curveCalculationIndicator: boolean;         // Calcula Curva
  profitabilityPercentage: number;            // Rentabilidade / Multiplicador (%)
  projectionTypeCode: string;                 // Tipo de Projeção
  nominalValueAdjustmentIndicator: boolean;   // Corrige o Valor Nominal

  // Juros/Spread
  eventRateValue: number;                     // Taxa
  interestPaymentStartDate: string;           // A partir de
  interestPaymentFrequency: string;           // A cada
  interestPaymentIndicator: boolean;          // Incorpora ao Principal

  // Amortização
  amortizationPaymentType: string;            // Tipo de Amortização
  amortizationStartDate: string;              // A partir de
  amortizationFrequency: string;              // A cada

  // Distribuição
  distributionStartDate: string;              // Data Início de Distribuição
  distributionEndDate: string;                // Data Fim de Distribuição

  // Dados do Título Sustentável
  tickerSustainable: boolean;                 // Título Sustentável

  // Negociação de Valores Mobiliários
  tradingAdimittedInd: boolean;               // Admitido à negociação
  negociationStatus: string;                  // Status Negociação
  blockingReason: string;                     // Motivos de bloqueio / restrição
}
