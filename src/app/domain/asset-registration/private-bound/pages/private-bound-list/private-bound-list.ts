import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grid, GridColumn, GridAction } from '@widget/components/grid/grid';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { FilterPanel, FilterField, FilterValues, DateRange } from '@widget/components/filter-panel';
import { PrivateBoundService } from '../../services';
import { 
  IPrivateSecurityRecord, 
  PrivateSecurityFilterKey, 
  PrivateSecurityAppliedFilter,
  PrivateSecurityFilters,
  PRIVATE_SECURITY_FILTER_LABELS 
} from '../../interfaces';

@Component({
  selector: 'app-private-bound-list',
  imports: [CommonModule, FormsModule, Grid, Breadcrumb, FilterPanel],
  templateUrl: './private-bound-list.html',
  styleUrl: './private-bound-list.scss',
})
export class PrivateBoundList implements OnInit {
  private readonly service = inject(PrivateBoundService);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE ATIVOS', route: '' },
    { label: 'TÍTULOS PRIVADOS', current: true }
  ];

  // Configuração dos campos de filtro para o FilterPanel
  filterFields: FilterField[] = [
    { 
      key: 'tipoAtivo', 
      label: 'Tipo do Ativo', 
      type: 'select', 
      required: true,
      placeholder: 'Selecione...',
      options: [
        { value: 'DEB', label: 'DEB' },
        { value: 'CRI', label: 'CRI' },
        { value: 'CRA', label: 'CRA' },
        { value: 'CBIO', label: 'CBIO' },
        { value: 'CFF', label: 'CFF' },
        { value: 'LF', label: 'LF' },
        { value: 'LCI', label: 'LCI' },
        { value: 'LCA', label: 'LCA' },
        { value: 'CDB', label: 'CDB' }
      ]
    },
    { key: 'codigoAtivo', label: 'Código do Ativo', type: 'text', placeholder: 'Digite...' },
    { key: 'apelidoAtivo', label: 'Apelido do Ativo', type: 'text', placeholder: 'Digite...' },
    { key: 'emissor', label: 'Emissor (Razão Social)', type: 'text', placeholder: 'Digite...' },
    { key: 'dataEmissao', label: 'Data Emissão', type: 'date-range' },
    { key: 'dataVencimento', label: 'Data Vencimento', type: 'date-range' },
    { 
      key: 'situacaoAtivo', 
      label: 'Situação do Ativo', 
      type: 'select',
      placeholder: 'Selecione...',
      options: [
        { value: 'Confirmado sem Restrição', label: 'Confirmado sem Restrição' },
        { value: 'Pendente', label: 'Pendente' },
        { value: 'Cancelado', label: 'Cancelado' }
      ]
    },
    { key: 'inadimplente', label: 'Inadimplente', type: 'toggle' }
  ];

  filterValues = signal<FilterValues>({});
  securities: IPrivateSecurityRecord[] = [];

  gridColumns: GridColumn[] = [
    { key: 'registerName', label: 'Registradora', width: '10%', sortable: true },
    { key: 'tickerSymbolTypeCode', label: 'Tipo do Ativo', width: '10%', sortable: true },
    { key: 'tickerSymbol', label: 'Código do Ativo', width: '12%', sortable: true },
    { key: 'tickerSymbolSurname', label: 'Apelido', width: '10%', sortable: true },
    { key: 'issuerCorporationName', label: 'Emissor (Razão Social)', width: '14%', sortable: true },
    { key: 'issueDate', label: 'Data Emissão', width: '10%', sortable: true },
    { key: 'maturityDate', label: 'Data Vencimento', width: '12%', sortable: true },
    { key: 'instrumentStatusDescription', label: 'Situação do Ativo', width: '16%', sortable: true },
  ];

  gridActions: GridAction[] = [
    { 
      icon: 'icons/options.svg', 
      label: 'Mais opções',
      route: '/asset-registration/private-bound',
      routeIdKey: 'tickerSymbol'
    }
  ];

  ngOnInit(): void {
    this.loadSecurities();
  }

  private loadSecurities(): void {
    const filters = this.convertToServiceFilters(this.filterValues());
    this.service.getAll(filters).subscribe(data => {
      this.securities = data;
    });
  }

  private convertToServiceFilters(values: FilterValues): PrivateSecurityFilters {
    return {
      tipoAtivo: (values['tipoAtivo'] as string) || '',
      codigoAtivo: (values['codigoAtivo'] as string) || '',
      apelidoAtivo: (values['apelidoAtivo'] as string) || '',
      emissor: (values['emissor'] as string) || '',
      dataEmissao: (values['dataEmissao'] as DateRange)?.start || '',
      dataVencimento: (values['dataVencimento'] as DateRange)?.start || '',
      situacaoAtivo: (values['situacaoAtivo'] as string) || '',
      inadimplente: values['inadimplente'] ? 'true' : ''
    };
  }

  onFilterSearch(values: FilterValues): void {
    this.filterValues.set(values);
    this.loadSecurities();
  }

  onFiltersChanged(values: FilterValues): void {
    this.filterValues.set(values);
    this.loadSecurities();
  }

  onFilterClear(): void {
    this.filterValues.set({});
    this.loadSecurities();
  }

  get filteredResults(): number {
    return this.securities.length;
  }

  onRowClick(item: IPrivateSecurityRecord): void {
    console.log('Row clicked:', item);
  }

  onActionClick(event: { action: GridAction; item: IPrivateSecurityRecord }): void {
    console.log('Action clicked:', event.action.label, event.item);
  }
}