import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PrivateBoundService } from '../../services';
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

      console.log('Buscando detalhes do ativo:', this.securityCodigo);

      // Busca os detalhes completos do ativo da API
      this.service.getAssetDetails('B3', this.securityCodigo).subscribe({
        next: (response) => {
          console.log('Detalhes do ativo carregados:', this.securityCodigo, response);

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
            this.cdr.detectChanges(); // Força detecção de mudanças
          } else {
            console.error('Resposta da API sem dados:', response);
            this.errorMessage = 'Dados do ativo não encontrados';
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Erro ao buscar detalhes do ativo:', error);
          this.errorMessage = 'Erro ao carregar os detalhes do ativo. Verifique se a API está rodando e se o CORS está configurado.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    }
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

    this.service.updateAssetSurname('B3', this.securityCodigo, this.editingValue).subscribe({
      next: (response) => {
        console.log('Apelido atualizado com sucesso:', response);

        // Atualiza o valor local após sucesso na API
        if (this.assetCharacteristic) {
          this.assetCharacteristic.tickerSymbolSurname = this.editingValue;
        }
        if (this.security) {
          this.security.tickerSymbolSurname = this.editingValue;
        }
        if (this.debentureDetails) {
          this.debentureDetails.tickerSymbolSurname = this.editingValue;
        }

        this.cancelEdit();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao atualizar apelido:', error);
        alert('Erro ao atualizar o apelido do ativo. Tente novamente.');
      }
    });
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
