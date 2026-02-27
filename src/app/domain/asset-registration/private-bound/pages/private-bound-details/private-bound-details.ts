import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PrivateBoundService, PrivateBoundStateService } from '../../services';
import { IPrivateSecurityRecord, IDebenture, IAssetCharacteristic, IAssetEvent } from '../../interfaces';
import { AssetTypeConfig, getAssetTypeConfig, DEFAULT_ASSET_CONFIG } from './private-bound-details.config';

@Component({
  selector: 'app-private-bound-details',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './private-bound-details.html',
  styleUrl: './private-bound-details.scss',
})
export class PrivateBoundDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(PrivateBoundService);
  private readonly stateService = inject(PrivateBoundStateService);
  private readonly cdr = inject(ChangeDetectorRef);

  security: IPrivateSecurityRecord | null = null;
  debentureDetails: IDebenture | null = null;
  assetCharacteristic: IAssetCharacteristic | null = null;
  assetEvents: IAssetEvent[] = [];
  securityCodigo: string | null = null;
  assetConfig: AssetTypeConfig = DEFAULT_ASSET_CONFIG;

  isLoading = true;
  errorMessage: string | null = null;

  editingField: string | null = null;
  editingValue: string = '';

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE ATIVOS', route: '' },
    { label: 'TÍTULOS PRIVADOS', current: true }
  ];

  ngOnInit(): void {
    const codigoParam = this.route.snapshot.paramMap.get('codigo');
    if (codigoParam) {
      this.securityCodigo = codigoParam;
      this.loadSecurityDetails();
    }
  }

  loadSecurityDetails(): void {
    if (this.securityCodigo) {
      this.isLoading = true;
      this.errorMessage = null;

      // Busca os detalhes completos do ativo da API
      this.service.getAssetDetails('B3', this.securityCodigo).subscribe({
        next: (response) => {
          if (response && response.data) {
            const characteristic = response.data.characteristic;

            // Armazena os dados completos da API
            this.assetCharacteristic = characteristic;
            this.assetEvents = response.data.events;

            // Cria o objeto de segurança básico para compatibilidade
            this.security = {
              tickerSymbol: characteristic.tickerSymbol,
              tickerSymbolSurname: characteristic.tickerSymbolSurname,
              issuerCorporationName: characteristic.issuerCorporationName || '',
              issueDate: characteristic.issueDate || '',
              maturityDate: characteristic.maturityDate || '',
              instrumentStatusDescription: characteristic.instrumentStatusDescription,
              tickerSymbolTypeCode: characteristic.tickerSymbolTypeCode,
              registerName: characteristic.exchange,
              nonPaymentIndicator: characteristic.nonPaymentIndicator || false
            };

            // Define a configuração de campos baseada no tipo de ativo
            this.assetConfig = getAssetTypeConfig(characteristic.tickerSymbolTypeCode);

            // Se for uma debênture, também adapta para IDebenture para compatibilidade
            if (characteristic.tickerSymbolTypeCode === 'DEB') {
              this.loadDebentureDetails(characteristic.tickerSymbol);
            }

            this.isLoading = false;
            this.cdr.detectChanges();
          } else {
            this.loadMockDebentureData();
          }
        },
        error: () => {
          this.loadMockDebentureData();
        }
      });
    }
  }

  private loadMockDebentureData(): void {
    const cachedSecurities = this.stateService.getSecurities();
    const cachedItem = cachedSecurities.find(s => s.tickerSymbol === this.securityCodigo);

    const mockCharacteristic = {
      tickerSymbol: this.securityCodigo || 'DEB0001',
      tickerSymbolSurname: cachedItem?.tickerSymbolSurname || 'Debênture',
      tickerSymbolTypeCode: 'DEB',
      issuerCorporationName: 'Empresa Exemplo S.A.',
      issuerDocumentNumber: '12.345.678/0001-99',
      issueNumber: '1',
      issueTypeName: 'Pública',
      scripturalEmissionName: 'Escritural',
      emissionRestrictedWorkIndicator: false,
      law12431SupportIndicator: true,
      law12431SupportRuleCode: 'Art. 2º',
      instrumentStatusDescription: 'Confirmado sem Restrição',
      updateLastDate: '15/01/2026',
      otcAccountBookkeeperShortName: 'BANCO ESCRITURADOR',
      collateralTypeName: 'Quirografária',
      issueDate: '01/06/2024',
      maturityDate: '01/06/2029',
      classTypeName: 'Simples',
      nonPaymentIndicator: false,
      fiduciaryAgentName: 'Agente Fiduciário Ltda.',
      seriesIdentificationCode: '001',
      regimeTypeName: 'Depositado',
      securitizationDebentureInd: false,
      b3EventAttendedIndicator: true,
      offerRitual: 'ICVM 400',
      financialStatmentPendingInd: false,
      earlyRedemptionIndicator: true,
      isinCode: 'BRDEB0DEB001',
      subscriptionPaymentIndicator: false,
      exchange: 'B3',
      issueQuantity: 50000,
      depositQuantity: 48500,
      redemptionQuantity: 1500,
      nominalUnitValue: 1000.00,
      issueTotalValue: 50000000.00,
      updatedNominalValue: 1052.37,
      nominalValueReferenceDate: '10/02/2026',
      sndIndicator: true,
      adjustmentFrequencyDayQuantity: 252,
      profitabilityStartDate: '01/06/2024',
      adjustmentFrequencyDay: 15,
      indexShortName: 'IPCA',
      curveCalculationIndicator: true,
      profitabilityPercentage: 100,
      projectionTypeCode: 'ANBIMA',
      nominalValueAdjustmentIndicator: true,
      eventRateValue: 5.75,
      interestPaymentStartDate: '01/12/2024',
      interestPaymentFrequency: 'Semestral',
      interestPaymentIndicator: false,
      amortizationPaymentType: 'Percentual Fixo',
      amortizationStartDate: '01/06/2026',
      amortizationFrequency: 'Anual',
      distributionStartDate: '01/05/2024',
      distributionEndDate: '31/05/2024',
      tickerSustainable: false,
      tradingAdimittedInd: true,
      negociationStatus: 'Ativo',
      blockingReason: '-',
    } as unknown as IAssetCharacteristic;

    this.assetCharacteristic = mockCharacteristic;
    this.assetEvents = [];

    this.security = {
      tickerSymbol: mockCharacteristic.tickerSymbol,
      tickerSymbolSurname: mockCharacteristic.tickerSymbolSurname || '',
      issuerCorporationName: mockCharacteristic.issuerCorporationName || '',
      issueDate: mockCharacteristic.issueDate || '',
      maturityDate: mockCharacteristic.maturityDate || '',
      instrumentStatusDescription: mockCharacteristic.instrumentStatusDescription,
      tickerSymbolTypeCode: mockCharacteristic.tickerSymbolTypeCode,
      registerName: mockCharacteristic.exchange,
      nonPaymentIndicator: mockCharacteristic.nonPaymentIndicator || false
    };

    this.assetConfig = getAssetTypeConfig('DEB');
    this.isLoading = false;
    this.errorMessage = null;
    this.cdr.detectChanges();
  }

  private loadDebentureDetails(tickerSymbol: string): void {
    // Mantém compatibilidade com a interface IDebenture
    this.service.getDebentureDetails(tickerSymbol).subscribe(data => {
      this.debentureDetails = data;
    });
  }

  getFieldValue(key: string): string {
    // Prioriza os dados da característica do ativo (assetCharacteristic) retornados pela API
    if (this.assetCharacteristic) {
      const charValue = (this.assetCharacteristic as unknown as Record<string, unknown>)[key];
      if (charValue !== null && charValue !== undefined && charValue !== '') {
        return this.formatValue(charValue);
      }
    }

    // Para debêntures, priorizar dados específicos da interface IDebenture (mantém compatibilidade)
    if (this.security?.tickerSymbolTypeCode === 'DEB' && this.debentureDetails) {
      const debentureValue = (this.debentureDetails as unknown as Record<string, unknown>)[key];
      if (debentureValue !== null && debentureValue !== undefined && debentureValue !== '') {
        return this.formatValue(debentureValue);
      }
    }

    // Fallback para dados gerais da IPrivateSecurityRecord
    if (!this.security) return '-';

    const fieldMappings: Record<string, () => string> = {
      'status': () => this.security?.instrumentStatusDescription || '-',
      'statusDebenture': () => this.security?.instrumentStatusDescription || '-',
    };

    if (fieldMappings[key]) {
      return fieldMappings[key]();
    }

    const value = (this.security as unknown as Record<string, unknown>)[key];

    if (value === null || value === undefined || value === '') {
      return '-';
    }

    return this.formatValue(value);
  }

  private formatValue(value: unknown): string {
    // Converter booleanos para Sim/Não
    if (typeof value === 'boolean') {
      return value ? 'Sim' : 'Não';
    }
    return String(value);
  }

  onEditField(fieldKey: string): void {
    this.editingField = fieldKey;
    this.editingValue = this.getFieldValue(fieldKey);
    if (this.editingValue === '-') {
      this.editingValue = '';
    }
  }

  onConfirmEdit(): void {
    if (this.editingField && this.security) {
      // Se estiver editando o apelido do ativo, faz a chamada PATCH para a API
      if (this.editingField === 'tickerSymbolSurname') {
        this.updateAssetSurname();
        return;
      }

      // Prioriza salvar em assetCharacteristic se existir
      if (this.assetCharacteristic) {
        const charHasField = (this.assetCharacteristic as unknown as Record<string, unknown>)[this.editingField] !== undefined;
        if (charHasField) {
          (this.assetCharacteristic as unknown as Record<string, unknown>)[this.editingField] = this.editingValue;
          this.cancelEdit();
          return;
        }
      }

      // Para debêntures, salvar na interface específica se o campo existe lá
      if (this.security.tickerSymbolTypeCode === 'DEB' && this.debentureDetails) {
        const debentureHasField = (this.debentureDetails as unknown as Record<string, unknown>)[this.editingField] !== undefined;
        if (debentureHasField) {
          (this.debentureDetails as unknown as Record<string, unknown>)[this.editingField] = this.editingValue;
        } else {
          // Se não existe na interface de debênture, salvar na interface geral
          (this.security as unknown as Record<string, unknown>)[this.editingField] = this.editingValue;
        }
      } else {
        // Para outros tipos de ativos, salvar na interface geral
        (this.security as unknown as Record<string, unknown>)[this.editingField] = this.editingValue;
      }
      this.cancelEdit();
    }
  }

  onCancelEdit(): void {
    this.cancelEdit();
  }

  private updateAssetSurname(): void {
    if (!this.security || !this.securityCodigo) return;

    const newValue = this.editingValue;

    this.service.updateAssetSurname('B3', this.securityCodigo, newValue).subscribe({
      next: () => {
        this.applyLocalSurnameUpdate(newValue);
      },
      error: () => {
        // Atualiza localmente mesmo quando a API falha (mock/fallback)
        this.applyLocalSurnameUpdate(newValue);
      }
    });
  }

  private applyLocalSurnameUpdate(newValue: string): void {
    if (this.assetCharacteristic) {
      this.assetCharacteristic.tickerSymbolSurname = newValue;
    }
    if (this.security) {
      this.security.tickerSymbolSurname = newValue;
    }
    if (this.debentureDetails) {
      this.debentureDetails.tickerSymbolSurname = newValue;
    }
    if (this.securityCodigo) {
      this.stateService.updateSecuritySurname(this.securityCodigo, newValue);
    }
    this.cancelEdit();
    this.cdr.detectChanges();
  }

  private cancelEdit(): void {
    this.editingField = null;
    this.editingValue = '';
  }

  isEditing(fieldKey: string): boolean {
    return this.editingField === fieldKey;
  }

  goBack(): void {
    this.router.navigate(['/asset-registration/private-bound']);
  }
}
