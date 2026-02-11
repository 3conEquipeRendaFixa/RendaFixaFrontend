import { Component, input, output } from '@angular/core';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';

@Component({
  selector: 'srf-b3-calendar-grid',
  standalone: true,
  imports: [],
  templateUrl: './calendar-grid.html',
  styleUrl: './calendar-grid.scss',
})
export class CalendarGrid {
  readonly items = input<CalendarItem[]>([]);

  readonly rowClick = output<CalendarItem>();
  readonly export = output<void>();

  onRowClick(item: CalendarItem): void {
    this.rowClick.emit(item);
  }

  onExport(): void {
    this.export.emit();
  }

  formatBoolean(value: string): string {
    return value === 'true' ? 'Sim' : 'Não';
  }
}
