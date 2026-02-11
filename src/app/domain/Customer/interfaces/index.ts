export interface ICustomerRecord {
  nome: string;
  tipoPessoa: string;
  residente: string;
  tipoDocumento: string;
  numeroDocumento: string;
  statusInvestidor: string;
  dataHoraInclusao: string;
  dataUltimaAlteracao?: string;
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
