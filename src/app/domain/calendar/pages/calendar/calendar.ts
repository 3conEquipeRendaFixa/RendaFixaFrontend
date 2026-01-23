import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CalendarFilter } from '@domain/calendar/components/calendar-filter/calendar-filter';
import { CalendarGrid } from '@domain/calendar/components/calendar-grid/calendar-grid';
import { CalendarViewModal } from '@domain/calendar/components/calendar-view-modal/calendar-view-modal';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';
import { CalendarService } from '@domain/calendar/services/calendar.service';

type SortField = 'exchange' | 'location' | 'segment' | 'process' | 'saturdayWorkDay' | 'sundayWorkDay';
type SortOrder = 'asc' | 'desc' | null;

@Component({
  selector: 'srf-b3-calendar',
  standalone: true,
  imports: [CalendarFilter, CalendarGrid, CalendarViewModal],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export default class Calendar implements OnInit {
  private readonly calendarService = inject(CalendarService);

  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<CalendarItem | null>(null);

  readonly calendarItems = signal<CalendarItem[]>([]);
  readonly sortField = signal<SortField | null>(null);
  readonly sortOrder = signal<SortOrder>(null);

  readonly displayedItems = computed(() => {
    const items = this.calendarItems();
    const field = this.sortField();
    const order = this.sortOrder();

    if (!field || !order) {
      return items;
    }

    const sorted = [...items].sort((a, b) => {
      const aVal = (a[field] as any) ?? '';
      const bVal = (b[field] as any) ?? '';

      if (typeof aVal === 'string') {
        return order === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number') {
        return order === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal;
      }

      return 0;
    });

    return sorted;
  });

  ngOnInit(): void {
    this.loadCalendars();
  }

  loadCalendars(): void {
    this.calendarService.getAllCalendars().subscribe({
      next: (data) => {
        this.calendarItems.set(data);
      },
      error: (error) => {
        console.error('Erro ao carregar calendários:', error);
      }
    });
  }

  onSearch(filters: { exchange: string; location: string; segment: string; process: string }): void {
    const { exchange, location, segment, process } = filters;
    
    this.calendarService.getCalendars(
      exchange || undefined,
      location || undefined,
      segment || undefined,
      process || undefined
    ).subscribe({
      next: (data) => {
        this.calendarItems.set(data);
      },
      error: (error) => {
        console.error('Erro ao filtrar calendários:', error);
      }
    });
  }

  onClear(): void {
    this.loadCalendars();
  }

  onSort(event: { field: SortField; order: SortOrder }): void {
    this.sortField.set(event.field);
    this.sortOrder.set(event.order);
  }

  onRowClick(item: CalendarItem): void {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  onCloseModal(): void {
    this.isModalOpen.set(false);
    this.selectedItem.set(null);
  }
}
