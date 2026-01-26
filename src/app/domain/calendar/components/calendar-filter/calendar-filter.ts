import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'srf-b3-calendar-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calendar-filter.html',
  styleUrl: './calendar-filter.scss',
})
export class CalendarFilter {
  exchange = '';
  location = '';
  segment = '';
  process = '';

  readonly searchFilters = output<void>();
  readonly clearFilters = output<void>();
  readonly exportData = output<void>();

  hasFilters(): boolean {
    return !!(this.exchange || this.location || this.segment || this.process);
  }

  onSearch(): void {
    if (this.hasFilters()) {
      this.searchFilters.emit();
    }
  }

  onClear(): void {
    this.exchange = '';
    this.location = '';
    this.segment = '';
    this.process = '';
    this.clearFilters.emit();
  }

  onExport(): void {
    this.exportData.emit();
  }
}
