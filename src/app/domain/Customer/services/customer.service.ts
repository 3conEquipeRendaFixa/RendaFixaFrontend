import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICustomerRecord, ICustomerApiRecord, CustomerFilters } from '../interfaces';
import { ApiResponse } from '../../../shared/interfaces/api-response.interface';
import { ICustomerInformationApiResponse } from '../interfaces/ICustomerData';

const STATUS_MAP: Record<number, string> = {
  1: 'Ativo',
  2: 'Inativo',
  3: 'Bloqueado',
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  loadCustomers(filters: CustomerFilters = {}): Observable<ICustomerRecord[]> {
    const body: Record<string, string> = {};

    if (filters.typePsonCode) body['typePsonCode'] = filters.typePsonCode;
    if (filters.resntAbroadInd) body['resnAbroadIndFilter'] = filters.resntAbroadInd;
    if (filters.custName) body['custNameFilter'] = filters.custName;
    if (filters.docmValue) body['docmValueFilter'] = filters.docmValue;
    if (filters.updateDate) {
      body['updateDateBeginFilter'] = filters.updateDate;
      const endDate = new Date(filters.updateDate);
      endDate.setHours(23, 59, 59, 999);
      body['UpdateDateEndFilter'] = endDate.toISOString();
    }

    return this.http.post<ApiResponse<ICustomerApiRecord[]>>(
      `${this.apiUrl}/customer/customerList`,
      body
    ).pipe(
      map(response => response.data.map(item => this.mapToCustomerRecord(item)))
    );
  }

  loadCustomerInformation(custCode: string): Observable<ICustomerInformationApiResponse> {
    return this.http.post<ApiResponse<ICustomerInformationApiResponse>>(
      `${this.apiUrl}/customer/customerInformation/${custCode}`,
      {}
    ).pipe(
      map(response => response.data)
    );
  }

  private mapToCustomerRecord(api: ICustomerApiRecord): ICustomerRecord {
    return {
      custCode: api.custCode,
      custName: api.custName,
      typePsonCode: api.typePsonCode,
      resntAbroadInd: api.resntAbroadInd === 'N' ? 'Sim' : 'Não',
      docmTypeCode: api.docmTypeCode,
      docmValue: api.docmValue,
      statRegCode: STATUS_MAP[api.statRegCode] ?? 'Desconhecido',
      insertDate: this.formatDate(api.insertDate),
      updateDate: this.formatDate(api.updateDate),
    };
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }
}
