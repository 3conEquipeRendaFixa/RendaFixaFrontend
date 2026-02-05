import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { 
  IPrivateSecurityRecord, 
  PrivateSecurityFilters,
  IDebenture,
  IPrivateFixedIncomeCharact
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrivateBoundService {
  private readonly http = inject(HttpClient);

  /**
   * Mock data para desenvolvimento
   * Baseado em TRM_RF_PRIV_FIX_INC_CHARAC
   */
  private mockData: IPrivateSecurityRecord[] = [
    { tickerSymbolTypeCode: 'DEB', tickerSymbol: 'DEB030008AB', tickerSymbolSurname: 'DEBÊNTURE', issuerCorporationName: 'BCO ITAU', registerName: 'B3', issueDate: '10022025', maturityDate: '10032025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
    { tickerSymbolTypeCode: 'CRI', tickerSymbol: 'CRI030008XB', tickerSymbolSurname: 'CRI', issuerCorporationName: 'BCO ITAU', registerName: 'B3', issueDate: '10022025', maturityDate: '10032025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
    { tickerSymbolTypeCode: 'CRA', tickerSymbol: 'CRA020005VD', tickerSymbolSurname: 'CRA', issuerCorporationName: 'BCO BRADESCO', registerName: 'B3', issueDate: '10022025', maturityDate: '20032025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
    { tickerSymbolTypeCode: 'CBIO', tickerSymbol: 'CBIO40007890', tickerSymbolSurname: 'CBIO', issuerCorporationName: 'BCO ITAU', registerName: 'B3', issueDate: '10022025', maturityDate: '25032025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
    { tickerSymbolTypeCode: 'CFF', tickerSymbol: 'CFF030006TR', tickerSymbolSurname: 'CFF', issuerCorporationName: 'BCO SANTANDER', registerName: 'B3', issueDate: '10022025', maturityDate: '01042025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
    { tickerSymbolTypeCode: 'LF', tickerSymbol: 'LF0030009HU', tickerSymbolSurname: 'LF', issuerCorporationName: 'BCO SANTANDER', registerName: 'B3', issueDate: '10022025', maturityDate: '02052025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
    { tickerSymbolTypeCode: 'LCI', tickerSymbol: 'LCI030009HU', tickerSymbolSurname: 'LCI', issuerCorporationName: 'BCO SANTANDER', registerName: 'B3', issueDate: '10022025', maturityDate: '02052025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
    { tickerSymbolTypeCode: 'LCA', tickerSymbol: 'LCA030009HU', tickerSymbolSurname: 'LCA', issuerCorporationName: 'BCO SANTANDER', registerName: 'B3', issueDate: '10022025', maturityDate: '02052025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
    { tickerSymbolTypeCode: 'CDB', tickerSymbol: 'CDB030008AB', tickerSymbolSurname: 'CDB', issuerCorporationName: 'BCO ITAU', registerName: 'B3', issueDate: '10022025', maturityDate: '10032025', instrumentStatusDescription: 'Confirmado sem Restrição', nonPaymentIndicator: false },
  ]

  getAll(filters?: PrivateSecurityFilters): Observable<IPrivateSecurityRecord[]> {
    return of(this.mockData);
  }

  getByCodigo(codigo: string): Observable<IPrivateSecurityRecord | undefined> {
    return of(this.mockData.find(item => item.tickerSymbol === codigo));
  }

  getDebentureDetails(tickerSymbol: string): Observable<IDebenture | null> {
    // Mock data específico para Debêntures
    // Em produção, retornaria dados da API específica para DEB
    const mockDebenture: IDebenture = {
      tickerSymbol: tickerSymbol,
      tickerSymbolSurname: 'DEBÊNTURE',
      issuerCorporationName: 'BCO ITAU',
      issuerDocumentNumber: '60701190000104',
      issueNumber: '001',
      issueTypeName: 'Pública',
      scripturalEmissionName: 'Escritural',
      emissionRestrictedWorkIndicator: false,
      law12431SupportIndicator: true,
      law12431SupportRuleCode: 'LEI001',
      instrumentStatusDescription: 'Confirmado sem Restrição',
      updateLastDate: '10022025',
      otcAccountBookkeeperShortName: 'ITAU',
      collateralTypeName: 'Quirografária',
      issueDate: '10022025',
      maturityDate: '10032025',
      classTypeName: 'Simples',
      nonPaymentIndicator: false,
      fiduciaryAgentName: 'Agente XYZ',
      seriesIdentificationCode: 'A',
      regimeTypeName: 'Depositado',
      securitizationDebentureInd: false,
      b3EventAttendedIndicator: true,
      offerRitual: 'Público',
      financialStatmentPendingInd: false,
      earlyRedemptionIndicator: true,
      isinCode: 'BR0000000001',
      subscriptionPaymentIndicator: false,
      // Quantidade
      issueQuantity: 1000000,
      depositQuantity: 1000000,
      redemptionQuantity: 0,
      // Valores
      nominalUnitValue: 1000.00,
      issueTotalValue: 1000000000.00,
      updatedNominalValue: 1050.00,
      nominalValueReferenceDate: '05022026',
      // Remuneração
      sndIndicator: false,
      adjustmentFrequencyDayQuantity: 252,
      profitabilityStartDate: '10022025',
      adjustmentFrequencyDay: 15,
      indexShortName: 'CDI',
      curveCalculationIndicator: true,
      profitabilityPercentage: 105.5,
      projectionTypeCode: 'PROJ001',
      nominalValueAdjustmentIndicator: true,
      // Juros/Spread
      eventRateValue: 12.5,
      interestPaymentStartDate: '10032025',
      interestPaymentFrequency: 'Semestral',
      interestPaymentIndicator: false,
      // Amortização
      amortizationPaymentType: 'No Vencimento',
      amortizationStartDate: '10032025',
      amortizationFrequency: 'Única',
      // Distribuição
      distributionStartDate: '01022025',
      distributionEndDate: '09022025',
      // Dados do Título Sustentável
      tickerSustainable: false,
      // Negociação de Valores Mobiliários
      tradingAdimittedInd: true,
      negociationStatus: 'Ativo',
      blockingReason: ''
    };
    return of(mockDebenture);
  }

  getAssetTypes(): Observable<string[]> {
    return of(['DEB', 'CRI', 'CRA', 'CBIO', 'CFF', 'LF', 'LCI', 'LCA', 'CDB']);
  }

  getSituations(): Observable<string[]> {
    return of(['Confirmado sem Restrição', 'Pendente', 'Cancelado']);
  }
}
