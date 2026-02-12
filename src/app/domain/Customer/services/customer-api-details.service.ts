import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, of, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import {
  IApiResponse,
  ICustomerListItem,
  ICustomerInformationData,
  ICustomerRecord,
  CustomerListFilters
} from "../interfaces";
import { CustomerStateService } from "./customer-state.service";
import { ICustomerInformationApiResponse } from "../interfaces/ICustomerData";

const STATUS_MAP: Record<number, string> = {
  1: 'Ativo',
  2: 'Inativo',
  3: 'Bloqueado',
};

@Injectable({ providedIn: 'root' })
export class CustomerDetailsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly stateService = inject(CustomerStateService);

  getCustomerList(filters?: CustomerListFilters): Observable<ICustomerRecord[]> {
    const body: Record<string, string> = {};

    if (filters?.typePsonCode) body['typePsonCode'] = filters.typePsonCode;
    if (filters?.resnAbroadIndFilter) body['resnAbroadIndFilter'] = filters.resnAbroadIndFilter;
    if (filters?.custNameFilter) body['custNameFilter'] = filters.custNameFilter;
    if (filters?.updateDateBeginFilter) body['updateDateBeginFilter'] = filters.updateDateBeginFilter;
    if (filters?.UpdateDateEndFilter) body['UpdateDateEndFilter'] = filters.UpdateDateEndFilter;
    if (filters?.docmValueFilter) body['docmValueFilter'] = filters.docmValueFilter;

    return this.http.post<IApiResponse<ICustomerListItem[]>>(
      `${this.apiUrl}/customer/customerList`, body
    ).pipe(
      map(response => response.data.map(item => this.mapToCustomerRecord(item)))
    );
  }

  getCustomerInformation(custCode: number): Observable<ICustomerInformationData> {
    const cached = this.stateService.getCachedCustomerInfo(String(custCode));
    if (cached) {
      return of(cached as unknown as ICustomerInformationData);
    }

    return this.http.post<IApiResponse<ICustomerInformationData>>(
      `${this.apiUrl}/customer/customerInformation/${custCode}`, {}
    ).pipe(
      map(response => response.data),
      tap(data => this.stateService.cacheCustomerInfo(
        String(custCode),
        data as unknown as ICustomerInformationApiResponse
      ))
    );
  }

  private mapToCustomerRecord(item: ICustomerListItem): ICustomerRecord {
    return {
      custCode: item.custCode,
      custName: item.custName,
      typePsonCode: item.typePsonCode,
      resntAbroadInd: item.resntAbroadInd === 'N' ? 'Sim' : 'Não',
      docmTypeCode: item.docmTypeCode,
      docmValue: item.docmValue,
      statRegCode: STATUS_MAP[item.statRegCode] || 'Desconhecido',
      insertDate: this.formatDateTime(item.insertDate),
      updateDate: this.formatDateTime(item.updateDate),
    };
  }

  private formatDateTime(isoDate: string): string {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }
}
