/**
 * Interface para características de Renda Fixa Privada
 * Baseado em TRM_RF_PRIV_FIX_INC_CHARAC
 */
export interface IPrivateFixedIncomeCharact {
  // Ativo
  tickerSymbolTypeCode: string;               // Tipo de Ativo
  tickerSymbol: string;                       // Código do Ativo
  tickerSymbolSurname: string;                // Apelido
  issuerCorporationName: string;              // Emissor (Razão Social)
  registerName: string;                       // Registradora: verificar essa coluna com o Reinaldo
  issueDate: string;                          // Data de Emissão (ddmmaaaa)
  maturityDate: string;                       // Data de Vencimento (ddmmaaaa)
  instrumentStatusDescription: string;        // Situação do Ativo
  nonPaymentIndicator: boolean;               // Instrumento Vencido e Inadimplido
}