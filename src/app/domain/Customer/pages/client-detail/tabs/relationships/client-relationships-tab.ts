import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RelationshipRecord {
  tipoRelacionamento: string;
  cpfPessoa: string;
  nomePessoa: string;
  inicioRelacionamento: string;
  fimRelacionamento: string;
  cadastrarB3: boolean;
}

@Component({
  selector: 'app-client-relationships-tab',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-relationships-tab.html',
  styleUrl: './client-relationships-tab.scss',
})
export class ClientRelationshipsTab {
  readonly relationships = input<RelationshipRecord[]>([]);

  readonly tiposRelacionamento = [
    { value: 'Cônjuge', label: 'Cônjuge' },
    { value: 'Companheiro', label: 'Companheiro' },
    { value: 'Dependente', label: 'Dependente' },
    { value: 'Representante Legal', label: 'Representante Legal' },
    { value: 'Procurador', label: 'Procurador' },
  ];
}
