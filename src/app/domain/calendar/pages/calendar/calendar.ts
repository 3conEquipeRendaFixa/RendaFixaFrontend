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
    { exchange: 'B3', location: 'São Paulo', segment: 'Cetip UTVM', process: 'Registro', description: 'Calendário B3 Cetip UTVM', order: '1', saturdayWorkDay: 'true', sundayWorkDay: 'false', startDate: '2026-01-01', creation: '2025-12-01', lastUpdate: '2025-12-15', status: 1 },
    { exchange: 'B3', location: 'São Paulo', segment: 'Listados', process: 'Liquidação', description: 'Calendário B3 Listados', order: '2', saturdayWorkDay: 'true', sundayWorkDay: 'true', startDate: '2026-01-01', creation: '2025-12-01', lastUpdate: '2025-12-15', status: 1 },
    { exchange: 'BCB', location: 'São Paulo', segment: 'Selic', process: 'Registro', description: 'Calendário BCB Selic', order: '1', saturdayWorkDay: 'false', sundayWorkDay: 'false', startDate: '2026-01-01', creation: '2025-12-01', lastUpdate: '2025-12-15', status: 1 },
    { exchange: 'BCB', location: 'São Paulo', segment: 'Cetip UTVM', process: 'Liquidação', description: 'Calendário BCB Cetip UTVM', order: '2', saturdayWorkDay: 'false', sundayWorkDay: 'false', startDate: '2026-01-01', creation: '2025-12-01', lastUpdate: '2025-12-15', status: 1 },
  ]);

  readonly filterValues = signal<FilterValues>({});

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
    console.log('Pesquisar', values);
  }

  onClear(): void {
    this.filterValues.set({});
    console.log('Limpar filtros');
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
