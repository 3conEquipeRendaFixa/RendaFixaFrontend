import { Component, computed, signal } from '@angular/core';
import { CalendarViewModal } from '@domain/calendar/components/calendar-view-modal/calendar-view-modal';
import { CalendarService } from '@domain/calendar/services/calendar';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';
import { Grid, GridColumn, GridAction } from '@widget/components/grid/grid';
import { FilterPanel, FilterField, FilterValues } from '@widget/components/filter-panel/filter-panel';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';

@Component({
  selector: 'srf-b3-calendar',
  standalone: true,
  imports: [CalendarViewModal, Grid, FilterPanel, Breadcrumb],
  providers: [CalendarService],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export default class Calendar {
  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'ADMINISTRATIVO' },
    { label: 'CALENDÁRIO POR PRAÇA', current: true },
  ];

  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<CalendarItem | null>(null);

  readonly calendarItems = signal<CalendarItem[]>([
    { exchange: 'B3', location: 'São Paulo', segment: 'Cetip UTVM', process: 'Registro', description: 'Calendário B3 Cetip UTVM', order: '1', saturdayWorkDay: 'Sim', sundayWorkDay: 'Não', startDate: '2026-01-01', creation: '2025-12-01', lastUpdate: '2025-12-15', status: 1 },
    { exchange: 'B3', location: 'São Paulo', segment: 'Listados', process: 'Liquidação', description: 'Calendário B3 Listados', order: '2', saturdayWorkDay: 'Sim', sundayWorkDay: 'Sim', startDate: '2026-01-01', creation: '2025-12-01', lastUpdate: '2025-12-15', status: 1 },
    { exchange: 'BCB', location: 'São Paulo', segment: 'Selic', process: 'Registro', description: 'Calendário BCB Selic', order: '1', saturdayWorkDay: 'Não', sundayWorkDay: 'Não', startDate: '2026-01-01', creation: '2025-12-01', lastUpdate: '2025-12-15', status: 1 },
    { exchange: 'BCB', location: 'São Paulo', segment: 'Cetip UTVM', process: 'Liquidação', description: 'Calendário BCB Cetip UTVM', order: '2', saturdayWorkDay: 'Não', sundayWorkDay: 'Não', startDate: '2026-01-01', creation: '2025-12-01', lastUpdate: '2025-12-15', status: 1 },
  ]);

  readonly filterValues = signal<FilterValues>({});
  readonly searchValues = signal<FilterValues>({});

  readonly filteredItems = computed(() => {
    const search = this.searchValues();
    const items = this.calendarItems();

    const hasAnyFilter = Object.values(search).some(v => v !== null && v !== undefined && v !== '');
    if (!hasAnyFilter) return items;

    return items.filter(item => {
      if (search['exchange'] && item.exchange !== search['exchange']) return false;
      if (search['location'] && item.location !== search['location']) return false;
      if (search['segment'] && item.segment !== search['segment']) return false;
      if (search['process'] && item.process !== search['process']) return false;
      return true;
    });
  });

  readonly calendarColumns: GridColumn[] = [
    { key: 'exchange', label: 'Instituição', sortable: true },
    { key: 'location', label: 'Praça', sortable: true },
    { key: 'segment', label: 'Segmento', sortable: true },
    { key: 'process', label: 'Processo', sortable: true },
    { key: 'saturdayWorkDay', label: 'Sábado Útil ?', sortable: true },
    { key: 'sundayWorkDay', label: 'Domingo Útil ?', sortable: true },
  ];

  readonly calendarActions: GridAction[] = [
    { icon: 'icons/calendar-icon.svg', label: 'Ver calendário' },
  ];

  readonly filterFields = computed<FilterField[]>(() => {
    const values = this.filterValues();
    const items = this.calendarItems();

    const exchanges = [...new Set(items.map(i => i.exchange))];

    const locations = values['exchange']
      ? [...new Set(items.filter(i => i.exchange === values['exchange']).map(i => i.location))]
      : [];

    const segments = values['location']
      ? [...new Set(items.filter(i => i.exchange === values['exchange'] && i.location === values['location']).map(i => i.segment))]
      : [];

    const processes = values['segment']
      ? [...new Set(items.filter(i => i.exchange === values['exchange'] && i.location === values['location'] && i.segment === values['segment']).map(i => i.process))]
      : [];

    return [
      { key: 'exchange', label: 'Instituição', type: 'select' as const, placeholder: 'Selecione', options: exchanges.map(v => ({ value: v, label: v })) },
      { key: 'location', label: 'Praça', type: 'select' as const, placeholder: 'Selecione', options: locations.map(v => ({ value: v, label: v })), disabled: !values['exchange'] },
      { key: 'segment', label: 'Segmento', type: 'select' as const, placeholder: 'Selecione', options: segments.map(v => ({ value: v, label: v })), disabled: !values['location'] },
      { key: 'process', label: 'Processo', type: 'select' as const, placeholder: 'Selecione', options: processes.map(v => ({ value: v, label: v })), disabled: !values['segment'] },
    ];
  });

  onFilterChanged(values: FilterValues): void {
    const current = this.filterValues();
    const newValues = { ...values };

    // Hierarchy: clear dependents when parent changes
    if (values['exchange'] !== current['exchange']) {
      newValues['location'] = '';
      newValues['segment'] = '';
      newValues['process'] = '';
    } else if (values['location'] !== current['location']) {
      newValues['segment'] = '';
      newValues['process'] = '';
    } else if (values['segment'] !== current['segment']) {
      newValues['process'] = '';
    }

    this.filterValues.set(newValues);
  }

  onSearch(values: FilterValues): void {
    this.filterValues.set(values);
    this.searchValues.set({ ...values });
  }

  onClear(): void {
    this.filterValues.set({});
    this.searchValues.set({});
  }

  onChipRemoved(values: FilterValues): void {
    const hierarchy = ['exchange', 'location', 'segment', 'process'];
    const newValues = { ...values };

    // Find first missing key and clear all dependents
    let clearing = false;
    for (const key of hierarchy) {
      if (clearing) {
        newValues[key] = '';
      } else if (!newValues[key]) {
        clearing = true;
      }
    }

    this.filterValues.set(newValues);
    this.searchValues.set({ ...newValues });
  }

  onRowClick(item: CalendarItem): void {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  onActionClick(event: { action: GridAction; item: CalendarItem }): void {
    this.selectedItem.set(event.item);
    this.isModalOpen.set(true);
  }

  onCloseModal(): void {
    this.isModalOpen.set(false);
    this.selectedItem.set(null);
  }

  onExport(): void {
    console.log('Exportar calendário');
  }
}
