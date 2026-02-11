import { IBaseAsset } from './base-asset.interface';

// Interface para os dados do ativo retornados pela API de lista
export interface IPrivateSecurityApiData {
  tickerSymbol: string;
  tickerSymbolSurname: string;
  issuerCorporationName: string | null;
  issueDate: string | null;
  maturityDate: string | null;
  instrumentStatusDescription: string;
}

// Interface para a resposta da API de lista
export interface IPrivateSecurityListResponse {
  statusCode: number;
  message: string;
  data: IPrivateSecurityApiData[];
  timestamp: string;
}

// Interface para os eventos do ativo
export interface IAssetEvent {
  eventSequence: number;
  eventCode: string | null;
  eventTypeCode: number;
  eventOriginalDate: string;
  eventExecutionDate: string;
  settlementDate: string;
  eventTypeName: string | null;
  eventRateValue: number | null;
  eventUnitValue: number | null;
  interestPaymentIndicator: string | null;
}

// Interface para as características detalhadas do ativo
export interface IAssetCharacteristic {
  exchange: string;
  tickerSymbol: string;
  tickerSymbolTypeCode: string;
  isinCode: string;
  tickerSymbolSurname: string;
  tickerSymbolStatusName: string | null;
  tickerStatus: string | null;
  tickerSubStatus: string | null;
  blockingReason: string | null;
  restrictionBlockingReasonTypeName: string | null;
  tradingAdmittedInd: boolean | null;
  negociationStatus: string | null;
  electronicTradingIndicator: boolean | null;
  voiceIndicator: boolean | null;
  tradingMarketName: string | null;
  negotiationPlatformIndicator: boolean | null;
  negotiationStatusTypeName: string | null;
  seriesTypeCode: string | null;
  seriesIdentificationCode: string | null;
  classTypeName: string | null;
  assetInclusionDate: string | null;
  maturityDate: string | null;
  registrationDate: string | null;
  issueSeriesNumber: string | null;
  otcIssuerAccountCode: string | null;
  issuerDocumentNumber: string | null;
  otcIssuerDocmValue: string | null;
  issuerCorporationName: string | null;
  otcIssuerShortName: string | null;
  issueDate: string | null;
  issueNumber: string | null;
  issueTypeName: string | null;
  issueQuantity: number | null;
  issueValue: number | null;
  issueFinancialValue: number | null;
  originalValueDate: string | null;
  originalValue: number | null;
  issueUnitReferenceDate: string | null;
  unitPriceReferenceDate: string | null;
  nominalUnitValue: number | null;
  issueTotalValue: number | null;
  updatedIssueValue: number | null;
  updatedFinancialValue: number | null;
  issueTypeCode1: string | null;
  issueTypeCode2: string | null;
  issueRating: string | null;
  issueStatus: string | null;
  unitValueReferenceDate: string | null;
  updatedUnitValue: number | null;
  updatedNominalValue: number | null;
  nominalValueReferenceDate: string | null;
  redemptionUnitValue: number | null;
  depositQuantity: number | null;
  redemptionQuantity: number | null;
  marketQuantity: number | null;
  supplementaryLotIssuedQuantity: number | null;
  additionalIssuedQuantity: number | null;
  withdrawalQuantity: number | null;
  subscribedQuantity: number | null;
  calculationBaseValue: number | null;
  calculationReferenceDate: string | null;
  financialValueReferenceDate: string | null;
  distributionStartDate: string | null;
  distributionEndDate: string | null;
  otcLeadInstitutionAccountCode: string | null;
  distributionStartAnnouncementIndicator: boolean | null;
  leadCoordinatorName: string | null;
  issueCityName: string | null;
  paymentCityName: string | null;
  emissionRestrictedWorkIndicator: boolean | null;
  b3EventAttendedIndicator: boolean | null;
  coobligationIndicator: boolean | null;
  coobligationTypeName: string | null;
  resourceDestinationIndicator: boolean | null;
  articleCode: string | null;
  law12431SupportIndicator: boolean | null;
  law12431SupportRuleCode: string | null;
  law12431ArticleCode: string | null;
  sectionThreeArticleSevenIndicator: boolean | null;
  offerTarget: string | null;
  offerRitual: string | null;
  financialPendencyIndicator: boolean | null;
  securityTypeName: string | null;
  vcpIndexType: string | null;
  vcpIndexDscn: string | null;
  receivableSector: string | null;
  financialStatmentPendingInd: boolean | null;
  tickerSustainable: boolean | null;
  sustainabilityRelationshipTypeName: string | null;
  sustainabilityRelationshipDate: string | null;
  sustainabilityRelationshipName: string | null;
  sustainabilityRelationshipDescription: string | null;
  standardInd: boolean | null;
  sndStandardInd: boolean | null;
  subordinationLevel: string | null;
  fundEconomicNature: string | null;
  instrumentStatusDescription: string;
  controlInternalCode: string | null;
  internalControlNumber: string | null;
  updateLastDate: string | null;
  adjustmentDayCode: string | null;
  financialInstrumentPendencyDescription1: string | null;
  financialInstrumentPendencyDescription2: string | null;
  financialInstrumentPendencyDescription3: string | null;
  financialInstrumentPendencyDescription4: string | null;
  additionalDescription: string | null;
  eventPostponementIndicator: boolean | null;
  adjustmentFrequencyTypeName: string | null;
  adjustmentProRataTypeCode: string | null;
  rateShiftTypeName: string | null;
  adjustmentDate: string | null;
  adjustmentMonthCode: string | null;
  adjustmentIndicator: boolean | null;
  interestRateCalculationTypeName: string | null;
  residualIndicator: boolean | null;
  linkedAccountBankName: string | null;
  linkedAccountBranchName: string | null;
  otcRegisterShortName: string | null;
  otcPaymentAgentAccountCode: string | null;
  otcPaymentAgentShortDocmValue: string | null;
  nonPaymentIndicator: boolean | null;
  paymentMethodName: string | null;
  remunerationBasis: string | null;
  indexerDisplacementCode: string | null;
  interestIndexRate: number | null;
  interestRate: number | null;
  interestRateCriteriaTypeName: string | null;
  interestUnitPriceValue: number | null;
  interestUnitReferenceDate: string | null;
  interestPaymentFrequencyInd: boolean | null;
  interestPaymentFrequency: string | null;
  paymentFrequencyDescription: string | null;
  interestPaymentStartDate: string | null;
  lastInterestDate: string | null;
  nextInterestDate: string | null;
  interestPaymentLastDate: string | null;
  interestRateSpreadValue: number | null;
  calculusReferenceCode: string | null;
  interestAccountingStartDate: string | null;
  timeUnitQuantityIntSpread: number | null;
  timeUnitTypeCode: string | null;
  interestDeadlineTypeCode: string | null;
  deadlineTypeName: string | null;
  calculationTypeName: string | null;
  interestIncorporationIndicator: boolean | null;
  interestIncorporationDate: string | null;
  hybridInterestRateIndicator: boolean | null;
  shiftIndexDayQuantity: number | null;
  amortizationPaymentType: string | null;
  amortizationRate: number | null;
  amortizationFrequency: string | null;
  amortizationFrequencyDescription: string | null;
  amortizationStartDate: string | null;
  nextAmortizationDate: string | null;
  amortizationLastDate: string | null;
  paymentScheduleName: string | null;
  paymentTimeUnitQuantity: number | null;
  paymentTimeUnitTypeCode: string | null;
  amortizationDeadlineTypeName: string | null;
  amortizationTimeUnitQuantity: number | null;
  amortizationTimeUnitTypeCode: string | null;
  deadlineTypeCode: string | null;
  securitizationTermIndicator: boolean | null;
  securitizationDebentureInd: boolean | null;
  securitizationDebentureSubordination: string | null;
  securitizationCompany: string | null;
  sectorReceivableName: string | null;
  securitizationResponsibleName: string | null;
  trusteeAccountCode: string | null;
  trusteeDocmValue: string | null;
  trusteeName: string | null;
  trusteeRegimeInd: boolean | null;
  documentNumber: string | null;
  renegotiationInd: boolean | null;
  renegotiationDate: string | null;
  classification1Name: string | null;
  rating1Name: string | null;
  classification2Name: string | null;
  rating2Name: string | null;
  ratingAgencyName1: string | null;
  ratingCode1: string | null;
  ratingDate1: string | null;
  ratingAgencyName2: string | null;
  ratingCode2: string | null;
  ratingDate2: string | null;
  ratingAgencyName3: string | null;
  ratingCode3: string | null;
  ratingDate3: string | null;
  ratingAgencyName4: string | null;
  ratingCode4: string | null;
  ratingDate4: string | null;
  ballastTypeCode: string | null;
  ballastTypeName: string | null;
  ballastDebtorName: string | null;
  ballastDebtorDocmValue: string | null;
  cvmProvisionalRegistrationDate: string | null;
  cvmRegistrationIndicator: boolean | null;
  cvmDefinitiveRegistrationDate: string | null;
  cvmRegistrationNumber: string | null;
  cvmIndicator: boolean | null;
  cvmInstruction: string | null;
  cvmCode: string | null;
  floatingCollateralIndicator: boolean | null;
  collateralOwnerName: string | null;
  natureGuarantorCode: string | null;
  guarantorCnpj: string | null;
  collateralDescription: string | null;
  collateralInfoDescription: string | null;
  collateralTypeName: string | null;
  collateralTypeDescription: string | null;
  collateralValue: number | null;
  bankNumber: string | null;
  agencyNumber: string | null;
  accountCode: string | null;
  bookkeeperAccountCode: string | null;
  bookkeeperName: string | null;
  otcAccountBookkeeperShortName: string | null;
  bookkeeperDocmValue: string | null;
  custodianInstitutionRegistrationDescription: string | null;
  custodianName: string | null;
  timeUnitQuantityAdjFreq: number | null;
  timeUnitTypeCodeAdjFreq: string | null;
  paymentStartDateAdjFreq: string | null;
  timeUnitQuantityMontAdjPaym: number | null;
  timeUnitTypeCodeMontAdjPaym: string | null;
  paymentStartDateMontAdjPaym: string | null;
  premiumRateValue: number | null;
  calculusReferenceCodePremium: string | null;
  paymentStartDatePremium: string | null;
  timeUnitQuantityPremium: number | null;
  timeUnitTypeCodePremium: string | null;
  deadlineTypeNamePremium: string | null;
  calculationTypeNamePremium: string | null;
  profitSharingDescriptionParticipation: string | null;
  paymentStartDateParticipation: string | null;
  timeUnitQuantityParticipation: number | null;
  timeUnitTypeCodeParticipation: string | null;
  deadlineTypeNameParticipation: string | null;
  repurchaseStartDate: string | null;
  repurchaseEndDate: string | null;
  repurchaseEventDate: string | null;
  repurchaseResponsibleName: string | null;
  renegotiationStartDate: string | null;
  renegotiationEndDate: string | null;
  renegotiationEventDate: string | null;
  sellerName: string | null;
  conversionStartDate: string | null;
  conversionEndDate: string | null;
  conversionCriteriaDetailsText: string | null;
  exchangeStartDate: string | null;
  exchangeEndDate: string | null;
  exchangeCriteriaDetailsText: string | null;
  scripturalEmissionName: string | null;
  earlyRedemptionIndicator: boolean | null;
  earlyRedemptionCondition: string | null;
  optionalRedemptionStartDate: string | null;
  optionalRedemptionEndDate: string | null;
  optionalRedemptionPremiumIndicator: boolean | null;
  optionalRedemptionPremiumValue: number | null;
  earlyRedemptionOptionalCode: string | null;
  redemptionOfferClauseCode: string | null;
  subscriptionPaymentIndicator: boolean | null;
  otcFiduciaryAgentAccountCode: string | null;
  fiduciaryAgentName: string | null;
  fiduciaryAgentCnpj: string | null;
  natureFiduciaryAgentCode: string | null;
  regimeTypeName: string | null;
  sndIndicator: boolean | null;
  nominalValueAdjustmentIndicator: boolean | null;
  indexShortName: string | null;
  profitabilityPercentage: number | null;
  profitabilitySignalCode: string | null;
  simplifiedIndicator: boolean | null;
  otcPaymentAgentIndicator: boolean | null;
  adjustmentFrequencyDayQuantity: number | null;
  curveCalculationIndicator: boolean | null;
  profitabilityStartDate: string | null;
  adjustmentFrequencyDay: number | null;
  projectionTypeCode: string | null;
  curveCalculationName: string | null;
  curveCalculationLimitValue: number | null;
  approvalMeetingDate: string | null;
  assetChangeMessageReasonText: string | null;
  stimulatedDebentureInd: boolean | null;
  exchangeableDebentureInd: boolean | null;
  convertibleDebentureInd: boolean | null;
  meetingTypeName1: string | null;
  approvalMeetingDate1: string | null;
  meetingTypeName2: string | null;
  approvalMeetingDate2: string | null;
  meetingTypeName3: string | null;
  approvalMeetingDate3: string | null;
  meetingTypeName4: string | null;
  approvalMeetingDate4: string | null;
  meetingTypeName5: string | null;
  approvalMeetingDate5: string | null;
  meetingTypeName6: string | null;
  approvalMeetingDate6: string | null;
  leadCoordinatorAccountCode: string | null;
  leadCoordinatorCnpj: string | null;
  referenceDate: string;
  typistAccount: string | null;
  typistName: string | null;
  typistDocmValue: string | null;
  debtor: string | null;
  default: string | null;
  originSystemCode: string | null;
  notaryOfficeRegistrationIndicator: boolean | null;
  creation: string;
  lastUpdate: string;
  status: number;
}

