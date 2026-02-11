import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import {
  IPrivateSecurityRecord,
  PrivateSecurityFilters,
  IDebenture,
  IPrivateSecurityListResponse,
  IAssetDetailsResponse,
  IAssetCharacteristic,
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrivateBoundService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Busca lista de ativos privados
   */
  getAll(filters?: PrivateSecurityFilters): Observable<IPrivateSecurityRecord[]> {
    let params = new HttpParams();
    params = params.set('exchange', 'B3');

    // Adiciona o filtro de tipo de ativo (obrigatório na primeira carga)
    if (filters?.tickerSymbolTypeCode) {
      params = params.set('tickerSymbolTypeCode', filters.tickerSymbolTypeCode);
    } else {
      // Se não tiver filtro, busca DEB por padrão para ter dados iniciais
      params = params.set('tickerSymbolTypeCode', 'DEB');
    }

    // Adiciona outros filtros se existirem
    if (filters?.tickerSymbol) {
      params = params.set('tickerSymbol', filters.tickerSymbol);
    }
    if (filters?.tickerSymbolSurname) {
      params = params.set('tickerSymbolSurname', filters.tickerSymbolSurname);
    }
    if (filters?.issuerCorporationName) {
      params = params.set('issuerCorporationName', filters.issuerCorporationName);
    }
    if (filters?.issueDate) {
      params = params.set('issueDate', filters.issueDate);
    }
    if (filters?.maturityDate) {
      params = params.set('maturityDate', filters.maturityDate);
    }
    if (filters?.instrumentStatusDescription) {
      params = params.set('instrumentStatusDescription', filters.instrumentStatusDescription);
    }
    if (filters?.nonPaymentIndicator) {
      params = params.set('nonPaymentIndicator', filters.nonPaymentIndicator);
    }

    return this.http.get<IPrivateSecurityListResponse>(`${this.apiUrl}/bonds/fix-inc-charac-list`, { params })
      .pipe(
        map(response => {
          // Adapta os dados da API para o formato esperado pelo grid
          return response.data.map(item => this.adaptApiDataToRecord(item, filters?.tickerSymbolTypeCode || 'DEB'));
        })
      );
  }

  /**
   * Adapta os dados da API para o formato IPrivateSecurityRecord
   */
  private adaptApiDataToRecord(apiData: any, tickerSymbolTypeCode: string): IPrivateSecurityRecord {
    return {
      tickerSymbol: apiData.tickerSymbol || '-',
      tickerSymbolSurname: apiData.tickerSymbolSurname || '-',
      issuerCorporationName: apiData.issuerCorporationName || '-',
      issueDate: apiData.issueDate || '-',
      maturityDate: apiData.maturityDate || '-',
      instrumentStatusDescription: apiData.instrumentStatusDescription || '-',
      tickerSymbolTypeCode: tickerSymbolTypeCode,
      registerName: 'B3',
      nonPaymentIndicator: false
    };
  }

  /**
   * Busca um ativo por código (usado na listagem básica)
   */
  getByCode(code: string): Observable<IPrivateSecurityRecord | undefined> {
    // Este método pode ser removido ou adaptado conforme necessário
    // Por enquanto mantém a lógica de buscar detalhes
    return this.getAssetDetails('B3', code).pipe(
      map(response => {
        if (response && response.data) {
          const char = response.data.characteristic;
          return {
            tickerSymbol: char.tickerSymbol || '-',
            tickerSymbolSurname: char.tickerSymbolSurname || '-',
            issuerCorporationName: char.issuerCorporationName || '-',
            issueDate: char.issueDate || '-',
            maturityDate: char.maturityDate || '-',
            instrumentStatusDescription: char.instrumentStatusDescription || '-',
            tickerSymbolTypeCode: char.tickerSymbolTypeCode || '-',
            registerName: char.exchange || 'B3',
            nonPaymentIndicator: char.nonPaymentIndicator || false
          };
        }
        return undefined;
      })
    );
  }

  /**
   * Busca detalhes completos de um ativo específico
   */
  getAssetDetails(exchange: string, tickerSymbol: string): Observable<IAssetDetailsResponse | null> {
    const params = new HttpParams()
      .set('exchange', exchange.toLowerCase())
      .set('tickerSymbol', tickerSymbol.toLowerCase());

    return this.http.get<IAssetDetailsResponse>(`${this.apiUrl}/bonds/fix-inc-charac`, { params });
  }

  /**
   * Busca detalhes de debênture (mantido para compatibilidade)
   */
  getDebentureDetails(tickerSymbol: string): Observable<IDebenture | null> {
    return this.getAssetDetails('B3', tickerSymbol).pipe(
      map(response => {
        if (response && response.data) {
          const char = response.data.characteristic;
          // Adapta IAssetCharacteristic para IDebenture
          return this.adaptCharacteristicToDebenture(char);
        }
        return null;
      })
    );
  }

  /**
   * Adapta IAssetCharacteristic para IDebenture
   */
  private adaptCharacteristicToDebenture(char: IAssetCharacteristic): IDebenture {
    return {
      tickerSymbol: char.tickerSymbol || '-',
      tickerSymbolSurname: char.tickerSymbolSurname || '-',
      issuerCorporationName: char.issuerCorporationName || '-',
      issuerDocumentNumber: char.issuerDocumentNumber || '-',
      issueNumber: char.issueNumber || '-',
      issueTypeName: char.issueTypeName || '-',
      scripturalEmissionName: char.scripturalEmissionName || '-',
      emissionRestrictedWorkIndicator: char.emissionRestrictedWorkIndicator || false,
      law12431SupportIndicator: char.law12431SupportIndicator || false,
      law12431SupportRuleCode: char.law12431SupportRuleCode || '-',
      instrumentStatusDescription: char.instrumentStatusDescription || '-',
      updateLastDate: char.updateLastDate || '-',
      otcAccountBookkeeperShortName: char.otcAccountBookkeeperShortName || '-',
      collateralTypeName: char.collateralTypeName || '-',
      issueDate: char.issueDate || '-',
      maturityDate: char.maturityDate || '-',
      classTypeName: char.classTypeName || '-',
      nonPaymentIndicator: char.nonPaymentIndicator || false,
      fiduciaryAgentName: char.fiduciaryAgentName || '-',
      seriesIdentificationCode: char.seriesIdentificationCode || '-',
      regimeTypeName: char.regimeTypeName || '-',
      securitizationDebentureInd: char.securitizationDebentureInd || false,
      b3EventAttendedIndicator: char.b3EventAttendedIndicator || false,
      offerRitual: char.offerRitual || '-',
      financialStatmentPendingInd: char.financialStatmentPendingInd || false,
      earlyRedemptionIndicator: char.earlyRedemptionIndicator || false,
      isinCode: char.isinCode || '-',
      subscriptionPaymentIndicator: char.subscriptionPaymentIndicator || false,
      issueQuantity: char.issueQuantity || 0,
      depositQuantity: char.depositQuantity || 0,
      redemptionQuantity: char.redemptionQuantity || 0,
      nominalUnitValue: char.nominalUnitValue || 0,
      issueTotalValue: char.issueTotalValue || 0,
      updatedNominalValue: char.updatedNominalValue || 0,
      nominalValueReferenceDate: char.nominalValueReferenceDate || '-',
      sndIndicator: char.sndIndicator || false,
      adjustmentFrequencyDayQuantity: char.adjustmentFrequencyDayQuantity || 0,
      profitabilityStartDate: char.profitabilityStartDate || '-',
      adjustmentFrequencyDay: char.adjustmentFrequencyDay || 0,
      indexShortName: char.indexShortName || '-',
      curveCalculationIndicator: char.curveCalculationIndicator || false,
      profitabilityPercentage: char.profitabilityPercentage || 0,
      projectionTypeCode: char.projectionTypeCode || '-',
      nominalValueAdjustmentIndicator: char.nominalValueAdjustmentIndicator || false,
      eventRateValue: 0,
      interestPaymentStartDate: char.interestPaymentStartDate || '-',
      interestPaymentFrequency: char.interestPaymentFrequency || '-',
      interestPaymentIndicator: false,
      amortizationPaymentType: char.amortizationPaymentType || '-',
      amortizationStartDate: char.amortizationStartDate || '-',
      amortizationFrequency: char.amortizationFrequency || '-',
      distributionStartDate: char.distributionStartDate || '-',
      distributionEndDate: char.distributionEndDate || '-',
      tickerSustainable: char.tickerSustainable || false,
      tradingAdimittedInd: char.tradingAdmittedInd || false,
      negociationStatus: char.negociationStatus || '-',
      blockingReason: char.blockingReason || '-'
    };
  }

  getAssetTypes(): Observable<string[]> {
    return of(['DEB', 'CRI', 'CRA', 'CBIO', 'CFF', 'LF', 'LCI', 'LCA', 'CDB']);
  }

  getSituations(): Observable<string[]> {
    return of(['Confirmado sem Restrição', 'Pendente', 'Cancelado']);
  }

  /**
   * Atualiza o apelido (surname) de um ativo
   */
  updateAssetSurname(exchange: string, tickerSymbol: string, newSurname: string): Observable<any> {
    const url = `${this.apiUrl}/bonds/fix-inc-charac/${exchange}/${tickerSymbol}/surname`;
    const body = { tickerSymbolSurname: newSurname };

    console.log('Atualizando apelido do ativo:', { exchange, tickerSymbol, newSurname });

    return this.http.patch(url, body);
  }
}
