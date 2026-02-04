import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PrivateBoundService } from '../../services';
import { PrivateSecurityRecord } from '../../interfaces';
import { AssetTypeConfig, getAssetTypeConfig, DEFAULT_ASSET_CONFIG } from './private-bound-details.config';

@Component({
  selector: 'app-private-bound-details',
  imports: [CommonModule, Breadcrumb],
  templateUrl: './private-bound-details.html',
  styleUrl: './private-bound-details.scss',
})
export class PrivateBoundDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(PrivateBoundService);

  security: PrivateSecurityRecord | null = null;
  securityCodigo: string | null = null;
  assetConfig: AssetTypeConfig = DEFAULT_ASSET_CONFIG;

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
          this.assetConfig = getAssetTypeConfig(data.tipo);
        } else {
          this.router.navigate(['/asset-registration/private-bound']);
        }
      });
    }
  }

  getFieldValue(key: string): string {
    if (!this.security) return '-';
    
    const fieldMappings: Record<string, () => string> = {
      'status': () => this.security?.situacao || '-',
      'statusDebenture': () => this.security?.situacao || '-',
    };

    if (fieldMappings[key]) {
      return fieldMappings[key]();
    }

    const value = (this.security as unknown as Record<string, unknown>)[key];
    
    if (value === null || value === undefined || value === '') {
      return '-';
    }
    
    return String(value);
  }

  onEditField(fieldKey: string): void {
    console.log('Editar campo:', fieldKey);
  }

  goBack(): void {
    this.router.navigate(['/asset-registration/private-bound']);
  }
}
