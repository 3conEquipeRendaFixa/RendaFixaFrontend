import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PublicBoundsService } from '../../services';
import { PublicSecurityRecord } from '../../interfaces';

@Component({
  selector: 'app-public-bounds-details',
  imports: [CommonModule, Breadcrumb],
  templateUrl: './public-bounds-details.html',
  styleUrl: './public-bounds-details.scss',
})
export class PublicBoundsDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(PublicBoundsService);

  security: PublicSecurityRecord | null = null;
  securityCodigo: string | null = null;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE ATIVOS', route: '' },
    { label: 'TÍTULOS PÚBLICOS', current: true }
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
          this.router.navigate(['/asset-registration/public-bounds']);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/asset-registration/public-bounds']);
  }
}
