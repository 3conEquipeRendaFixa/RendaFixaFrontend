import { Injectable } from '@angular/core';
import { FilterValues } from '@widget/components/filter-panel';
import { ICustomerRecord } from '../interfaces';
import { ICustomerInformationApiResponse } from '../interfaces/ICustomerData';

@Injectable({
  providedIn: 'root'
})
export class CustomerStateService {
  private filterValues: FilterValues = {};
  private customers: ICustomerRecord[] = [];
  private customerInfoCustCode: string | null = null;
  private customerInfoData: ICustomerInformationApiResponse | null = null;

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

  cacheCustomerInfo(custCode: string, data: ICustomerInformationApiResponse): void {
    this.customerInfoCustCode = custCode;
    this.customerInfoData = data;
  }

  getCachedCustomerInfo(custCode: string): ICustomerInformationApiResponse | null {
    if (this.customerInfoCustCode === custCode && this.customerInfoData) {
      return this.customerInfoData;
    }
    return null;
  }

  clearAll(): void {
    this.filterValues = {};
    this.customers = [];
    this.customerInfoCustCode = null;
    this.customerInfoData = null;
  }
}
