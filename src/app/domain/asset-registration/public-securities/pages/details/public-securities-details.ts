import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PublicSecuritiesService } from '../../services';
import { PublicSecurityRecord } from '../../interfaces';

@Component({
  selector: 'app-public-securities-details',
  imports: [CommonModule, Breadcrumb],
  templateUrl: './public-securities-details.html',
  styleUrl: './public-securities-details.scss',
})
export class PublicSecuritiesDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(PublicSecuritiesService);

  security: PublicSecurityRecord | null = null;
  securityCodigo: string | null = null;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE ATIVOS', route: '' },
    { label: 'TÍTULOS PÚBLICOS', route: '/asset-registration/public-securities' },
    { label: 'DETALHES', current: true }
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
        } else {
          this.router.navigate(['/asset-registration/public-securities']);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/asset-registration/public-securities']);
  }
}
