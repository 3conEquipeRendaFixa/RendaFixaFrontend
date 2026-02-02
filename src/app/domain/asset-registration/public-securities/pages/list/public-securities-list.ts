import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grid, GridColumn, GridAction } from '@widget/components/grid/grid';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PublicSecuritiesService } from '../../services';
import { 
  PublicSecurityRecord, 
  PublicSecurityFilterKey, 
  PublicSecurityAppliedFilter,
  PublicSecurityFilters,
  PUBLIC_SECURITY_FILTER_LABELS 
} from '../../interfaces';

@Component({
  selector: 'app-public-securities-list',
  imports: [CommonModule, FormsModule, Grid, Breadcrumb],
  templateUrl: './public-securities-list.html',
  styleUrl: './public-securities-list.scss',
})
export class PublicSecuritiesList implements OnInit {
  private readonly service = inject(PublicSecuritiesService);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE ATIVOS', route: '' },
    { label: 'TÍTULOS PÚBLICOS', current: true }
  ];

  filters: PublicSecurityFilters = {
    tipoAtivo: '',
    codigoAtivo: '',
    apelidoAtivo: '',
    emissor: '',
    dataEmissao: '',
    dataVencimento: '',
    situacaoAtivo: ''
  };

  appliedFilters: PublicSecurityAppliedFilter[] = [];
  securities: PublicSecurityRecord[] = [];

  gridColumns: GridColumn[] = [
    { key: 'registradora', label: 'Registradora', width: '10%', sortable: true },
    { key: 'tipo', label: 'Tipo do Ativo', width: '12%', sortable: true },
    { key: 'codigo', label: 'Código do Ativo', width: '14%', sortable: true },
    { key: 'apelido', label: 'Apelido do Ativo', width: '14%', sortable: true },
    { key: 'emissor', label: 'Emissor', width: '18%', sortable: true },
    { key: 'dataEmissao', label: 'Data Emissão', width: '10%', sortable: true },
    { key: 'dataVencimento', label: 'Data Vencimento', width: '10%', sortable: true },
    { key: 'situacao', label: 'Situação', width: '10%', sortable: true },
  ];

  gridActions: GridAction[] = [
    { 
      icon: 'icons/options.svg', 
      label: 'Mais opções',
      route: '/asset-registration/public-securities/details',
      routeIdKey: 'codigo'
    }
  ];

  ngOnInit(): void {
    this.loadSecurities();
  }

  private loadSecurities(): void {
    this.service.getAll(this.filters).subscribe(data => {
      this.securities = data;
    });
  }

  searchFilter(): void {
    this.appliedFilters = [];
    
    Object.entries(this.filters).forEach(([key, value]) => {
      if (value) {
        this.appliedFilters.push({
          label: PUBLIC_SECURITY_FILTER_LABELS[key as PublicSecurityFilterKey],
          value: value,
          key: key as PublicSecurityFilterKey
        });
      }
    });

    this.loadSecurities();
  }

  removeFilter(filterKey: PublicSecurityFilterKey): void {
    this.filters[filterKey] = '';
    this.appliedFilters = this.appliedFilters.filter(f => f.key !== filterKey);
    this.loadSecurities();
  }

  hasFilters(): boolean {
    return Object.values(this.filters).some(value => value !== '');
  }

  get filteredResults(): number {
    return this.securities.length;
  }

  onRowClick(item: PublicSecurityRecord): void {
    console.log('Row clicked:', item);
  }

  onActionClick(event: { action: GridAction; item: PublicSecurityRecord }): void {
    console.log('Action clicked:', event.action.label, event.item);
  }
}
