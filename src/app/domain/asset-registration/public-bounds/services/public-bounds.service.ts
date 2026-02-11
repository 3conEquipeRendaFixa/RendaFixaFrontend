import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { 
  PublicSecurityRecord, 
  PublicSecurityFilters,
  PublicBondCharacteristic 
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PublicBoundsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/public-bounds';

  /**
   * Mock data para desenvolvimento
   */
  private mockData: PublicSecurityRecord[] = [
    { id: 1, tipo: 'LTN', registradora: 'B3', codigo: 'LTN010125', apelido: 'LTN 2025', emissor: 'TESOURO NACIONAL', dataEmissao: '01/01/2023', dataVencimento: '01/01/2025', situacao: 'Ativo' },
    { id: 2, tipo: 'NTN-B', registradora: 'B3', codigo: 'NTNB150535', apelido: 'NTN-B 2035', emissor: 'TESOURO NACIONAL', dataEmissao: '15/05/2020', dataVencimento: '15/05/2035', situacao: 'Ativo' },
    { id: 3, tipo: 'NTN-B Principal', registradora: 'B3', codigo: 'NTNBP150545', apelido: 'NTN-B Principal 2045', emissor: 'TESOURO NACIONAL', dataEmissao: '15/05/2020', dataVencimento: '15/05/2045', situacao: 'Ativo' },
    { id: 4, tipo: 'NTN-F', registradora: 'B3', codigo: 'NTNF010129', apelido: 'NTN-F 2029', emissor: 'TESOURO NACIONAL', dataEmissao: '01/01/2019', dataVencimento: '01/01/2029', situacao: 'Ativo' },
    { id: 5, tipo: 'LFT', registradora: 'B3', codigo: 'LFT010327', apelido: 'LFT 2027', emissor: 'TESOURO NACIONAL', dataEmissao: '01/03/2022', dataVencimento: '01/03/2027', situacao: 'Ativo' },
    { id: 6, tipo: 'LTN', registradora: 'B3', codigo: 'LTN010726', apelido: 'LTN 2026', emissor: 'TESOURO NACIONAL', dataEmissao: '01/07/2024', dataVencimento: '01/07/2026', situacao: 'Ativo' },
    { id: 7, tipo: 'NTN-B', registradora: 'B3', codigo: 'NTNB150830', apelido: 'NTN-B 2030', emissor: 'TESOURO NACIONAL', dataEmissao: '15/08/2018', dataVencimento: '15/08/2030', situacao: 'Ativo' },
    { id: 8, tipo: 'NTN-F', registradora: 'B3', codigo: 'NTNF010133', apelido: 'NTN-F 2033', emissor: 'TESOURO NACIONAL', dataEmissao: '01/01/2023', dataVencimento: '01/01/2033', situacao: 'Ativo' },
  ];

  getAll(filters?: PublicSecurityFilters): Observable<PublicSecurityRecord[]> {
    return of(this.mockData);
  }

  getById(id: number): Observable<PublicSecurityRecord | undefined> {

    return of(this.mockData.find(item => item.id === id));
  }

  getByCodigo(codigo: string): Observable<PublicSecurityRecord | undefined> {
    return of(this.mockData.find(item => item.codigo === codigo));
  }

  getBondDetails(id: number): Observable<PublicBondCharacteristic | null> {
    return of(null);
  }

  getBondTypes(): Observable<string[]> {
    return of(['LTN', 'NTN-B', 'NTN-B Principal', 'NTN-F', 'LFT']);
  }

  getSituations(): Observable<string[]> {
    return of(['Ativo', 'Vencido', 'Resgatado']);
  }
}
