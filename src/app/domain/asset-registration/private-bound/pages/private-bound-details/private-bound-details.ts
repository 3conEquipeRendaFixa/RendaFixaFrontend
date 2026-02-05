import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PrivateBoundService } from '../../services';
import { IPrivateSecurityRecord, IDebenture } from '../../interfaces';
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

  security: IPrivateSecurityRecord | null = null;
  debentureDetails: IDebenture | null = null;
  securityCodigo: string | null = null;
  assetConfig: AssetTypeConfig = DEFAULT_ASSET_CONFIG;

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

  private loadSecurityDetails(): void {
    if (this.securityCodigo) {
      this.service.getByCodigo(this.securityCodigo).subscribe(data => {
        if (data) {
          this.security = data;
          this.assetConfig = getAssetTypeConfig(data.tickerSymbolTypeCode);
          
          // Se for uma debênture, carregar detalhes específicos
          if (data.tickerSymbolTypeCode === 'DEB') {
            this.loadDebentureDetails(data.tickerSymbol);
          }
        } else {
          this.router.navigate(['/asset-registration/private-bound']);
        }
      });
    }
  }

  private loadDebentureDetails(tickerSymbol: string): void {
    this.service.getDebentureDetails(tickerSymbol).subscribe(data => {
      this.debentureDetails = data;
    });
  }

  getFieldValue(key: string): string {
    // Para debêntures, priorizar dados específicos da interface IDebenture
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
