
export interface IBaseAsset {
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


export interface IAssetListRecord extends IBaseAsset {
}