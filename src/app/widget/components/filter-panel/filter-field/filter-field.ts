import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FilterField,
  FilterSelectOption,
  DateRange
} from '../filter-panel/filter-panel.interface';
import { DateRangeInput, DateRangeValue } from '../../date-range-input';
import { DateInput } from '../../date-input';
import { ToggleSwitch } from '../../toggle-switch';

@Component({
  selector: 'srf-b3-filter-field',
  standalone: true,
  imports: [CommonModule, FormsModule, DateRangeInput, DateInput, ToggleSwitch],
  templateUrl: './filter-field.html',
  styleUrl: './filter-field.scss',
})
export class FilterFieldComponent {
  readonly field = input.required<FilterField>();
  readonly value = input<string | number | boolean | DateRange | string[] | null>(null);

  readonly valueChange = output<{ key: string; value: string | number | boolean | DateRange | string[] | null }>();

  getSelectOptions(): FilterSelectOption[] {
    const f = this.field();
    if (f.type === 'select' || f.type === 'checkbox-group') {
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

  onDateChange(value: string): void {
    this.valueChange.emit({ key: this.field().key, value });
  }

  isChecked(optionValue: string | number): boolean {
    const current = this.value();
    if (Array.isArray(current)) {
      return current.includes(String(optionValue));
    }
    return false;
  }

  onCheckboxChange(optionValue: string | number, checked: boolean): void {
    const current = this.value();
    let values: string[] = Array.isArray(current) ? [...current] : [];
    const strValue = String(optionValue);
    if (checked) {
      if (!values.includes(strValue)) values.push(strValue);
    } else {
      values = values.filter(v => v !== strValue);
    }
    this.valueChange.emit({ key: this.field().key, value: values.length > 0 ? values : null });
  }
}
