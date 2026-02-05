/**
 * Interface base para características comuns de todos os ativos de renda fixa privada
 * Baseado em TRM_RF_PRIV_FIX_INC_CHARAC
 */
export interface IBaseAsset {
  // Campos básicos obrigatórios para todos os ativos
  tickerSymbolTypeCode: string;               // Tipo de Ativo (DEB, CRI, CRA, etc.)
  tickerSymbol: string;                       // Código do Ativo
  tickerSymbolSurname: string;                // Apelido
  issuerCorporationName: string;              // Emissor (Razão Social)
  registerName: string;                       // Registradora
  issueDate: string;                          // Data de Emissão (ddmmaaaa)
  maturityDate: string;                       // Data de Vencimento (ddmmaaaa)
  instrumentStatusDescription: string;        // Situação do Ativo
  nonPaymentIndicator: boolean;               // Instrumento Vencido e Inadimplido
}

/**
 * Interface para registro simplificado na listagem/grid
 * Usa apenas os campos essenciais para exibição
 */
export interface IAssetListRecord extends IBaseAsset {
  // Campos adicionais comuns para listagem podem ser adicionados aqui se necessário
}