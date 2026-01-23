import { Component, input, output, signal } from '@angular/core';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';
import { ButtonIcon } from 'widget/components/buttons/button-icon/button-icon';

type SortField = 'exchange' | 'location' | 'segment' | 'process' | 'saturdayWorkDay' | 'sundayWorkDay';
type SortOrder = 'asc' | 'desc' | null;

@Component({
  selector: 'srf-b3-calendar-grid',
  standalone: true,
  imports: [ButtonIcon],
  templateUrl: './calendar-grid.html',
  styleUrl: './calendar-grid.scss',
})
export class CalendarGrid {
  readonly items = input<CalendarItem[]>([]);
  
  readonly sortField = signal<SortField | null>(null);
  readonly sortOrder = signal<SortOrder>(null);

  readonly rowClick = output<CalendarItem>();
  readonly sortChange = output<{ field: SortField; order: SortOrder }>();

  onRowClick(item: CalendarItem): void {
    this.rowClick.emit(item);
  }

  onSort(field: SortField): void {
    const currentField = this.sortField();
    const currentOrder = this.sortOrder();

    let newOrder: SortOrder = 'asc';
    
    if (currentField === field) {
      if (currentOrder === 'asc') {
        newOrder = 'desc';
      } else if (currentOrder === 'desc') {
        newOrder = null;
      } else {
        newOrder = 'asc';
      }
    }

    this.sortField.set(newOrder ? field : null);
    this.sortOrder.set(newOrder);
    this.sortChange.emit({ field, order: newOrder });
  }

  getSortIndicator(field: SortField): string {
    if (this.sortField() !== field) return '↕';
    if (this.sortOrder() === 'asc') return '↑';
    if (this.sortOrder() === 'desc') return '↓';
    return '↕';
  }

  formatWorkDay(value: string): string {
    return value === 'S' || value === 'Y' ? 'Sim' : 'Não';
  }
}
