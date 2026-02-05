import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FilterField,
  FilterSelectOption,
  DateRange
} from '../filter-panel/filter-panel.interface';
import { DateRangeInput, DateRangeValue } from '../../date-range-input';
import { ToggleSwitch } from '../../toggle-switch';

@Component({
  selector: 'srf-b3-filter-field',
  standalone: true,
  imports: [CommonModule, FormsModule, DateRangeInput, ToggleSwitch],
  templateUrl: './filter-field.html',
  styleUrl: './filter-field.scss',
})
export class FilterFieldComponent {
  readonly field = input.required<FilterField>();
  readonly value = input<string | number | boolean | DateRange | null>(null);

  readonly valueChange = output<{ key: string; value: string | number | boolean | DateRange | null }>();

  getSelectOptions(): FilterSelectOption[] {
    const f = this.field();
    if (f.type === 'select') {
      return f.options;
    }
    return [];
  }

  onInputChange(value: string | number | boolean | null): void {
    this.valueChange.emit({ key: this.field().key, value });
  }

  onToggleChange(value: boolean): void {
    this.valueChange.emit({ key: this.field().key, value });
  }

  onDateRangeChange(dateRange: DateRangeValue): void {
    const value: DateRange = {
      start: dateRange.startDate,
      end: dateRange.endDate
    };
    this.valueChange.emit({ key: this.field().key, value });
  }
}
