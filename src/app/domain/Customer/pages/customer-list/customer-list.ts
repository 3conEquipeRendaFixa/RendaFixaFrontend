import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Grid, GridColumn, GridAction } from '@widget/components/grid/grid';
import { GridCellDef } from '@widget/components/grid/grid-cell-def.directive';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { FilterPanel, FilterField, FilterValues } from '@widget/components/filter-panel';
import { StatusBadge } from '@widget/components/status-badge/status-badge';
import { Pagination } from '@widget/components/pagination/pagination';
import { CustomerDetailsService, CustomerStateService } from '../../services';
import { ICustomerRecord, CustomerListFilters } from '../../interfaces';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, FormsModule, Grid, GridCellDef, Breadcrumb, FilterPanel, StatusBadge, Pagination],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList implements OnInit {
  private readonly service = inject(CustomerDetailsService);
  private readonly stateService = inject(CustomerStateService);
  private readonly router = inject(Router);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', current: true }
  ];

  filterFields: FilterField[] = [
    {
      key: 'typePsonCode',
      label: 'Tipo Pessoa',
      type: 'select',
      required: true,
      placeholder: 'Selecione...',
      options: [
        { value: 'PF', label: 'Pessoa Física' },
        { value: 'PJ', label: 'Pessoa Jurídica' },
      ]
    },
    {
      key: 'resntAbroadInd',
      label: 'Residência',
      type: 'checkbox-group',
      options: [
        { value: 'S', label: 'Não Residente' },
        { value: 'N', label: 'Residente' },
      ]
    },
    {
      key: 'docmTypeCode',
      label: 'Tipo Documento',
      type: 'select',
      placeholder: 'CPF',
      options: [
        { value: 'CPF', label: 'CPF' },
        { value: 'CNPJ', label: 'CNPJ' },
      ]
    },
    {
      key: 'docmValue',
      label: 'Nro. Documento Identificação',
      type: 'text',
      placeholder: '000.000.000-00'
    },
    {
      key: 'custName',
      label: 'Nome do Cliente',
      type: 'text',
      placeholder: 'Maria Silva'
    },
    {
      key: 'updateDate',
      label: 'Data Últ. Alteração',
      type: 'date',
      placeholder: '00/00/0000'
    },
  ];

  filterValues = signal<FilterValues>({});
  allCustomers = signal<ICustomerRecord[]>([]);
  currentPage = signal<number>(1);
  pageSize = signal<number>(12);

  paginatedCustomers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.allCustomers().slice(start, end);
  });

  gridColumns: GridColumn[] = [
    { key: 'custName', label: 'Nome do Cliente', width: '45%', sortable: true },
    { key: 'resntAbroadInd', label: 'Residente', width: '10%', sortable: true },
    { key: 'docmTypeCode', label: 'Tipo Doc.', width: '8%', sortable: true },
    { key: 'docmValue', label: 'Número Doc.', width: '12%', sortable: true },
    { key: 'statRegCode', label: 'Status Investidor', width: '10%', sortable: true },
    { key: 'insertDate', label: 'Data/Hora Inclusão', width: '12%', sortable: true },
  ];

  gridActions: GridAction[] = [
    {
      icon: 'icons/options.svg',
      label: 'Mais opções',
      route: '/customer',
      routeIdKey: 'custCode'
    }
  ];

  ngOnInit(): void {
    const savedFilters = this.stateService.getFilterValues();
    if (savedFilters && Object.keys(savedFilters).length > 0) {
      this.filterValues.set(savedFilters);
    }

    const savedCustomers = this.stateService.getCustomers();
    if (savedCustomers && savedCustomers.length > 0) {
      this.allCustomers.set(savedCustomers);
    } else {
      this.loadCustomers();
    }
  }

  private loadCustomers(): void {
    this.service.loadCustomers().subscribe({
      next: (data) => {
        this.allCustomers.set(data);
        this.stateService.setCustomers(data);
        this.currentPage.set(1);
        console.log('Customers loaded:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
      }
    });
  }

  private convertToApiFilters(values: FilterValues): CustomerListFilters {
    const residenteArr = values['resntAbroadInd'] as string[] | null;
    const updateDate = values['updateDate'] as string;

    const filters: CustomerListFilters = {};

    if (values['typePsonCode']) {
      filters.typePsonCode = values['typePsonCode'] as string;
    }

    if (residenteArr && residenteArr.length === 1) {
      filters.resnAbroadIndFilter = residenteArr[0];
    }

    if (values['custName']) {
      filters.custNameFilter = values['custName'] as string;
    }

    if (values['docmValue']) {
      filters.docmValueFilter = values['docmValue'] as string;
    }

    if (updateDate) {
      const beginDate = new Date(updateDate);
      filters.updateDateBeginFilter = beginDate.toISOString();

      const endDate = new Date(updateDate);
      endDate.setHours(23, 59, 59, 999);
      filters.UpdateDateEndFilter = endDate.toISOString();
    }

    return filters;
  }

  onFilterSearch(values: FilterValues): void {
    this.filterValues.set(values);
    this.stateService.setFilterValues(values);
    this.loadCustomers();
  }

  onFiltersChanged(values: FilterValues): void {
    this.filterValues.set(values);
    this.stateService.setFilterValues(values);
  }

  onFilterClear(): void {
    this.filterValues.set({});
    this.stateService.clearAll();
    this.loadCustomers();
  }

  onRowClick(item: ICustomerRecord): void {
    this.router.navigate(['/customer/dados-basicos', item.custCode]);
  }

  onActionClick(event: { action: GridAction; item: ICustomerRecord }): void {
    this.router.navigate(['/customer/detail', event.item.custCode], {
      queryParams: { tab: 'telefones' }
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
}
