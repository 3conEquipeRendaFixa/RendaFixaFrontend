import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonPrimary } from 'widget/components/buttons/button-primary/button-primary';
import { ButtonSecondary } from 'widget/components/buttons/button-secondary/button-secondary';

@Component({
  selector: 'srf-b3-calendar-filter',
  standalone: true,
  imports: [FormsModule, ButtonPrimary, ButtonSecondary],
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

  onSearch(): void {
    this.searchFilters.emit();
  }

  onClear(): void {
    this.exchange = '';
    this.location = '';
    this.segment = '';
    this.process = '';
    this.clearFilters.emit();
  }
}
