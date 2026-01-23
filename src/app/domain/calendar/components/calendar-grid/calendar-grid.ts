import { Component, input, output } from '@angular/core';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';
import { ButtonIcon } from 'widget/components/buttons/button-icon/button-icon';

@Component({
  selector: 'srf-b3-calendar-grid',
  standalone: true,
  imports: [ButtonIcon],
  templateUrl: './calendar-grid.html',
  styleUrl: './calendar-grid.scss',
})
export class CalendarGrid {
  readonly items = input<CalendarItem[]>([]);

  readonly rowClick = output<CalendarItem>();

  onRowClick(item: CalendarItem): void {
    this.rowClick.emit(item);
  }

  formatWorkDay(value: string): string {
    return value === 'S' || value === 'Y' ? 'Sim' : 'Não';
  }
}
