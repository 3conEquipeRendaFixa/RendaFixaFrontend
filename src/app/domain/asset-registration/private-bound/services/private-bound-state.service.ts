import { Injectable } from '@angular/core';
import { FilterValues } from '@widget/components/filter-panel';
import { IPrivateSecurityRecord } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrivateBoundStateService {
  private filterValues: FilterValues = {};
  private securities: IPrivateSecurityRecord[] = [];

  setFilterValues(values: FilterValues): void {
    this.filterValues = values;
  }

  getFilterValues(): FilterValues {
    return this.filterValues;
  }

  clearFilterValues(): void {
    this.filterValues = {};
  }

  setSecurities(data: IPrivateSecurityRecord[]): void {
    this.securities = data;
  }

  getSecurities(): IPrivateSecurityRecord[] {
    return this.securities;
  }

  clearSecurities(): void {
    this.securities = [];
  }

  updateSecuritySurname(tickerSymbol: string, newSurname: string): void {
    const item = this.securities.find(s => s.tickerSymbol === tickerSymbol);
    if (item) {
      item.tickerSymbolSurname = newSurname;
    }
  }

  clearAll(): void {
    this.filterValues = {};
    this.securities = [];
  }
}
