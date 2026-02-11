import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grid, GridColumn, GridAction } from '@widget/components/grid/grid';
import { GridCellDef } from '@widget/components/grid/grid-cell-def.directive';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { FilterPanel, FilterField, FilterValues } from '@widget/components/filter-panel';
import { StatusBadge } from '@widget/components/status-badge/status-badge';
import { Pagination } from '@widget/components/pagination/pagination';
import { CustomerService, CustomerStateService } from '../../services';
import { ICustomerRecord, CustomerFilters } from '../../interfaces';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, FormsModule, Grid, GridCellDef, Breadcrumb, FilterPanel, StatusBadge, Pagination],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList implements OnInit {
  private readonly service = inject(CustomerService);
  private readonly stateService = inject(CustomerStateService);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', current: true }
  ];

  filterFields: FilterField[] = [
    {
      key: 'tipoPessoa',
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
      key: 'residente',
      label: 'Residência',
      type: 'checkbox-group',
      options: [
        { value: 'Não Residente', label: 'Não Residente' },
        { value: 'Residente', label: 'Residente' },
      ]
    },
    {
      key: 'tipoDocumento',
      label: 'Tipo Documento',
      type: 'select',
      placeholder: 'CPF',
      options: [
        { value: 'CPF', label: 'CPF' },
        { value: 'CNPJ', label: 'CNPJ' },
      ]
    },
    {
      key: 'numeroDocumento',
      label: 'Nro. Documento Identificação',
      type: 'text',
      placeholder: '000.000.000-00'
    },
    {
      key: 'nome',
      label: 'Nome do Cliente',
      type: 'text',
      placeholder: 'Maria Silva'
    },
    {
      key: 'dataUltimaAlteracao',
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
    { key: 'nome', label: 'Nome do Cliente', width: '45%', sortable: true },
    { key: 'residente', label: 'Residente', width: '10%', sortable: true },
    { key: 'tipoDocumento', label: 'Tipo Doc.', width: '8%', sortable: true },
    { key: 'numeroDocumento', label: 'Número Doc.', width: '12%', sortable: true },
    { key: 'statusInvestidor', label: 'Status Investidor', width: '10%', sortable: true },
    { key: 'dataHoraInclusao', label: 'Data/Hora Inclusão', width: '12%', sortable: true },
  ];

  gridActions: GridAction[] = [
    {
      icon: 'icons/options.svg',
      label: 'Mais opções',
      route: '/customer',
      routeIdKey: 'numeroDocumento'
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
    const filters = this.convertToServiceFilters(this.filterValues());
    this.service.getAll(filters).subscribe(data => {
      this.allCustomers.set(data);
      this.stateService.setCustomers(data);
      this.currentPage.set(1);
    });
  }

  private convertToServiceFilters(values: FilterValues): CustomerFilters {
    const residenteArr = values['residente'] as string[] | null;
    return {
      nome: (values['nome'] as string) || '',
      tipoDocumento: (values['tipoDocumento'] as string) || '',
      numeroDocumento: (values['numeroDocumento'] as string) || '',
      statusInvestidor: (values['statusInvestidor'] as string) || '',
      residente: residenteArr && residenteArr.length === 1 ? residenteArr[0] : '',
    };
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
    console.log('Row clicked:', item);
  }

  onActionClick(event: { action: GridAction; item: ICustomerRecord }): void {
    console.log('Action clicked:', event.action.label, event.item);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
}
