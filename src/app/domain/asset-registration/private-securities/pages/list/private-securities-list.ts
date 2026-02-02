import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grid, GridColumn, GridAction } from '@widget/components/grid/grid';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { PrivateSecuritiesService } from '../../services';
import { 
  PrivateSecurityRecord, 
  PrivateSecurityFilterKey, 
  PrivateSecurityAppliedFilter,
  PrivateSecurityFilters,
  PRIVATE_SECURITY_FILTER_LABELS 
} from '../../interfaces';

@Component({
  selector: 'app-private-securities-list',
  imports: [CommonModule, FormsModule, Grid, Breadcrumb],
  templateUrl: './private-securities-list.html',
  styleUrl: './private-securities-list.scss',
})
export class PrivateSecuritiesList implements OnInit {
  private readonly service = inject(PrivateSecuritiesService);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE ATIVOS', route: '' },
    { label: 'TÍTULOS PRIVADOS', current: true }
  ];

  filters: PrivateSecurityFilters = {
    tipoAtivo: '',
    codigoAtivo: '',
    apelidoAtivo: '',
    emissor: '',
    dataEmissao: '',
    dataVencimento: '',
    situacaoAtivo: '',
    inadimplente: ''
  };

  inadimplenteSwitch = false;
  appliedFilters: PrivateSecurityAppliedFilter[] = [];
  securities: PrivateSecurityRecord[] = [];

  gridColumns: GridColumn[] = [
    { key: 'registradora', label: 'Registradora', width: '8%', sortable: true },
    { key: 'tipo', label: 'Tipo do Ativo', width: '8%', sortable: true },
    { key: 'codigo', label: 'Código do Ativo', width: '12%', sortable: true },
    { key: 'apelido', label: 'Apelido do Ativo', width: '10%', sortable: true },
    { key: 'emissor', label: 'Emissor (Razão Social)', width: '20%', sortable: true },
    { key: 'dataEmissao', label: 'Data Emissão', width: '10%', sortable: true },
    { key: 'dataVencimento', label: 'Data Vencimento', width: '10%', sortable: true },
    { key: 'situacao', label: 'Situação do Ativo', width: '18%', sortable: true },
  ];

  gridActions: GridAction[] = [
    { 
      icon: 'icons/options.svg', 
      label: 'Mais opções',
      route: '/asset-registration/private-securities/details',
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
          label: PRIVATE_SECURITY_FILTER_LABELS[key as PrivateSecurityFilterKey],
          value: value,
          key: key as PrivateSecurityFilterKey
        });
      }
    });

    this.loadSecurities();
  }

  removeFilter(filterKey: PrivateSecurityFilterKey): void {
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

  onRowClick(item: PrivateSecurityRecord): void {
    console.log('Row clicked:', item);
  }

  onActionClick(event: { action: GridAction; item: PrivateSecurityRecord }): void {
    console.log('Action clicked:', event.action.label, event.item);
  }
}
