import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonPrimary } from 'widget/components/buttons/button-primary/button-primary';
import { ButtonSecondary } from 'widget/components/buttons/button-secondary/button-secondary';
import { CalendarService } from '@domain/calendar/services/calendar.service';
import { FilterOptions } from '@domain/calendar/types/interfaces/calendar.interface';

@Component({
  selector: 'srf-b3-calendar-filter',
  standalone: true,
  imports: [FormsModule, ButtonPrimary, ButtonSecondary],
  templateUrl: './calendar-filter.html',
  styleUrl: './calendar-filter.scss',
})
export class CalendarFilter implements OnInit {
  private readonly calendarService = inject(CalendarService);

  readonly filterOptions = signal<FilterOptions>({
    exchanges: [],
    locations: [],
    segments: [],
    processes: []
  });

  exchange = '';
  location = '';
  segment = '';
  process = '';

  readonly searchFilters = output<{ exchange: string; location: string; segment: string; process: string }>();
  readonly clearFilters = output<void>();

  ngOnInit(): void {
    this.loadFilterOptions();
  }

  loadFilterOptions(): void {
    this.calendarService.getFilterOptions().subscribe({
      next: (options) => {
        this.filterOptions.set(options);
      },
      error: (error) => {
        console.error('Erro ao carregar opções de filtro:', error);
      }
    });
  }

  onSearch(): void {
    this.searchFilters.emit({
      exchange: this.exchange,
      location: this.location,
      segment: this.segment,
      process: this.process
    });
  }

  onClear(): void {
    this.exchange = '';
    this.location = '';
    this.segment = '';
    this.process = '';
    this.clearFilters.emit();
  }
}