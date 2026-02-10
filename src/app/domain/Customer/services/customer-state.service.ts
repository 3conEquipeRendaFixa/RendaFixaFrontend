import { Injectable } from '@angular/core';
import { FilterValues } from '@widget/components/filter-panel';
import { ICustomerRecord } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerStateService {
  private filterValues: FilterValues = {};
  private customers: ICustomerRecord[] = [];

  setFilterValues(values: FilterValues): void {
    this.filterValues = values;
  }

  getFilterValues(): FilterValues {
    return this.filterValues;
  }

  setCustomers(data: ICustomerRecord[]): void {
    this.customers = data;
  }

  getCustomers(): ICustomerRecord[] {
    return this.customers;
  }

  clearAll(): void {
    this.filterValues = {};
    this.customers = [];
  }
}
