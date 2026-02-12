export interface ICustomerRecord {
  custCode?: number;
  custName: string;
  typePsonCode: string;
  resntAbroadInd: string;
  docmTypeCode: string;
  docmValue: string;
  statRegCode: string;
  insertDate: string;
  updateDate?: string;
}

export interface CustomerFilters {
  custName?: string;
  typePsonCode?: string;
  docmTypeCode?: string;
  docmValue?: string;
  statRegCode?: string;
  resntAbroadInd?: string;
  updateDate?: string;
}

// API Response Interfaces

export interface IApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface ICustomerListItem {
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

export interface CustomerListFilters {
  typePsonCode?: string;
  resnAbroadIndFilter?: string;
  custNameFilter?: string;
  updateDateBeginFilter?: string;
  UpdateDateEndFilter?: string;
  docmValueFilter?: string;
}

export interface ICustomerInformationData {
  customer: ICustomerDetail;
  individualCustomer: IIndividualCustomer;
  individualCustomerAbroad: any;
  individualCustFinan: any;
  legalEntity: any;
  legalEntityAbroad: any;
  legalEntityFinancial: any;
  shareLegalEntity: any;
  account: any[];
  document: ICustomerDocument[];
  address: any[];
  phone: any[];
  email: any[];
  personRelationshipCus: any[];
}

export interface ICustomerDetail {
  custCode: number;
  custTypePsonCode: string;
  custResnAbroadInd: string;
  custCustName: string;
  custSummrCustName: string;
  custStatRegCode: number;
  custTaxNature: string;
  custTradingProfile: string;
  custPsonLinkInd: string;
  custFatcaUsPersonInd: string;
  custFatcaIrsProfileCode: string;
  custFatcaCrsProfileCode: string;
  custFatcaGiinCode: string;
  custFatcaLeiCode: string;
  custFatcaRelatedCountry: string;
  custFatcaRelatedCountryName: string;
  custDepOwnAccNumber: string;
  custDepIndividDepositAcc: number;
  custDepSelicAcc: string;
  custInsertDate: string;
  custUpdateDate: string;
}

export interface IIndividualCustomer {
  indCustBirthDate: string;
  indCustCountryAcrn: string;
  indCustCountryName: string;
  indCustStateAcrn: string;
  indCustStateName: string;
  indCustNameCityBirth: string;
  indCustCountryResAcrn: string;
  indCustCountryResName: string;
  indCustGenderCode: number;
  indCustGenderDscn: string;
  indCustEducationCode: number;
  indCustEducationDscn: string;
  indCustPepInd: string;
  indCustFatherName: string;
  indCustMotherName: string;
  indCustHiredBy: string;
  indCustCompanyDocm: string;
  indCustCompanyName: string;
  indCustJobName: string;
  indCustEconomicActvCode: string;
  indCustEconomicActvName: string;
  indCustLastUpdateDate: string;
  indCustOrdersByThirdParties: string;
  indCustManagedPortfolioAdmin: string;
  indCustInvestmentFundManager: string;
  indCustRiskClassificationInd: number;
  indCustRiskClassificationDscn: string;
  indCustPrivateBankInd: string;
  indCustMaritalCode: number;
  indCustMaritalDescription: string;
  indCustSpouseDocmValue: string;
  indCustSpouseName: string;
  indCustMinorEmancipatedInd: string;
  indCustMinorResponsibleDocm: string;
  indCustMinorResponsibleName: string;
  indCustDeceasedInd: string;
  indCustDeceasedInventoryDocm: string;
  indCustDeceasedInventoryName: string;
}

export interface ICustomerDocument {
  docDocmValue: string;
  docCustMainDocm: string;
  docDocmTypeCode: number;
  docDocmTypeName: string;
  docDomainBvmfInd: string;
  docIssuingAgencyCode: number;
  docIssuingAgencyAcrn: string;
  docCountryAcrn: string;
  docCountryName: string;
  docStateAcrn: string;
  docStateName: string;
  docMainDocm: string;
  docIssuanceDate: string;
  docExpirationDate: string;
}
