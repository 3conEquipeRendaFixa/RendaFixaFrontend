import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICustomerRecord, CustomerFilters } from '../interfaces';

const MOCK_CUSTOMERS: ICustomerRecord[] = [
  { nome: 'Maria Silva', tipoPessoa: 'PF', residente: 'Sim', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Ativo', dataHoraInclusao: '28/02/2025 - 13:30:02' },
  { nome: 'Maria Silva 2', tipoPessoa: 'PJ', residente: 'Sim', tipoDocumento: 'CNPJ', numeroDocumento: '00.000.000/0000-00', statusInvestidor: 'Ativo', dataHoraInclusao: '28/02/2025 - 13:28:14' },
  { nome: 'Maria Silva 3', tipoPessoa: 'PF', residente: 'Sim', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Inativo', dataHoraInclusao: '28/02/2025 - 13:27:54' },
  { nome: 'Maria Silva 4', tipoPessoa: 'PF', residente: 'Sim', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Inativo', dataHoraInclusao: '25/02/2025 - 11:12:09' },
  { nome: 'Maria Silva 5', tipoPessoa: 'PF', residente: 'Sim', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Inativo', dataHoraInclusao: '25/02/2025 - 11:11:36' },
  { nome: 'Maria Silva 6', tipoPessoa: 'PF', residente: 'Sim', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Inativo', dataHoraInclusao: '25/02/2025 - 11:09:23' },
  { nome: 'Maria Silva 7', tipoPessoa: 'PF', residente: 'Não', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Bloqueado', dataHoraInclusao: '23/02/2025 - 16:33:17' },
  { nome: 'Maria Silva 8', tipoPessoa: 'PF', residente: 'Não', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Bloqueado', dataHoraInclusao: '23/02/2025 - 16:25:15' },
  { nome: 'Maria Silva 9', tipoPessoa: 'PF', residente: 'Não', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Bloqueado', dataHoraInclusao: '18/02/2025 - 11:14:11' },
  { nome: 'Maria Silva 10', tipoPessoa: 'PF', residente: 'Não', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Bloqueado', dataHoraInclusao: '18/02/2025 - 08:19:56' },
  { nome: 'Maria Silva 11', tipoPessoa: 'PF', residente: 'Sim', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Bloqueado', dataHoraInclusao: '17/02/2025 - 15:32:18' },
  { nome: 'Maria Silva 12', tipoPessoa: 'PF', residente: 'Sim', tipoDocumento: 'CPF', numeroDocumento: '000.000.000-00', statusInvestidor: 'Inativo', dataHoraInclusao: '17/02/2025 - 12:05:35' },
];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll(filters?: CustomerFilters): Observable<ICustomerRecord[]> {
    // TODO: Substituir por chamada real ao backend quando disponível
    // let params = new HttpParams();
    // if (filters?.nome) params = params.set('nome', filters.nome);
    // if (filters?.tipoDocumento) params = params.set('tipoDocumento', filters.tipoDocumento);
    // if (filters?.numeroDocumento) params = params.set('numeroDocumento', filters.numeroDocumento);
    // if (filters?.statusInvestidor) params = params.set('statusInvestidor', filters.statusInvestidor);
    // if (filters?.residente) params = params.set('residente', filters.residente);
    // return this.http.get<ICustomerRecord[]>(`${this.apiUrl}/customers`, { params });

    let result = [...MOCK_CUSTOMERS];

    if (filters?.nome) {
      const search = filters.nome.toLowerCase();
      result = result.filter(c => c.nome.toLowerCase().includes(search));
    }
    if (filters?.tipoDocumento) {
      result = result.filter(c => c.tipoDocumento === filters.tipoDocumento);
    }
    if (filters?.numeroDocumento) {
      result = result.filter(c => c.numeroDocumento.includes(filters.numeroDocumento!));
    }
    if (filters?.statusInvestidor) {
      result = result.filter(c => c.statusInvestidor === filters.statusInvestidor);
    }
    if (filters?.residente) {
      result = result.filter(c => c.residente === filters.residente);
    }

    return of(result);
  }
}
