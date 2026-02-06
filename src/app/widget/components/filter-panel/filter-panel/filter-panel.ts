import { Component, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FilterField,
  FilterTag,
  FilterValues,
  DateRange
} from './filter-panel.interface';
import { FilterFieldComponent } from '../filter-field';
import { Chip } from '../../chip';

@Component({
  selector: 'srf-b3-filter-panel',
  standalone: true,
  imports: [CommonModule, FilterFieldComponent, Chip],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
})
export class FilterPanel {
  // Configuração dos campos
  readonly fields = input<FilterField[]>([]);
  readonly filterValues = input<FilterValues>({});
  
  // Configurações de layout
  readonly columns = input<number>(4);
  readonly showSearchButton = input<boolean>(true);
  readonly showClearButton = input<boolean>(true);
  readonly searchLabel = input<string>('Pesquisar');
  readonly emptyLabel = input<string>('Filtrar');

  // Outputs
  readonly filtersChanged = output<FilterValues>();
  readonly search = output<FilterValues>();
  readonly clear = output<void>();
  readonly tagRemoved = output<FilterValues>();

  readonly isExpanded = signal(false);
  readonly internalValues = signal<FilterValues>({});

  constructor() {
    effect(() => {
      const externalValues = this.filterValues();
      if (this.isExpanded()) {
        this.internalValues.set({ ...externalValues });
      }
    });
  }

  readonly activeTags = computed<FilterTag[]>(() => {
    const values = this.filterValues();
    const fieldsList = this.fields();
    const tags: FilterTag[] = [];

    for (const field of fieldsList) {
      const value = values[field.key];
      
      if (value === null || value === undefined || value === '') continue;

      if (field.type === 'date-range') {
        const dateValue = value as DateRange;
        if (dateValue.start || dateValue.end) {
          let displayValue = '';
          if (dateValue.start && dateValue.end) {
            displayValue = `${this.formatDate(dateValue.start)} - ${this.formatDate(dateValue.end)}`;
          } else if (dateValue.start) {
            displayValue = this.formatDate(dateValue.start);
          } else if (dateValue.end) {
            displayValue = `Até ${this.formatDate(dateValue.end)}`;
          }
          tags.push({
            key: field.key,
            label: field.label,
            value: JSON.stringify(dateValue),
            displayValue
          });
        }
      } else if (field.type === 'select') {
        const option = field.options.find(o => o.value === value);
        if (option) {
          tags.push({
            key: field.key,
            label: field.label,
            value: String(value),
            displayValue: option.label
          });
        }
      } else if (field.type === 'toggle') {
        if (value === true) {
          tags.push({
            key: field.key,
            label: field.label,
            value: 'true',
            displayValue: 'Sim'
          });
        }
      } else {
        tags.push({
          key: field.key,
          label: field.label,
          value: String(value),
          displayValue: String(value)
        });
      }
    }

    return tags;
  });

  toggleExpanded(): void {
    this.isExpanded.update(v => !v);
    if (this.isExpanded()) {
      this.internalValues.set({ ...this.filterValues() });
    }
  }

  onSearch(): void {
    this.search.emit(this.internalValues());
    this.isExpanded.set(false);
  }

  onClear(): void {
    // Resetar todos os valores incluindo datas
    const emptyValues: FilterValues = {};
    this.fields().forEach(field => {
      if (field.type === 'date-range') {
        emptyValues[field.key] = { start: '', end: '' };
      } else if (field.type === 'toggle') {
        emptyValues[field.key] = false;
      } else {
        emptyValues[field.key] = '';
      }
    });
    this.internalValues.set(emptyValues);
    this.filtersChanged.emit(emptyValues);
    this.clear.emit();
  }

  removeTag(tag: FilterTag): void {
    const newValues = { ...this.filterValues() };
    delete newValues[tag.key];
    this.filtersChanged.emit(newValues);
    this.tagRemoved.emit(newValues);
  }

  onFieldValueChange(event: { key: string; value: string | number | boolean | DateRange | null }): void {
    const newValues = {
      ...this.internalValues(),
      [event.key]: event.value
    };
    this.internalValues.set(newValues);
    this.filtersChanged.emit(newValues);
  }

  getFieldValue(key: string): string | number | boolean | DateRange | null {
    const value = this.internalValues()[key];
    if (value === undefined) return null;
    return value;
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  }
}