// Interface para a resposta da API de detalhes
export interface IAssetDetailsResponse {
  statusCode: number;
  message: string;
  data: {
    characteristic: IAssetCharacteristic;
    events: IAssetEvent[];
  };
  timestamp: string;
}

export interface IPrivateSecurityRecord extends IBaseAsset {

}


export type PrivateSecurityFilterKey = 
  | 'tickerSymbolTypeCode' 
  | 'tickerSymbol' 
  | 'tickerSymbolSurname' 
  | 'issuerCorporationName' 
  | 'issueDate' 
  | 'maturityDate' 
  | 'instrumentStatusDescription' 
  | 'nonPaymentIndicator';


export interface PrivateSecurityAppliedFilter {
  label: string;
  value: string;
  key: PrivateSecurityFilterKey;
}

export type PrivateSecurityFilters = Record<PrivateSecurityFilterKey, string>;

export const PRIVATE_SECURITY_FILTER_LABELS: Record<PrivateSecurityFilterKey, string> = {
  tickerSymbolTypeCode: 'Tipo do Ativo',
  tickerSymbol: 'Código do Ativo',
  tickerSymbolSurname: 'Apelido do Ativo',
  issuerCorporationName: 'Emissor (Razão Social)',
  issueDate: 'Data Emissão',
  maturityDate: 'Data Vencimento',
  instrumentStatusDescription: 'Situação do Ativo',
  nonPaymentIndicator: 'Inadimplente'
};
