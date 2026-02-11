export interface FilterTag {
  key: string;
  label: string;
  value: string;
  displayValue?: string;
}

export interface FilterFieldBase {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  colSpan?: number;
  disabled?: boolean;
}

export interface FilterFieldInput extends FilterFieldBase {
  type: 'text' | 'number';
}

export interface FilterFieldSelect extends FilterFieldBase {
  type: 'select';
  options: FilterSelectOption[];
}

export interface FilterFieldDateRange extends FilterFieldBase {
  type: 'date-range';
  startPlaceholder?: string;
  endPlaceholder?: string;
}

export interface FilterFieldToggle extends FilterFieldBase {
  type: 'toggle';
}

export interface FilterFieldDate extends FilterFieldBase {
  type: 'date';
}

export interface FilterFieldCheckboxGroup extends FilterFieldBase {
  type: 'checkbox-group';
  options: FilterSelectOption[];
}

export interface FilterSelectOption {
  value: string | number;
  label: string;
}

export type FilterField = FilterFieldInput | FilterFieldSelect | FilterFieldDateRange | FilterFieldToggle | FilterFieldDate | FilterFieldCheckboxGroup;

export interface FilterPanelConfig {
  fields: FilterField[];
  columns?: number;
  showSearchButton?: boolean;
  showClearButton?: boolean;
  searchLabel?: string;
  emptyLabel?: string;
}

export interface FilterValues {
  [key: string]: string | number | boolean | DateRange | string[] | null;
}

export interface DateRange {
  start: string | null;
  end: string | null;
}
