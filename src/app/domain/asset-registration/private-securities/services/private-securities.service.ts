import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { 
  PrivateSecurityRecord, 
  PrivateSecurityFilters,
  DebentureCharacteristic 
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrivateSecuritiesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/private-securities';

  /**
   * Mock data para desenvolvimento
   */
  private mockData: PrivateSecurityRecord[] = [
    { id: 1, tipo: 'DEB', registradora: 'B3', codigo: 'DEB030008AB', apelido: 'DEBÊNTURE', emissor: 'BCO ITAU', dataEmissao: '10/02/2025', dataVencimento: '10/03/2025', situacao: 'Confirmado sem Restrição' },
    { id: 2, tipo: 'CRI', registradora: 'B3', codigo: 'CRI030008XB', apelido: 'CRI', emissor: 'BCO ITAU', dataEmissao: '10/02/2025', dataVencimento: '10/03/2025', situacao: 'Confirmado sem Restrição' },
    { id: 3, tipo: 'CRA', registradora: 'B3', codigo: 'CRA020005VD', apelido: 'CRA', emissor: 'BCO BRADESCO', dataEmissao: '10/02/2025', dataVencimento: '20/03/2025', situacao: 'Confirmado sem Restrição' },
    { id: 4, tipo: 'CBIO', registradora: 'B3', codigo: 'CBIO40007890', apelido: 'CBIO', emissor: 'BCO ITAU', dataEmissao: '10/02/2025', dataVencimento: '25/03/2025', situacao: 'Confirmado sem Restrição' },
    { id: 5, tipo: 'CFF', registradora: 'B3', codigo: 'CFF030006TR', apelido: 'CFF', emissor: 'BCO SANTANDER', dataEmissao: '10/02/2025', dataVencimento: '01/04/2025', situacao: 'Confirmado sem Restrição' },
    { id: 6, tipo: 'LF', registradora: 'B3', codigo: 'LF0030009HU', apelido: 'LF', emissor: 'BCO SANTANDER', dataEmissao: '10/02/2025', dataVencimento: '02/05/2025', situacao: 'Confirmado sem Restrição' },
    { id: 7, tipo: 'LCI', registradora: 'B3', codigo: 'LCI030009HU', apelido: 'LCI', emissor: 'BCO SANTANDER', dataEmissao: '10/02/2025', dataVencimento: '02/05/2025', situacao: 'Confirmado sem Restrição' },
    { id: 8, tipo: 'LCA', registradora: 'B3', codigo: 'LCA030009HU', apelido: 'LCA', emissor: 'BCO SANTANDER', dataEmissao: '10/02/2025', dataVencimento: '02/05/2025', situacao: 'Confirmado sem Restrição' },
    { id: 9, tipo: 'CDB', registradora: 'B3', codigo: 'CDB030008AB', apelido: 'CDB', emissor: 'BCO ITAU', dataEmissao: '10/02/2025', dataVencimento: '10/03/2025', situacao: 'Confirmado sem Restrição' },
  ];

  /**
   * Busca lista de títulos privados
   */
  getAll(filters?: PrivateSecurityFilters): Observable<PrivateSecurityRecord[]> {
    // TODO: Implementar chamada real à API
    // return this.http.get<PrivateSecurityRecord[]>(this.baseUrl, { params: filters as any });
    return of(this.mockData);
  }

  /**
   * Busca título privado por ID
   */
  getById(id: number): Observable<PrivateSecurityRecord | undefined> {
    // TODO: Implementar chamada real à API
    // return this.http.get<PrivateSecurityRecord>(`${this.baseUrl}/${id}`);
    return of(this.mockData.find(item => item.id === id));
  }

  /**
   * Busca título privado por código do ativo
   */
  getByCodigo(codigo: string): Observable<PrivateSecurityRecord | undefined> {
    // TODO: Implementar chamada real à API
    // return this.http.get<PrivateSecurityRecord>(`${this.baseUrl}/codigo/${codigo}`);
    return of(this.mockData.find(item => item.codigo === codigo));
  }

  /**
   * Busca detalhes completos de uma debênture
   */
  getDebentureDetails(id: number): Observable<DebentureCharacteristic | null> {
    // TODO: Implementar chamada real à API
    // return this.http.get<DebentureCharacteristic>(`${this.baseUrl}/debenture/${id}`);
    return of(null);
  }

  /**
   * Busca tipos de ativos disponíveis
   */
  getAssetTypes(): Observable<string[]> {
    return of(['DEB', 'CRI', 'CRA', 'CBIO', 'CFF', 'LF', 'LCI', 'LCA', 'CDB']);
  }

  /**
   * Busca situações disponíveis
   */
  getSituations(): Observable<string[]> {
    return of(['Confirmado sem Restrição', 'Pendente', 'Cancelado']);
  }
}
