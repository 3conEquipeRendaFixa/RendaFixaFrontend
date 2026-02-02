import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PrivateSecuritiesService } from '../../services';
import { PrivateSecurityRecord } from '../../interfaces';

@Component({
  selector: 'app-private-securities-details',
  imports: [CommonModule, Breadcrumb],
  templateUrl: './private-securities-details.html',
  styleUrl: './private-securities-details.scss',
})
export class PrivateSecuritiesDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(PrivateSecuritiesService);

  security: PrivateSecurityRecord | null = null;
  securityCodigo: string | null = null;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE ATIVOS', route: '' },
    { label: 'TÍTULOS PRIVADOS', route: '/asset-registration/private-securities' },
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
          // Redireciona de volta para a lista se não encontrar
          this.router.navigate(['/asset-registration/private-securities']);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/asset-registration/private-securities']);
  }
}
