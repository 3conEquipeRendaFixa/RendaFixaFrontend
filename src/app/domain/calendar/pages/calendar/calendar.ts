import { Component, signal } from '@angular/core';
import { CalendarFilter } from '@domain/calendar/components/calendar-filter/calendar-filter';
import { CalendarGrid } from '@domain/calendar/components/calendar-grid/calendar-grid';
import { CalendarViewModal } from '@domain/calendar/components/calendar-view-modal/calendar-view-modal';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'srf-b3-calendar',
  standalone: true,
  imports: [CalendarFilter, CalendarGrid, CalendarViewModal, RouterLink],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export default class Calendar {
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<CalendarItem | null>(null);

  readonly calendarItems = signal<CalendarItem[]>([
    { instituicao: 'B3', praca: 'São Paulo', segmento: 'Cetip UTVM', processo: 'Registro', sabadoUtil: true, domingoUtil: false },
    { instituicao: 'B3', praca: 'São Paulo', segmento: 'Listados', processo: 'Liquidação', sabadoUtil: true, domingoUtil: true },
    { instituicao: 'BCB', praca: 'São Paulo', segmento: 'Selic', processo: 'Registro', sabadoUtil: false, domingoUtil: false },
    { instituicao: 'BCB', praca: 'São Paulo', segmento: 'Cetip UTVM', processo: 'Liquidação', sabadoUtil: false, domingoUtil: false },
  ]);

  onSearch(): void {
    console.log('Pesquisar');
  }

  onClear(): void {
    console.log('Limpar filtros');
  }

  onRowClick(item: CalendarItem): void {
    this.selectedItem.set(item);
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
