import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInput } from '../date-input';

export interface DateRangeValue {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'srf-b3-date-range-input',
  standalone: true,
  imports: [CommonModule, DateInput],
  templateUrl: './date-range-input.html',
  styleUrl: './date-range-input.scss'
})
export class DateRangeInput {
  readonly startPlaceholder = input<string>('Data início');
  readonly endPlaceholder = input<string>('Data fim');
  readonly disabled = input<boolean>(false);
  readonly separator = input<string>('Até');

  readonly valueChange = output<DateRangeValue>();

  readonly startDate = signal<string>('');
  readonly endDate = signal<string>('');

  readonly value = computed<DateRangeValue>(() => ({
    startDate: this.startDate(),
    endDate: this.endDate()
  }));

  setStartDate(value: string): void {
    this.startDate.set(value);
  }

  setEndDate(value: string): void {
    this.endDate.set(value);
  }

  setValue(value: DateRangeValue): void {
    this.startDate.set(value?.startDate || '');
    this.endDate.set(value?.endDate || '');
  }

  getValue(): DateRangeValue {
    return this.value();
  }

  onStartDateChange(value: string): void {
    this.startDate.set(value);
    this.emitChange();
  }

  onEndDateChange(value: string): void {
    this.endDate.set(value);
    this.emitChange();
  }

  private emitChange(): void {
    this.valueChange.emit(this.value());
  }

  clear(): void {
    this.startDate.set('');
    this.endDate.set('');
    this.emitChange();
  }
}
