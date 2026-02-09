import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grid, GridColumn, GridAction } from '@widget/components/grid/grid';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { FilterPanel, FilterField, FilterValues, DateRange } from '@widget/components/filter-panel';
import { PrivateBoundService, PrivateBoundStateService } from '../../services';
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
  private readonly stateService = inject(PrivateBoundStateService);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE ATIVOS', route: '' },
    { label: 'TÍTULOS PRIVADOS', current: true }
  ];

  // Configuração dos campos de filtro para o FilterPanel
  filterFields: FilterField[] = [
    { 
      key: 'tickerSymbolTypeCode', 
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
    { key: 'tickerSymbol', label: 'Código do Ativo', type: 'text', placeholder: 'Digite...' },
    { key: 'tickerSymbolSurname', label: 'Apelido do Ativo', type: 'text', placeholder: 'Digite...' },
    { key: 'issuerCorporationName', label: 'Emissor (Razão Social)', type: 'text', placeholder: 'Digite...' },
    { key: 'issueDate', label: 'Data Emissão', type: 'date-range' },
    { key: 'maturityDate', label: 'Data Vencimento', type: 'date-range' },
    { 
      key: 'instrumentStatusDescription', 
      label: 'Situação do Ativo', 
      type: 'select',
      placeholder: 'Selecione...',
      options: [
        { value: 'Confirmado sem Restrição', label: 'Confirmado sem Restrição' },
        { value: 'Pendente', label: 'Pendente' },
        { value: 'Cancelado', label: 'Cancelado' }
      ]
    },
    { key: 'nonPaymentIndicator', label: 'Inadimplente', type: 'toggle' }
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
    // Restaura os filtros salvos anteriormente
    const savedFilters = this.stateService.getFilterValues();
    if (savedFilters && Object.keys(savedFilters).length > 0) {
      this.filterValues.set(savedFilters);
    }

    // Restaura os dados salvos anteriormente (evita nova requisição)
    const savedSecurities = this.stateService.getSecurities();
    if (savedSecurities && savedSecurities.length > 0) {
      this.securities = savedSecurities;
      console.log('Dados restaurados do cache:', savedSecurities.length, 'ativos');
    } else {
      // Só faz a requisição se não houver dados em cache
      this.loadSecurities();
    }
  }

  private loadSecurities(): void {
    const filters = this.convertToServiceFilters(this.filterValues());
    this.service.getAll(filters).subscribe(data => {
      this.securities = data;
      this.stateService.setSecurities(data); // Salva os dados no cache
    });
  }

  private convertToServiceFilters(values: FilterValues): PrivateSecurityFilters {
    return {
      tickerSymbolTypeCode: (values['tickerSymbolTypeCode'] as string) || '',
      tickerSymbol: (values['tickerSymbol'] as string) || '',
      tickerSymbolSurname: (values['tickerSymbolSurname'] as string) || '',
      issuerCorporationName: (values['issuerCorporationName'] as string) || '',
      issueDate: (values['issueDate'] as DateRange)?.start || '',
      maturityDate: (values['maturityDate'] as DateRange)?.start || '',
      instrumentStatusDescription: (values['instrumentStatusDescription'] as string) || '',
      nonPaymentIndicator: values['nonPaymentIndicator'] ? 'true' : ''
    };
  }

  onFilterSearch(values: FilterValues): void {
    this.filterValues.set(values);
    this.stateService.setFilterValues(values); // Salva os filtros no serviço
    this.loadSecurities();
  }

  onFiltersChanged(values: FilterValues): void {
    this.filterValues.set(values);
    this.stateService.setFilterValues(values); // Salva os filtros no serviço
    this.loadSecurities();
  }

  onFilterClear(): void {
    this.filterValues.set({});
    this.stateService.clearAll(); // Limpa filtros e dados do serviço
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