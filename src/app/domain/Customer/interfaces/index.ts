export interface ICustomerApiRecord {
  custCode: number;
  custName: string;
  statRegCode: number;
  updateDate: string;
  insertDate: string;
  typePsonCode: string;
  resntAbroadInd: string;
  docmTypeCode: string;
  docmValue: string;
}

export interface ICustomerRecord {
  custCode: number;
  nome: string;
  tipoPessoa: string;
  residente: string;
  tipoDocumento: string;
  numeroDocumento: string;
  statusInvestidor: string;
  dataHoraInclusao: string;
  dataUltimaAlteracao: string;
}

export interface CustomerFilters {
  nome?: string;
  tipoPessoa?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  statusInvestidor?: string;
  residente?: string;
  dataUltimaAlteracao?: string;
}
