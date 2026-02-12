import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICustomerRecord, CustomerFilters } from '../interfaces';

const MOCK_CUSTOMERS: ICustomerRecord[] = [
  { custName: 'Maria Silva', typePsonCode: 'PF', resntAbroadInd: 'Sim', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Ativo', insertDate: '28/02/2025 - 13:30:02' },
  { custName: 'Maria Silva 2', typePsonCode: 'PJ', resntAbroadInd: 'Sim', docmTypeCode: 'CNPJ', docmValue: '00.000.000/0000-00', statRegCode: 'Ativo', insertDate: '28/02/2025 - 13:28:14' },
  { custName: 'Maria Silva 3', typePsonCode: 'PF', resntAbroadInd: 'Sim', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Inativo', insertDate: '28/02/2025 - 13:27:54' },
  { custName: 'Maria Silva 4', typePsonCode: 'PF', resntAbroadInd: 'Sim', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Inativo', insertDate: '25/02/2025 - 11:12:09' },
  { custName: 'Maria Silva 5', typePsonCode: 'PF', resntAbroadInd: 'Sim', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Inativo', insertDate: '25/02/2025 - 11:11:36' },
  { custName: 'Maria Silva 6', typePsonCode: 'PF', resntAbroadInd: 'Sim', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Inativo', insertDate: '25/02/2025 - 11:09:23' },
  { custName: 'Maria Silva 7', typePsonCode: 'PF', resntAbroadInd: 'Não', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Bloqueado', insertDate: '23/02/2025 - 16:33:17' },
  { custName: 'Maria Silva 8', typePsonCode: 'PF', resntAbroadInd: 'Não', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Bloqueado', insertDate: '23/02/2025 - 16:25:15' },
  { custName: 'Maria Silva 9', typePsonCode: 'PF', resntAbroadInd: 'Não', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Bloqueado', insertDate: '18/02/2025 - 11:14:11' },
  { custName: 'Maria Silva 10', typePsonCode: 'PF', resntAbroadInd: 'Não', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Bloqueado', insertDate: '18/02/2025 - 08:19:56' },
  { custName: 'Maria Silva 11', typePsonCode: 'PF', resntAbroadInd: 'Sim', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Bloqueado', insertDate: '17/02/2025 - 15:32:18' },
  { custName: 'Maria Silva 12', typePsonCode: 'PF', resntAbroadInd: 'Sim', docmTypeCode: 'CPF', docmValue: '000.000.000-00', statRegCode: 'Inativo', insertDate: '17/02/2025 - 12:05:35' },
];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll(filters?: CustomerFilters): Observable<ICustomerRecord[]> {
    let result = [...MOCK_CUSTOMERS];

    if (filters?.custName) {
      const search = filters.custName.toLowerCase();
      result = result.filter(c => c.custName.toLowerCase().includes(search));
    }
    if (filters?.docmTypeCode) {
      result = result.filter(c => c.docmTypeCode === filters.docmTypeCode);
    }
    if (filters?.docmValue) {
      result = result.filter(c => c.docmValue.includes(filters.docmValue!));
    }
    if (filters?.statRegCode) {
      result = result.filter(c => c.statRegCode === filters.statRegCode);
    }
    if (filters?.resntAbroadInd) {
      result = result.filter(c => c.resntAbroadInd === filters.resntAbroadInd);
    }

    return of(result);
  }
}
